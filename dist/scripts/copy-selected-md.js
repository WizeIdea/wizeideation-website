"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * copy-selected-md.ts
 *
 * Reads every *.md file from the remote Obsidian repo (checked out by the CI),
 * keeps only those with `publish: true` in front‑matter,
 * and copies them into the appropriate content sub‑folder
 *   - papers/
 *   - services/
 *   - projects/
 *
 * This script is run from the GitHub Action (Node 20 runtime).
 */
var fs = require("fs");
var path = require("path");
var gray_matter_1 = require("gray-matter");
var OB_CONTENT_ROOT = path.resolve(process.cwd(), 'obsidian'); // repo checked out by the Action
var DEST_ROOT = path.resolve(process.cwd(), 'content');
function ensureDir(dir) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
}
/**
 * Walk the Obsidian folder, find .md files, filter by front‑matter.
 */
function copyPublished() {
    var _a;
    var allFiles = getAllMdFiles(OB_CONTENT_ROOT);
    for (var _i = 0, allFiles_1 = allFiles; _i < allFiles_1.length; _i++) {
        var filePath = allFiles_1[_i];
        var raw = fs.readFileSync(filePath, 'utf8');
        var data = (0, gray_matter_1.default)(raw).data;
        // Only copy if `publish: true`
        if (!data.publish)
            continue;
        // Determine destination based on DocumentType field
        var docType = (_a = data.DocumentType) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (!docType)
            continue; // skip if we cannot classify
        var destDir = path.join(DEST_ROOT, docType);
        ensureDir(destDir);
        var fileName = path.basename(filePath);
        var destPath = path.join(destDir, fileName);
        fs.copyFileSync(filePath, destPath);
        console.log("\u2714 Copied ".concat(fileName, " \u2192 ").concat(docType));
    }
}
/**
 * Recursively collect *.md files.
 */
function getAllMdFiles(dir) {
    var entries = fs.readdirSync(dir, { withFileTypes: true });
    var files = [];
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        var full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push.apply(files, getAllMdFiles(full));
        }
        else if (entry.isFile() && entry.name.endsWith('.md')) {
            files.push(full);
        }
    }
    return files;
}
// Execute when the script is run directly
if (require.main === module) {
    copyPublished();
}
