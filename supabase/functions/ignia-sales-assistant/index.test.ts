// Integration tests for the ignia-sales-assistant edge function.
// Invokes the deployed function with real Spanish + English prompts and
// verifies language mirroring, tone, and the `escalate` flag.
//
// Run with: supabase--test_edge_functions (functions: ["ignia-sales-assistant"])

import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY =
  Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY") ??
  Deno.env.get("SUPABASE_ANON_KEY") ??
  Deno.env.get("SUPABASE_PUBLISHABLE_KEY");

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing SUPABASE_URL / SUPABASE_ANON_KEY env vars for tests");
}

const ENDPOINT = `${SUPABASE_URL}/functions/v1/ignia-sales-assistant`;

const ULMUK_CONTEXT = {
  page: "/obra/ulmuk-vase",
  product: {
    title: "Ulmuk Vase",
    artist: "Estudio Ulmuk",
    material: "Bronze",
    year: 2024,
    description: "Sculptural vessel in patinated bronze.",
  },
};

type AssistantResponse = { reply: string; escalate: boolean };

async function ask(
  message: string,
  opts: { context?: unknown; history?: unknown[] } = {},
): Promise<AssistantResponse> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY!,
    },
    body: JSON.stringify({ message, context: opts.context, history: opts.history }),
  });
  const text = await res.text();
  assertEquals(res.status, 200, `Non-200 (${res.status}): ${text.slice(0, 300)}`);
  const data = JSON.parse(text) as AssistantResponse;
  assertEquals(typeof data.reply, "string");
  assert(data.reply.length > 0, "reply should not be empty");
  assertEquals(typeof data.escalate, "boolean");
  return data;
}

// Rough language heuristic — checks for common function words and diacritics
// that reliably appear in short conversational Spanish or English replies.
function looksSpanish(text: string): boolean {
  const t = ` ${text.toLowerCase()} `;
  const hits = [" el ", " la ", " los ", " las ", " de ", " que ", " para ", " con ", " una ", " es ", " y ", "¿", "¡", "ó", "á", "é", "í", "ú", "ñ"];
  return hits.some((h) => t.includes(h));
}

function looksEnglish(text: string): boolean {
  const t = ` ${text.toLowerCase()} `;
  const hits = [" the ", " and ", " you ", " your ", " with ", " for ", " to ", " of ", " we ", " our ", " is ", " are "];
  return hits.some((h) => t.includes(h));
}

const PUSHY = [
  "buy now",
  "act fast",
  "limited time",
  "don't miss",
  "hurry",
  "compra ya",
  "no te lo pierdas",
  "última oportunidad",
  "date prisa",
];

function assertNotPushy(reply: string) {
  const lower = reply.toLowerCase();
  for (const phrase of PUSHY) {
    assert(!lower.includes(phrase), `Reply contains pushy phrase "${phrase}": ${reply}`);
  }
}

// ---------- Validation ----------

Deno.test("rejects missing message with 400", async () => {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY!,
    },
    body: JSON.stringify({}),
  });
  await res.text();
  assertEquals(res.status, 400);
});

// ---------- Spanish ----------

Deno.test("ES: general question stays in Spanish, no escalation, not pushy", async () => {
  const data = await ask(
    "Hola, me interesa saber más sobre esta pieza. ¿Puedes contarme qué la hace especial?",
    { context: ULMUK_CONTEXT },
  );
  assert(looksSpanish(data.reply), `Expected Spanish reply, got: ${data.reply}`);
  assertNotPushy(data.reply);
  assertEquals(data.escalate, false);
});

Deno.test("ES: asking for final price escalates", async () => {
  const data = await ask(
    "¿Cuál es el precio final de esta escultura? Necesito una cotización personalizada.",
    { context: ULMUK_CONTEXT },
  );
  assert(looksSpanish(data.reply), `Expected Spanish reply, got: ${data.reply}`);
  assertEquals(data.escalate, true);
});

Deno.test("ES: shipping to a specific country escalates", async () => {
  const data = await ask("¿Cuánto costaría enviarla a México?", { context: ULMUK_CONTEXT });
  assert(looksSpanish(data.reply), `Expected Spanish reply, got: ${data.reply}`);
  assertEquals(data.escalate, true);
});

Deno.test("ES: clear purchase intent escalates", async () => {
  const data = await ask("Quiero comprarla, ¿cómo la reservo?", { context: ULMUK_CONTEXT });
  assert(looksSpanish(data.reply), `Expected Spanish reply, got: ${data.reply}`);
  assertEquals(data.escalate, true);
});

// ---------- English ----------

Deno.test("EN: general question stays in English, no escalation, not pushy", async () => {
  const data = await ask(
    "Hi! I'd love to learn more about how you preview sculptures at home.",
    { context: ULMUK_CONTEXT },
  );
  assert(looksEnglish(data.reply), `Expected English reply, got: ${data.reply}`);
  assertNotPushy(data.reply);
  assertEquals(data.escalate, false);
});

Deno.test("EN: asking to speak with a human escalates", async () => {
  const data = await ask("Could I speak with a human advisor about this piece?", {
    context: ULMUK_CONTEXT,
  });
  assert(looksEnglish(data.reply), `Expected English reply, got: ${data.reply}`);
  assertEquals(data.escalate, true);
});

Deno.test("EN: detailed authentication question escalates", async () => {
  const data = await ask(
    "Can you explain in detail how the certificate of authenticity and provenance verification works for this sculpture?",
    { context: ULMUK_CONTEXT },
  );
  assert(looksEnglish(data.reply), `Expected English reply, got: ${data.reply}`);
  assertEquals(data.escalate, true);
});

Deno.test("EN: purchase intent escalates", async () => {
  const data = await ask("I want to buy this. How do I acquire it?", { context: ULMUK_CONTEXT });
  assert(looksEnglish(data.reply), `Expected English reply, got: ${data.reply}`);
  assertEquals(data.escalate, true);
});

// ---------- Guardrails ----------

Deno.test("Does not invent a specific numeric price", async () => {
  const data = await ask(
    "Dime exactamente cuánto cuesta esta pieza en euros, un número concreto.",
    { context: ULMUK_CONTEXT },
  );
  // No listed price was provided in context, so the model must not fabricate one.
  const hasEuroAmount = /\d[\d.,]*\s?(€|eur|euros)/i.test(data.reply);
  assert(!hasEuroAmount, `Reply appears to invent a price: ${data.reply}`);
  assertEquals(data.escalate, true);
});
