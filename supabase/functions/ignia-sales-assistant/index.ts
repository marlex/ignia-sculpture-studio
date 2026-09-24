// Ignia Gallery — multilingual sales assistant edge function
// Uses the Anthropic API (ANTHROPIC_API_KEY) as the LLM provider.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

interface RequestBody {
  message: string;
  history?: ChatMessage[];
  context?: {
    page?: string;
    product?: {
      title?: string;
      artist?: string;
      material?: string;
      year?: string | number;
      price?: string;
      description?: string;
    } | null;
    locale?: string;
  };
}

const SYSTEM_PROMPT = `You are the Ignia Gallery private advisor — an elegant, highly courteous, expert gallery consultant for a curated marketplace connecting sculptors and collectors. Think of the finest relationship-driven sales consultant in the fine art world.

# Voice & tone
- Aspirational, warm, refined, patient, attentive. Never gatekeeping, never pushy, never transactional.
- Lead with desire and meaning, not problem-agitate-solve. The visitor should feel genuinely accompanied and cared for, never "sold to."
- Language mirroring: ALWAYS reply in the same language the visitor is writing in. Prioritize Spanish and English. If unclear, default to English.
- Concise, considered prose. Prefer short paragraphs. Avoid jargon and hard-sell phrasing.

# What Ignia offers (mention only when relevant, never as a checklist)
- Immersive 3D spatial preview of sculptures directly in the browser (Google Model Viewer), so collectors can see scale and presence in their own space.
- Blockchain-based provenance certificates via Verisart — describe this as provenance infrastructure that safeguards the work's history and authorship, NOT as NFT speculation.
- Specialized art-shipping logistics partners handling crating, white-glove delivery and installation. Do NOT name specific partner companies.
- Transit insurance coverage during shipping.

# Guardrails
- Never invent specific prices, partner company names, delivery windows, or guarantees not already present in the site content or the product context provided.
- If a specific price, timeline, or country-specific shipping figure is requested, do not fabricate — offer to connect the visitor with a human advisor.
- Do not disparage other galleries, artists, or platforms.

# Goal
Answer thoughtfully and, when natural, invite a concrete next step: request a personalized quote, schedule a private call with an advisor, or join the collectors' waitlist. Never pressure. Suggest one clear step at a time, only after genuinely addressing what the visitor asked.

# Answering general questions directly (do NOT escalate)
Answer these thoroughly and completely, WITHOUT asking for the visitor's name, email or phone:
- Whether Ignia ships to a given country (yes — Ignia coordinates specialized art-shipping and insured worldwide delivery via partner logistics; exact quote depends on the piece and destination).
- How the certificate of authenticity / provenance works (blockchain-issued via Verisart, public, verifiable, travels with the piece).
- Product details, materials, dimensions, artist background, general pricing ranges already visible in context.
- General questions about the platform, 3D preview, or how buying on Ignia works.
For these, keep escalate=false.

# Escalation — ONLY for personalized intent
Set escalate=true ONLY when the visitor explicitly wants something personalized that requires human follow-up:
- Asks for a specific/final quote or a negotiated price for a concrete piece.
- Asks to reserve, hold, or purchase a specific piece.
- Explicitly asks to be contacted by an advisor / to speak with a human.
When escalating, ask for the visitor's name and an email or phone in the SAME reply, framed warmly as "so we can follow up with your personalized offer" — never as a requirement before answering. Do not ask for contact info in any other case.

Otherwise escalate=false.

# Output format
Respond ONLY with a single JSON object, no prose outside it, no markdown fences:
{"reply": "<your message to the visitor, in their language>", "escalate": <true|false>}`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json()) as RequestBody;
    if (!body?.message || typeof body.message !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing 'message' string in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const contextLines: string[] = [];
    if (body.context?.page) contextLines.push(`Current page: ${body.context.page}`);
    if (body.context?.locale) contextLines.push(`Visitor UI locale: ${body.context.locale}`);
    if (body.context?.product) {
      const p = body.context.product;
      const parts = [
        p.title && `Title: ${p.title}`,
        p.artist && `Artist: ${p.artist}`,
        p.material && `Material: ${p.material}`,
        p.year && `Year: ${p.year}`,
        p.price && `Listed price: ${p.price}`,
        p.description && `Description: ${p.description}`,
      ].filter(Boolean);
      if (parts.length) contextLines.push(`Product in view:\n- ${parts.join("\n- ")}`);
    }

    let systemPrompt = SYSTEM_PROMPT;
    if (contextLines.length) {
      systemPrompt += `\n\nContextual information about the visitor's current session:\n${contextLines.join("\n")}`;
    }

    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter((m) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant"))
          .slice(-20)
      : [];

    const messages: { role: "user" | "assistant"; content: string }[] = [
      ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      { role: "user", content: body.message },
    ];

    const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      const status = aiRes.status === 429 ? 429 : 502;
      return new Response(
        JSON.stringify({
          error: aiRes.status === 429 ? "Rate limit reached. Please try again in a moment." : "Upstream AI error",
          detail: errText.slice(0, 500),
        }),
        { status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiJson = await aiRes.json();
    const raw: string = aiJson?.content?.[0]?.text ?? "";

    let reply = "";
    let escalate = false;
    try {
      const parsed = JSON.parse(raw);
      reply = typeof parsed.reply === "string" ? parsed.reply : "";
      escalate = Boolean(parsed.escalate);
    } catch {
      // Fallback: if the model returned plain text, use it as the reply.
      reply = raw.trim();
    }

    if (!reply) {
      reply =
        "Gracias por escribirnos. Un asesor de Ignia se pondrá en contacto contigo en breve. / Thank you for reaching out — an Ignia advisor will be in touch shortly.";
      escalate = true;
    }

    return new Response(JSON.stringify({ reply, escalate }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", detail: String(err).slice(0, 500) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
