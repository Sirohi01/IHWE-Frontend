// Finds source references to a converted .webp image where the resolved
// path doesn't actually exist on disk (basename-only replacement can
// mis-fire when two different directories have a same-named file where only
// one was actually converted). For each broken reference, checks if the
// original .png/.jpg/.jpeg sibling exists at that exact resolved path and,
// if so, reports it as a fix (`--fix` applies it).
import { readdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "src");
const PUBLIC_DIR = path.join(ROOT, "public");
const SOURCE_EXTS = [".ts", ".tsx", ".js", ".jsx"];
const SKIP_DIR_NAMES = ["node_modules", "dist", "assets_backup_pre_webp"];
const APPLY_FIX = process.argv.includes("--fix");

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

// Matches: import x from "...something.webp"  AND  "/public/path/....webp" style string literals
const IMPORT_RE = /from\s+["']([^"']+\.webp)["']/g;
const STRING_RE = /["'](\/[^"']+\.webp)["']/g;

function resolveImportPath(importerFile, importPath) {
    if (importPath.startsWith(".")) {
        return path.resolve(path.dirname(importerFile), importPath);
    }
    if (importPath.startsWith("@/")) {
        return path.join(SOURCE_DIR, importPath.slice(2));
    }
    return null; // bare specifier (node_modules) — not our concern
}

function resolvePublicPath(publicPath) {
    return path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
}

function findOriginalSibling(webpAbsPath) {
    const withoutExt = webpAbsPath.slice(0, -".webp".length);
    for (const ext of [".png", ".jpg", ".jpeg"]) {
        if (existsSync(withoutExt + ext)) return withoutExt + ext;
    }
    return null;
}

function run() {
    const sourceFiles = walk(SOURCE_DIR, SOURCE_EXTS);
    let brokenCount = 0;
    let fixedCount = 0;

    for (const file of sourceFiles) {
        let content = readFileSync(file, "utf8");
        let fileChanged = false;

        for (const [regex, resolver] of [
            [IMPORT_RE, (p) => resolveImportPath(file, p)],
            [STRING_RE, (p) => resolvePublicPath(p)],
        ]) {
            regex.lastIndex = 0;
            let match;
            while ((match = regex.exec(content)) !== null) {
                const importPath = match[1];
                const absPath = resolver(importPath);
                if (!absPath) continue;
                if (existsSync(absPath)) continue; // fine, resolves correctly

                const original = findOriginalSibling(absPath);
                brokenCount++;
                console.log(`BROKEN: ${path.relative(ROOT, file)} -> "${importPath}" (resolves to ${absPath})`);
                if (original) {
                    console.log(`  fix available: revert to .${path.extname(original).slice(1)}`);
                    if (APPLY_FIX) {
                        const newImportPath = importPath.slice(0, -".webp".length) + path.extname(original);
                        content = content.split(`"${importPath}"`).join(`"${newImportPath}"`);
                        content = content.split(`'${importPath}'`).join(`'${newImportPath}'`);
                        fileChanged = true;
                        fixedCount++;
                    }
                } else {
                    console.log(`  ✗ no original sibling found either — needs manual look`);
                }
            }
        }

        if (fileChanged) {
            writeFileSync(file, content);
        }
    }

    console.log(`\n=== ${brokenCount} broken reference(s) found${APPLY_FIX ? `, ${fixedCount} fixed` : " (run with --fix to apply)"} ===`);
}

run();
