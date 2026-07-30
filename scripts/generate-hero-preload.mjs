// Snapshots the active homepage hero slides into public/hero-preload.json at build time.
// HeroSection reads this same-origin static file as a fast first paint on cold visits,
// instead of waiting on the cross-origin backend API round trip, then silently
// revalidates against the live API in the background.
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

const API_URL = (process.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

async function generateHeroPreload() {
  try {
    const res = await fetch(`${API_URL}/hero/all?website=9th%20IHWE`);
    const data = await res.json();
    const slides = data.success && Array.isArray(data.data) ? data.data : [];

    writeFileSync(
      path.join(publicDir, "hero-preload.json"),
      JSON.stringify({ slides, generatedAt: new Date().toISOString() })
    );
    console.log(`[hero-preload] wrote public/hero-preload.json with ${slides.length} slides`);
  } catch (err) {
    console.warn(`[hero-preload] could not fetch hero slides, writing empty snapshot: ${err.message}`);
    writeFileSync(
      path.join(publicDir, "hero-preload.json"),
      JSON.stringify({ slides: [], generatedAt: new Date().toISOString() })
    );
  }
}

await generateHeroPreload();
