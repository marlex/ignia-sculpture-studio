// Sends an escalation summary to the gallery's WhatsApp via Twilio.
// Called from the "Talk to Ignia" widget when the assistant flags escalate=true
// and the visitor's contact info has been captured.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_WHATSAPP_BUSINESS_NUMBER = Deno.env.get("TWILIO_WHATSAPP_BUSINESS_NUMBER");
const MY_WHATSAPP_NUMBER = Deno.env.get("MY_WHATSAPP_NUMBER");

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

interface Body {
  contact?: { name?: string; email?: string; phone?: string };
  history?: ChatMessage[];
  lastUserMessage?: string;
  lastAssistantReply?: string;
  context?: {
    page?: string;
    locale?: string;
    product?: {
      title?: string;
      artist?: string;
      material?: string;
      year?: string | number;
      price?: string;
    } | null;
  };
}

function ensureWa(n: string) {
  return n.startsWith("whatsapp:") ? n : `whatsapp:${n}`;
}

async function sendWhatsApp(to: string, body: string) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
  const form = new URLSearchParams({
    From: ensureWa(TWILIO_WHATSAPP_BUSINESS_NUMBER!),
    To: ensureWa(to),
    Body: body,
  });
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Twilio send failed [${res.status}]: ${t}`);
  }
  return await res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_BUSINESS_NUMBER || !MY_WHATSAPP_NUMBER) {
      return new Response(
        JSON.stringify({ error: "Missing Twilio secrets" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json()) as Body;
    const c = body.contact ?? {};
    const p = body.context?.product ?? null;

    const productLine = p
      ? `${p.title ?? ""}${p.artist ? ` — ${p.artist}` : ""}${p.price ? ` · ${p.price}` : ""}`.trim()
      : "(no product context)";

    const historyText = (body.history ?? [])
      .slice(-10)
      .map((m) => `${m.role === "user" ? "Visitor" : "Ignia"}: ${m.content}`)
      .join("\n");

    const summary = [
      "🔔 Ignia — escalation from web chat",
      `Name:  ${c.name || "(not provided)"}`,
      `Email: ${c.email || "(not provided)"}`,
      `Phone: ${c.phone || "(not provided)"}`,
      `Page:  ${body.context?.page || "-"}`,
      `Lang:  ${body.context?.locale || "-"}`,
      `Product: ${productLine}`,
      "",
      "Last message:",
      body.lastUserMessage || "-",
      "",
      "AI reply:",
      body.lastAssistantReply || "-",
      "",
      "Recent conversation:",
      historyText || "-",
    ].join("\n");

    await sendWhatsApp(MY_WHATSAPP_NUMBER, summary);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-escalation error:", err);
    return new Response(
      JSON.stringify({ error: "Notification failed", detail: String(err).slice(0, 500) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
