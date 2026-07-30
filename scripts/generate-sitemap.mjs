// Generates public/sitemap.xml and public/robots.txt at build time.
// Runs on the frontend now (previously served from the backend at /sitemap/xml).
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

const API_URL = (process.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
const SITE_URL = (process.env.VITE_SITE_URL || "https://ihwe.in").replace(/\/$/, "");

// Static public-facing routes (mirrors the <Layout>-wrapped routes in src/App.tsx).
const staticRoutes = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "weekly", priority: 0.8 },
  { url: "/awards", changefreq: "weekly", priority: 0.8 },
  { url: "/awards/nomination", changefreq: "monthly", priority: 0.7 },
  { url: "/advisory-board", changefreq: "weekly", priority: 0.8 },
  { url: "/advisory", changefreq: "weekly", priority: 0.7 },
  { url: "/exhibitor-profile", changefreq: "monthly", priority: 0.6 },
  { url: "/book-a-stand", changefreq: "monthly", priority: 0.7 },
  { url: "/visitor-registration", changefreq: "monthly", priority: 0.7 },
  { url: "/international-visitor-registration", changefreq: "monthly", priority: 0.7 },
  { url: "/exhibition", changefreq: "weekly", priority: 0.8 },
  { url: "/government-msme-pms-schemes", changefreq: "weekly", priority: 0.8 },
  { url: "/media-registration", changefreq: "weekly", priority: 0.7 },
  { url: "/speaker-registration", changefreq: "monthly", priority: 0.6 },
  { url: "/seller-registration", changefreq: "monthly", priority: 0.7 },
  { url: "/stall-designing-vendors", changefreq: "monthly", priority: 0.6 },
  { url: "/why-exhibit", changefreq: "weekly", priority: 0.8 },
  { url: "/partners", changefreq: "weekly", priority: 0.8 },
  { url: "/sponsership", changefreq: "weekly", priority: 0.7 },
  { url: "/partnership", changefreq: "weekly", priority: 0.7 },
  { url: "/fabrication-partner", changefreq: "monthly", priority: 0.6 },
  { url: "/partner-registration", changefreq: "monthly", priority: 0.7 },
  { url: "/support/hotel-stay", changefreq: "monthly", priority: 0.6 },
  { url: "/support/travel-assistance", changefreq: "monthly", priority: 0.6 },
  { url: "/support/stall-design", changefreq: "monthly", priority: 0.6 },
  { url: "/support/logistics-support", changefreq: "monthly", priority: 0.6 },
  { url: "/support/printing-branding", changefreq: "monthly", priority: 0.6 },
  { url: "/support/hospitality-desk", changefreq: "monthly", priority: 0.6 },
  { url: "/conference", changefreq: "weekly", priority: 0.8 },
  { url: "/conference/paper-presentation", changefreq: "monthly", priority: 0.6 },
  { url: "/conference/poster-presentation", changefreq: "monthly", priority: 0.6 },
  { url: "/conference/abstract-submission", changefreq: "monthly", priority: 0.6 },
  { url: "/delegate-registration", changefreq: "monthly", priority: 0.7 },
  { url: "/delegate-registration-details", changefreq: "monthly", priority: 0.5 },
  { url: "/group-registration", changefreq: "monthly", priority: 0.7 },
  { url: "/exhibitors", changefreq: "weekly", priority: 0.8 },
  { url: "/blog", changefreq: "daily", priority: 0.8 },
  { url: "/blog/all", changefreq: "weekly", priority: 0.7 },
  { url: "/contact", changefreq: "weekly", priority: 0.8 },
  { url: "/gallery", changefreq: "weekly", priority: 0.7 },
  { url: "/buyer-seller-meet", changefreq: "weekly", priority: 0.8 },
  { url: "/why-visit", changefreq: "weekly", priority: 0.8 },
  { url: "/msme-pms-scheme", changefreq: "weekly", priority: 0.7 },
  { url: "/travel-accommodation", changefreq: "monthly", priority: 0.6 },
  { url: "/travel-partner", changefreq: "monthly", priority: 0.6 },
  { url: "/hotel-stay-partner", changefreq: "monthly", priority: 0.6 },
  { url: "/printing-branding-partner", changefreq: "monthly", priority: 0.6 },
  { url: "/logistic-partner", changefreq: "monthly", priority: 0.6 },
  { url: "/e-promotion", changefreq: "monthly", priority: 0.7 },
  { url: "/download-badge", changefreq: "monthly", priority: 0.6 },
  { url: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
  { url: "/terms-of-service", changefreq: "yearly", priority: 0.3 },
  { url: "/refund-policy", changefreq: "yearly", priority: 0.3 },
  { url: "/payment-policy", changefreq: "yearly", priority: 0.3 },
  { url: "/cancellation-policy", changefreq: "yearly", priority: 0.3 },
  { url: "/buyer-registration", changefreq: "monthly", priority: 0.7 },
  { url: "/buyer-registration-form", changefreq: "monthly", priority: 0.6 },
  { url: "/international-buyer-registration", changefreq: "monthly", priority: 0.7 },
  { url: "/hospitality-partner", changefreq: "monthly", priority: 0.6 },
  { url: "/epromotion", changefreq: "monthly", priority: 0.6 },
  { url: "/e-promotion-web", changefreq: "monthly", priority: 0.7 },
];

