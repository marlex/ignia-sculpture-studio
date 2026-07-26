import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

type EmailType = "confirmacion" | "lista_espera" | "rechazado";

const TEMPLATE_MAP: Record<EmailType, string> = {
  confirmacion: "application-received",
  lista_espera: "application-waitlist",
  rechazado: "application-rejected",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
  let application_id: string | null = null;
  let email_type: EmailType | null = null;

  try {
    const body = await req.json();
    application_id = body.application_id;
    email_type = body.email_type;

    if (!application_id || !email_type || !(email_type in TEMPLATE_MAP)) {
      return new Response(
        JSON.stringify({ error: "application_id and valid email_type required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { data: app, error: appErr } = await admin
      .from("applications")
      .select("id, name, email, language")
      .eq("id", application_id)
      .maybeSingle();
    if (appErr || !app) throw new Error(appErr?.message || "Application not found");

    const lang = (app.language === "en" ? "en" : "es") as "es" | "en";
    const templateName = TEMPLATE_MAP[email_type];

    const { error: sendErr } = await admin.functions.invoke("send-transactional-email", {
      body: {
        templateName,
        recipientEmail: app.email,
        idempotencyKey: `${templateName}-${application_id}`,
        templateData: { name: app.name, lang },
      },
    });
    if (sendErr) throw new Error(sendErr.message || "send-transactional-email failed");

    await admin.from("email_logs").insert({
      application_id,
      email_type,
      status: "sent",
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("send-application-email failed:", message);
    if (application_id && email_type) {
      await admin.from("email_logs").insert({
        application_id,
        email_type,
        status: "failed",
        error_message: message.slice(0, 1000),
      });
    }
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
