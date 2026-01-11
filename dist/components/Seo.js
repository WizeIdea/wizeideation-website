// components/Seo.tsx
'use client'; // <‑‑ 👈 this line makes the file a client component
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Head from 'next/head';
import { usePathname } from 'next/navigation';
const Seo = ({ title, description, meta = {}, image }) => {
    const pathname = usePathname(); // client‑side hook – now allowed
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wizeidea.com';
    const metaTags = Object.entries(meta).map(([k, v]) => (_jsx("meta", { name: k, content: v }, k)));
    return (_jsxs(Head, { children: [_jsxs("title", { children: [title, " | Wize Ideation"] }), _jsx("meta", { name: "description", content: description }), _jsx("meta", { name: "robots", content: "index,follow" }), _jsx("link", { rel: "canonical", href: `${siteUrl}${pathname}` }), image && _jsx("meta", { property: "og:image", content: image }), _jsx("meta", { property: "og:title", content: title }), _jsx("meta", { property: "og:description", content: description }), _jsx("meta", { property: "og:url", content: `${siteUrl}${pathname}` }), _jsx("meta", { property: "og:type", content: "website" }), metaTags, _jsx("link", { rel: "icon", href: "/favicon-16x16.png", sizes: "16x16" }), _jsx("link", { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32" }), _jsx("link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" })] }));
};
export default Seo;