// Paths that should never be indexed (auth/dashboard portals).
const disallowedPaths = [
  "/exhibitor-login",
  "/exhibitor-print",
  "/exhibitor-dashboard",
  "/buyer-login",
  "/buyer-dashboard",
  "/buyer-scan",
  "/delegates-login",
  "/seller-portal",
  "/visitor",
];

async function fetchJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`[sitemap] could not fetch ${url}: ${err.message}`);
    return null;
  }
}

async function getDynamicRoutes() {
  const dynamicRoutes = [];

  const blogsRes = await fetchJson(`${API_URL}/blogs`);
  if (blogsRes?.success && Array.isArray(blogsRes.data)) {
    blogsRes.data
      .filter((blog) => blog.status === "published")
      .forEach((blog) => {
        dynamicRoutes.push({
          url: `/blog/${blog.slug}`,
          changefreq: "weekly",
          priority: 0.7,
          lastmod: blog.updatedAt,
        });
      });
  }

  const pagesRes = await fetchJson(`${API_URL}/custom-pages`);
  if (pagesRes?.success && Array.isArray(pagesRes.data)) {
    pagesRes.data
      .filter((page) => page.status === "active")
      .forEach((page) => {
        dynamicRoutes.push({
          url: `/${page.slug}`,
          changefreq: "weekly",
          priority: 0.7,
          lastmod: page.updatedAt,
        });
      });
  }

  const servicesRes = await fetchJson(`${API_URL}/service-details`);
  if (servicesRes?.success && Array.isArray(servicesRes.data)) {
    servicesRes.data.forEach((service) => {
      const slugOrId = service.slug || service.serviceCardId;
      if (!slugOrId) return;
      dynamicRoutes.push({
        url: `/industry-zone/${slugOrId}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: service.updatedAt,
      });
    });
  }

  return dynamicRoutes;
}

async function generateSitemap() {
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const stream = new SitemapStream({ hostname: SITE_URL });
  const xml = (await streamToPromise(Readable.from(allRoutes).pipe(stream))).toString();

  writeFileSync(path.join(publicDir, "sitemap.xml"), xml);
  console.log(`[sitemap] wrote public/sitemap.xml with ${allRoutes.length} urls`);
}

function generateRobots() {
  const lines = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((p) => `Disallow: ${p}`),
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ];
  writeFileSync(path.join(publicDir, "robots.txt"), lines.join("\n"));
  console.log("[sitemap] wrote public/robots.txt");
}

await generateSitemap();
generateRobots();
