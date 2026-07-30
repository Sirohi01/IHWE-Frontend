// One-off migration: resizes + converts large images in src/assets/ and
// public/ (bundled/static frontend images, as opposed to backend-uploaded
// content images) to WebP, then rewrites every source-file reference
// (import statements, `<img src="...">` string paths) to match.
//
// Safe-guarded by a real build afterward: Vite/Rollup statically resolves
// import paths, so any reference this script fails to update shows up as a
// hard "Could not resolve" build error, not a silent broken image.
//
// Usage: node scripts/optimize-static-images.mjs
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync, renameSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const IMAGE_DIRS = [path.join(ROOT, "src/assets"), path.join(ROOT, "public")];
const SOURCE_DIR = path.join(ROOT, "src");
const SOURCE_EXTS = [".ts", ".tsx", ".js", ".jsx"];
const IMAGE_EXTS = [".png", ".jpg", ".jpeg"];
const MIN_SIZE_BYTES = 20 * 1024; // skip tiny icons/favicons — not worth the risk/effort
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;
const SKIP_DIR_NAMES = ["node_modules", "dist", "src_backup_pre_webp", "assets_backup_pre_webp", "public_backup_pre_webp"];

function walk(dir, exts, out = []) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (SKIP_DIR_NAMES.some((skip) => entry.name.includes(skip))) continue;
            walk(path.join(dir, entry.name), exts, out);
        } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
            out.push(path.join(dir, entry.name));
        }
    }
    return out;
}

async function convertImage(absolutePath) {
    const size = statSync(absolutePath).size;
    if (size < MIN_SIZE_BYTES) return null;

    const ext = path.extname(absolutePath);
    const outputPath = absolutePath.slice(0, -ext.length) + ".webp";
    const writeTarget = outputPath === absolutePath ? `${outputPath}.tmp` : outputPath;

    try {
        await sharp(absolutePath)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality: WEBP_QUALITY })
            .toFile(writeTarget);

        if (writeTarget !== outputPath) renameSync(writeTarget, outputPath);
        unlinkSync(absolutePath);

        const newSize = statSync(outputPath).size;
        return { oldName: path.basename(absolutePath), newName: path.basename(outputPath), before: size, after: newSize };
    } catch (err) {
        console.error(`  ✗ failed: ${path.basename(absolutePath)} - ${err.message}`);
        return null;
    }
}

async function run() {
    console.log("Scanning src/assets/ and public/ for images...");
    const imageFiles = IMAGE_DIRS.flatMap((dir) => walk(dir, IMAGE_EXTS));
    console.log(`Found ${imageFiles.length} PNG/JPG files.\n`);

    const renames = [];
    let totalBefore = 0;
    let totalAfter = 0;

    for (const file of imageFiles) {
        const result = await convertImage(file);
        if (result) {
            renames.push(result);
            totalBefore += result.before;
            totalAfter += result.after;
            console.log(`  ✓ ${result.oldName} -> ${result.newName}  (${(result.before / 1024).toFixed(0)}KB -> ${(result.after / 1024).toFixed(0)}KB)`);
        }
    }

    console.log(`\nConverted ${renames.length} images. Updating source-file references...\n`);

    const sourceFiles = walk(SOURCE_DIR, SOURCE_EXTS);
    let filesUpdated = 0;
    for (const file of sourceFiles) {
        let content = readFileSync(file, "utf8");
        let changed = false;
        for (const { oldName, newName } of renames) {
            if (content.includes(oldName)) {
                content = content.split(oldName).join(newName);
                changed = true;
            }
        }
        if (changed) {
            writeFileSync(file, content);
            filesUpdated++;
            console.log(`  updated: ${path.relative(ROOT, file)}`);
        }
    }

    console.log("\n=== Summary ===");
    console.log(`Images converted:  ${renames.length}`);
    console.log(`Source files updated: ${filesUpdated}`);
    console.log(`Total size: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB (saved ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)}MB)`);
    console.log("\nRun `npm run build` now — Vite will error loudly on any import it can't resolve.");
}

run();
