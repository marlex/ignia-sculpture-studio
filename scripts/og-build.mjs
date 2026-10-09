#!/usr/bin/env node
// Generates: public/og-logo.jpg, public/og/*.jpg (1200x630, <=300KB JPGs,
// smart-cropped from the repo's own images) and public/og-manifest.json
// (path -> { title, description, image, width, height, type }).
//
// Run manually (`npm run og:build`) whenever a sculptor, work or article
// is added or changed, and commit the result. It is NOT part of the
// Cloudflare build step on purpose — that keeps deploys independent of
// sharp's native bindings, which can be finicky on a CI image we don't
// control. worker/og-worker.js reads the committed og-manifest.json to
// inject real per-route og:/twitter: tags into the first HTML response,
// before any client JS runs.
import { createServer } from "vite";
import sharp from "sharp";
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const OG_DIR = path.join(PUBLIC_DIR, "og");
const SITE = "https://igniainstitution.com";

const INSTITUTION = (s) => s.replace(/Ignia Gallery/g, "Ignia Institution");
const clean = (s) => (s || "").replace(/\s+/g, " ").trim();

const toFsPath = (viteUrl) => path.join(ROOT, viteUrl.replace(/^\/+/, ""));

const warnings = [];
const imageCache = new Map();

async function cropToOg(fsPath, outName) {
  if (imageCache.has(outName)) return imageCache.get(outName);
  const meta = await sharp(fsPath).metadata();
  const srcRatio = meta.width / meta.height;
  if (srcRatio < 0.85) {
    warnings.push(
      `${outName}: source is ${meta.width}x${meta.height} (ratio ${srcRatio.toFixed(2)}), portrait — ` +
      `a 1200x630 landscape crop trims a large share of its height. Review visually.`
    );
  }
  let quality = 85;
  let buffer;
  do {
    buffer = await sharp(fsPath)
      .resize(1200, 630, { fit: "cover", position: sharp.strategy.attention })
      .flatten({ background: "#f5f5f5" })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    quality -= 7;
  } while (buffer.length > 300 * 1024 && quality > 25);
  await writeFile(path.join(OG_DIR, outName), buffer);
  const result = { image: `${SITE}/og/${outName}`, width: 1200, height: 630 };
  imageCache.set(outName, result);
  return result;
}

