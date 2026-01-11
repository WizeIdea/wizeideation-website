"use strict";
/**
 * scripts/copy-selected-md.ts
 *
 * Copies only markdown files that have `publish: true` in their front‑matter
 * from the checked‑out Obsidian repo into the appropriate `content/` sub‑folder.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter")); // <-- default import (works with esModuleInterop)
const OB_CONTENT_ROOT = path.resolve(process.cwd(), 'obsidian'); // checked‑out by the CI
const DEST_ROOT = path.resolve(process.cwd(), 'content');
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
/**
 * Recursively collect *.md files under a directory.
 */
function getAllMdFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...getAllMdFiles(fullPath));
        }
        else if (entry.isFile() && entry.name.endsWith('.md')) {
            files.push(fullPath);
        }
    }
    return files;
}
/**
 * Main copy routine – only copies files where `publish: true`.
 */
function copyPublished() {
    const allFiles = getAllMdFiles(OB_CONTENT_ROOT);
    for (const filePath of allFiles) {
        const raw = fs.readFileSync(filePath, 'utf8'); // plain UTF‑8 string
        const { data } = (0, gray_matter_1.default)(raw); // <-- works now
        // Skip anything that isn’t explicitly published
        if (!data.publish)
            continue;
        // Determine destination sub‑folder from the DocumentType front‑matter
        const docType = data.DocumentType?.toLowerCase();
        if (!docType)
            continue; // ignore files without a proper type
        const destDir = path.join(DEST_ROOT, docType);
        ensureDir(destDir);
        const fileName = path.basename(filePath);
        const destPath = path.join(destDir, fileName);
        fs.copyFileSync(filePath, destPath);
        console.log(`✔ Copied ${fileName} → ${docType}`);
    }
}
// Run when invoked directly (the GitHub Action will call the script)
if (require.main === module) {
    copyPublished();
}
