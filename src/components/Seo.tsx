import { Helmet } from "react-helmet-async";

const SITE_BASE = "https://igniagallery.com";
const DEFAULT_IMAGE = `${SITE_BASE}/og.png`;

type SeoProps = {
  title: string;
  description: string;
  /** Path starting with "/" — canonical is always the non-www domain */
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export const Seo = ({ title, description, path, image, type = "website", noindex }: SeoProps) => {
  const url = `${SITE_BASE}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  const img = image
    ? image.startsWith("http")
      ? image
      : `${SITE_BASE}${image.startsWith("/") ? "" : "/"}${image}`
    : DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
};

export default Seo;
