// Re-applies the old-image-name -> new-webp-name source reference update,
// this time with a boundary-safe regex (fixes the bug in
// optimize-static-images.mjs where a short filename like "2.png" matched as
// a false-positive substring inside an unrelated longer filename like
// "favicon-32x32.png").
//
// Derives the exact rename list from `git status` (deleted originals) +
// on-disk .webp files, rather than re-parsing the old run's log — the git
// working tree is the source of truth for what's actually been renamed.
import { execSync } from "child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SOURCE_DIR = path.join(ROOT, "src");
const SOURCE_EXTS = [".ts", ".tsx", ".js", ".jsx"];
const IMAGE_EXTS = [".png", ".jpg", ".jpeg"];
const SKIP_DIR_NAMES = ["node_modules", "dist", "assets_backup_pre_webp"];

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

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

function getDeletedImagePaths() {
    const raw = execSync("git status --porcelain -z", { cwd: ROOT, maxBuffer: 1024 * 1024 * 50 }).toString("utf8");
    const entries = raw.split("\0").filter(Boolean);
    const deleted = [];
    for (const entry of entries) {
        const status = entry.slice(0, 2);
        const filePath = entry.slice(3);
        if (status.includes("D") && IMAGE_EXTS.includes(path.extname(filePath).toLowerCase())) {
            deleted.push(filePath);
        }
    }
    return deleted;
}

function run() {
    const deleted = getDeletedImagePaths();
    console.log(`Found ${deleted.length} deleted original image paths.`);

    const renames = [];
    for (const relPath of deleted) {
        const ext = path.extname(relPath);
        const webpRelPath = relPath.slice(0, -ext.length) + ".webp";
        const webpAbsPath = path.join(ROOT, webpRelPath);
        if (existsSync(webpAbsPath)) {
            renames.push({ oldName: path.basename(relPath), newName: path.basename(webpRelPath) });
        }
    }
    // De-dupe (multiple deleted files can share the same basename in different folders)
    const uniqueRenames = [...new Map(renames.map((r) => [r.oldName + "->" + r.newName, r])).values()];
    console.log(`${uniqueRenames.length} unique old-name -> new-name pairs to relink.\n`);

    const sourceFiles = walk(SOURCE_DIR, SOURCE_EXTS);
    let filesUpdated = 0;
    let totalReplacements = 0;

    for (const file of sourceFiles) {
        let content = readFileSync(file, "utf8");
        let changed = false;
        for (const { oldName, newName } of uniqueRenames) {
            // Boundary-safe: oldName must not be preceded by another filename
            // character (this is what fixed "favicon-32x32.png" incorrectly
            // matching the renamed "2.png" as a substring).
            const pattern = new RegExp(`(?<![A-Za-z0-9_.-])${escapeRegex(oldName)}`, "g");
            const matches = content.match(pattern);
            if (matches) {
                content = content.replace(pattern, newName);
                changed = true;
                totalReplacements += matches.length;
            }
        }
        if (changed) {
            writeFileSync(file, content);
            filesUpdated++;
            console.log(`  updated: ${path.relative(ROOT, file)}`);
        }
    }

    console.log(`\n=== Summary ===`);
    console.log(`Source files updated: ${filesUpdated}`);
    console.log(`Total replacements: ${totalReplacements}`);
}

run();
