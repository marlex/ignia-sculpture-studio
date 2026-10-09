import { Helmet } from "react-helmet-async";

const SITE_BASE = "https://igniainstitution.com";

type SeoProps = {
  title: string;
  description: string;
  /** Path starting with "/", canonical is always the non-www domain */
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export const Seo = ({ title, description, path, noindex }: SeoProps) => {
  const url = `${SITE_BASE}${path === "/" ? "/" : path.replace(/\/$/, "")}`;

  // og:*/twitter:* tags are intentionally not rendered here. Crawlers
  // (Facebook, WhatsApp, LinkedIn, etc.) never run this client-side code —
  // they only ever see the server-delivered HTML, where a Cloudflare
  // Worker (worker/og-worker.js) already rewrites those exact tags per
  // route from public/og-manifest.json. Rendering a second set here would
  // just duplicate them in the DOM for real browsers after hydration.
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
};

export default Seo;