async function main() {
  await rm(OG_DIR, { recursive: true, force: true });
  await mkdir(OG_DIR, { recursive: true });

  // --- logo (already ~1.9:1, a safe crop) ---
  {
    let quality = 90;
    let buffer;
    const src = path.join(ROOT, "src/assets/og-logo-source.webp");
    do {
      buffer = await sharp(src)
        .resize(1200, 630, { fit: "cover", position: "centre" })
        .flatten({ background: "#f5f5f5" })
        .jpeg({ quality })
        .toBuffer();
      quality -= 7;
    } while (buffer.length > 300 * 1024 && quality > 25);
    await writeFile(path.join(PUBLIC_DIR, "og-logo.jpg"), buffer);
  }
  const LOGO = { image: `${SITE}/og-logo.jpg`, width: 1200, height: 630 };

  const server = await createServer({ root: ROOT, server: { middlewareMode: true }, appType: "custom" });
  const worksMod = await server.ssrLoadModule("/src/data/igniaWorks.ts");
  const bioMod = await server.ssrLoadModule("/src/pages/PerfilEscultor.tsx");
  const materialsMod = await server.ssrLoadModule("/src/lib/artistMaterials.ts");
  const aprendeMod = await server.ssrLoadModule("/src/data/aprendeArticles.ts");
  const editorialMod = await server.ssrLoadModule("/src/data/editorialArticles.ts");

  const { WORKS, CATALOGUE_WORK_SLUGS } = worksMod;
  const { BIOS } = bioMod;
  const { getWorksForArtist } = materialsMod;
  const { APRENDE_ARTICLES } = aprendeMod;
  const { EDITORIAL_ARTICLES } = editorialMod;

  await server.close();

  const manifest = {};
  const set = (p, entry) => { manifest[p] = { type: "website", ...entry }; };

  // ---------- form pages -> logo ----------
  const formPages = [
    ["/invitacion-artista", "Your Invitation to Ignia Institution", "You are invited to join the first sculptors of Ignia, a place dedicated only to sculpture."],
    ["/perfil-artista", "Artist Profile | Ignia Institution", "Complete your Ignia Institution artist profile."],
    ["/login", "Log In | Ignia Institution", "Log in to your Ignia Institution account to manage your works, collection and profile."],
    ["/registro", "Create Account | Ignia Institution", "Create your Ignia Institution account as a sculptor or collector."],
    ["/recuperar-password", "Reset Your Password | Ignia Institution", "Recover access to your Ignia Institution account."],
    ["/reset-password", "Reset Your Password | Ignia Institution", "Set a new password for your Ignia Institution account."],
    ["/unsubscribe", "Unsubscribe | Ignia Institution", "Manage your Ignia Institution email preferences."],
    ["/publicar", "Submit a Work | Ignia Institution", "Submit your sculpture to the Ignia Institution catalogue."],
    ["/join/escultores", "Sell Sculpture Online, Fair Commissions for Sculptors | Ignia", "Join the only global gallery built exclusively for sculptors. Keep 82-88% of every sale while we handle 3D, logistics, insurance and authentication."],
    ["/join/sculptors", "Sell Sculpture Online, Fair Commissions for Sculptors | Ignia", "Join the only global gallery built exclusively for sculptors. Keep 82-88% of every sale while we handle 3D, logistics, insurance and authentication."],
    ["/join/coleccionistas", "Buy Original Sculpture, Curated & Certified | Ignia", "Collect original sculpture with confidence: curated selection, fair fixed pricing, 3D viewing and a certificate of authenticity, insured door to door."],
    ["/join/collectors", "Buy Original Sculpture, Curated & Certified | Ignia", "Collect original sculpture with confidence: curated selection, fair fixed pricing, 3D viewing and a certificate of authenticity, insured door to door."],
    ["/join/galerias", "Galleries, Sell Sculpture with Ignia Institution", "Add Ignia as an extra sales channel for your gallery: no exclusivity, museum-level presentation, certification and specialised logistics."],
    ["/join/galleries", "Galleries, Sell Sculpture with Ignia Institution", "Add Ignia as an extra sales channel for your gallery: no exclusivity, museum-level presentation, certification and specialised logistics."],
    ["/join/curadores", "Curators, Apply to Ignia Institution", "Join Ignia as a curator: private sessions with sculptors, flexible schedule and pay per completed session."],
    ["/join/curators", "Curators, Apply to Ignia Institution", "Join Ignia as a curator: private sessions with sculptors, flexible schedule and pay per completed session."],
    ["/join/advisors", "Art Advisors, Apply to Ignia Institution", "Join Ignia as an art advisor: private sessions with collectors and sculptors, flexible schedule and pay per completed session."],
    ["/guidance/curator", "Curators, Apply to Ignia Institution", "Join Ignia as a curator: private sessions with sculptors, flexible schedule and pay per completed session."],
    ["/guidance/advisor", "Art Advisors, Apply to Ignia Institution", "Join Ignia as an art advisor: private sessions with collectors and sculptors, flexible schedule and pay per completed session."],
    ["/unete-a-ignia", "Join Ignia Institution, Artists & Collectors", "Apply to join Ignia Institution as a sculptor or collector and get access to 3D listings, certificates and a global sculpture audience."],
  ];
  for (const [p, title, description] of formPages) set(p, { title, description, ...LOGO });

  // ---------- fixed content pages -> their own hero ----------
  set("/", {
    title: "Ignia Institution — The Global Home for Sculpture",
    description: "The global institution dedicated exclusively to sculpture. Discover original works in 3D, meet the artists and view each piece in your own space.",
    ...(await cropToOg(toFsPath("/src/assets/hero-slideshow-4-marble.webp"), "home.jpg")),
  });
  set("/galleries", {
    title: "Galleries, Sell Sculpture with Ignia Institution",
    description: "Add Ignia as an extra sales channel for your gallery: no exclusivity, museum-level presentation, certification and specialised logistics.",
    ...(await cropToOg(toFsPath("/src/assets/hero-galerias.jpg"), "galleries.jpg")),
  });
  set("/ignia-gallery", {
    title: "About Ignia, The Digital Institution for Sculpture",
    description: "The team, the story and everything Ignia offers sculpture: 3D viewing, certified authenticity, fair pricing, global reach and specialised logistics.",
    ...(await cropToOg(toFsPath("/src/assets/hero-bg-studio.jpg"), "about.jpg")),
  });

  {
    const first = WORKS.find((w) => w.slug === CATALOGUE_WORK_SLUGS[0]);
    const img = await cropToOg(toFsPath(first.image), "coleccion.jpg");
    const entry = {
      title: INSTITUTION("Sculptures for Sale, Bronze, Marble & Steel | Ignia Gallery"),
      description: "Browse original sculptures in bronze, marble, corten steel, wood, ceramic, alabaster and glass, each with 3D viewing and a certificate of authenticity.",
      ...img,
    };
    set("/coleccion", entry);
    set("/sculptures", entry);
  }

  {
    const firstWork = WORKS.find((w) => w.slug === "vinculo");
    const img = await cropToOg(toFsPath(firstWork.image), "escultores.jpg");
    const entry = {
      title: INSTITUTION("Sculptors, Meet the Artists | Ignia Gallery"),
      description: "The artists who show their work at Ignia. Meet them through what they make and how they think.",
      ...img,
    };
    set("/escultores", entry);
    set("/sculptors", entry);
  }

  {
    const first = APRENDE_ARTICLES[0];
    const img = await cropToOg(toFsPath(first.img), "aprende.jpg");
    const entry = {
      title: INSTITUTION("Learn Sculpture, Materials, Process & Market | Ignia Gallery"),
      description: "Guides to understanding sculpture: materials, techniques, conservation, patinas and how the sculpture market really works.",
      ...img,
    };
    set("/aprende", entry);
    set("/learn", entry);
  }

  {
    const first = EDITORIAL_ARTICLES[0];
    const img = await cropToOg(toFsPath(first.img), "editorial.jpg");
    set("/editorial", {
      title: INSTITUTION("Community, Essays & Interviews on Sculpture | Ignia Gallery"),
      description: "Essays, reports and interviews on sculpture, the craft and its market, written for collectors and artists alike.",
      ...img,
    });
  }

  // ---------- dynamic: sculptor profiles (their first matching work) ----------
  for (const [slug, bio] of Object.entries(BIOS)) {
    const works = getWorksForArtist(slug, bio.nombre);
    if (works.length === 0) continue; // no real, material-matching work -> no profile page worth sharing
    const img = await cropToOg(toFsPath(works[0].image), `sculptor-${slug}.jpg`);
    set(`/perfil/escultor/${slug}`, {
      title: `${bio.nombre}, Sculptor · Ignia Institution`,
      description: clean(bio.bioEn).slice(0, 155),
      ...img,
    });
  }

  // ---------- dynamic: works ----------
  for (const w of WORKS) {
    const img = await cropToOg(toFsPath(w.image), `obra-${w.slug}.jpg`);
    set(`/obra/${w.slug}`, {
      title: `${w.en.title}, ${w.en.artist} · Ignia Institution`,
      description: `${clean(w.en.description).slice(0, 137)} ${w.en.material}, ${w.en.year}. ${w.en.price}.`,
      type: "article",
      ...img,
    });
  }

  // ---------- dynamic: Learn articles ----------
  for (const a of APRENDE_ARTICLES) {
    const img = await cropToOg(toFsPath(a.img), `aprende-${a.slug}.jpg`);
    const entry = {
      title: `${a.en.titulo} · Ignia Institution`,
      description: clean(a.en.extracto).slice(0, 200),
      type: "article",
      ...img,
    };
    set(`/aprende/${a.slug}`, entry);
    set(`/learn/${a.slug}`, entry);
  }

  // ---------- dynamic: Editorial articles ----------
  for (const a of EDITORIAL_ARTICLES) {
    const img = await cropToOg(toFsPath(a.img), `editorial-${a.slug}.jpg`);
    set(`/editorial/${a.slug}`, {
      title: `${a.en.titulo} · Ignia Institution`,
      description: clean(a.en.extracto).slice(0, 200),
      type: "article",
      ...img,
    });
  }

  await writeFile(path.join(PUBLIC_DIR, "og-manifest.json"), JSON.stringify(manifest));

  console.log(`[og-build] wrote ${Object.keys(manifest).length} routes, ${imageCache.size} unique images.`);
  if (warnings.length) {
    console.log(`[og-build] ${warnings.length} image(s) need a visual check (portrait source, risky horizontal crop):`);
    for (const w of warnings) console.log(`  - ${w}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
