// Cloudflare Worker wrapping the static asset serve: injects real,
// per-route og:/twitter: meta tags into the HTML response before it
// reaches the browser — including crawlers, which never run the SPA's
// client-side JS. See scripts/og-build.mjs for how og-manifest.json and
// the cropped /og/*.jpg files are generated at build time.
import manifest from "../public/og-manifest.json";

class MetaTagRewriter {
  constructor(entry) {
    this.entry = entry;
  }
  element(el) {
    const prop = el.getAttribute("property") || el.getAttribute("name");
    if (!prop) return;
    const { entry } = this;
    switch (prop) {
      case "og:title":
      case "twitter:title":
        el.setAttribute("content", entry.title);
        break;
      case "og:description":
      case "twitter:description":
        el.setAttribute("content", entry.description);
        break;
      case "og:url":
        el.setAttribute("content", `https://igniainstitution.com${this.path}`);
        break;
      case "og:type":
        el.setAttribute("content", entry.type);
        break;
      case "og:image":
      case "twitter:image":
        el.setAttribute("content", entry.image);
        break;
    }
  }
}

class TitleRewriter {
  constructor(title) {
    this.title = title;
  }
  element(el) {
    el.setInnerContent(this.title);
  }
}

class HeadInjector {
  constructor(entry) {
    this.entry = entry;
  }
  element(el) {
    el.append(
      `<meta property="og:image:width" content="${this.entry.width}">` +
      `<meta property="og:image:height" content="${this.entry.height}">`,
      { html: true }
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let p = url.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    const entry = manifest[p];

    const response = await env.ASSETS.fetch(request);

    if (!entry) return response;

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    const metaRewriter = new MetaTagRewriter(entry);
    metaRewriter.path = p;

    return new HTMLRewriter()
      .on('meta[property^="og:"]', metaRewriter)
      .on('meta[name^="twitter:"]', metaRewriter)
      .on("title", new TitleRewriter(entry.title))
      .on("head", new HeadInjector(entry))
      .transform(response);
  },
};
