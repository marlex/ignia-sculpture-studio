// Twilio WhatsApp webhook -> ignia-sales-assistant -> Twilio WhatsApp reply
// Twilio posts application/x-www-form-urlencoded to this endpoint.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_WHATSAPP_BUSINESS_NUMBER = Deno.env.get("TWILIO_WHATSAPP_BUSINESS_NUMBER");
const MY_WHATSAPP_NUMBER = Deno.env.get("MY_WHATSAPP_NUMBER");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

function ensureWa(n: string) {
  return n.startsWith("whatsapp:") ? n : `whatsapp:${n}`;
}

async function sendWhatsApp(to: string, body: string) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_BUSINESS_NUMBER) {
    throw new Error("Missing Twilio credentials");
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
  const form = new URLSearchParams({
    From: ensureWa(TWILIO_WHATSAPP_BUSINESS_NUMBER),
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
    console.error(`Twilio send failed [${res.status}]: ${t}`);
    throw new Error(`Twilio send failed: ${res.status}`);
  }
  return await res.json();
}

async function callAssistant(message: string, from: string) {
  if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
  const res = await fetch(`${SUPABASE_URL}/functions/v1/ignia-sales-assistant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY ?? ""}`,
    },
    body: JSON.stringify({
      message,
      history: [],
      context: { channel: "whatsapp", from },
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    console.error(`Assistant failed [${res.status}]: ${t}`);
    throw new Error(`Assistant failed: ${res.status}`);
  }
  return (await res.json()) as { reply: string; escalate?: boolean };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const contentType = req.headers.get("content-type") ?? "";
    let from = "";
    let body = "";
    let profileName = "";
    let waId = "";

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      from = params.get("From") ?? "";
      body = params.get("Body") ?? "";
      profileName = params.get("ProfileName") ?? "";
      waId = params.get("WaId") ?? "";
    } else if (contentType.includes("application/json")) {
      const j = await req.json();
      from = j.From ?? j.from ?? "";
      body = j.Body ?? j.body ?? "";
      profileName = j.ProfileName ?? "";
      waId = j.WaId ?? "";
    } else {
      return new Response("Unsupported content type", { status: 415 });
    }

    if (!from || !body) {
      // Reply 200 so Twilio doesn't retry a malformed request forever.
      return new Response("<Response/>", {
        status: 200,
        headers: { "Content-Type": "text/xml" },
      });
    }

    const { reply, escalate } = await callAssistant(body, from);

    await sendWhatsApp(from, reply);

    if (escalate && MY_WHATSAPP_NUMBER) {
      const summary = [
        "🔔 Ignia — escalation from WhatsApp",
        `Visitor: ${profileName || "(no name)"} (${waId || from})`,
        `Message: ${body}`,
        `AI reply: ${reply}`,
      ].join("\n");
      try {
        await sendWhatsApp(MY_WHATSAPP_NUMBER, summary);
      } catch (e) {
        console.error("Escalation send failed:", e);
      }
    }

    // Empty TwiML — we already sent the reply via REST API.
    return new Response("<Response/>", {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (err) {
    console.error("whatsapp-webhook error:", err);
    return new Response("<Response/>", {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }
});
