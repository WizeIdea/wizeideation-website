import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './globals.css';
import NavMenu from '@/components/NavMenu';
import Seo from '@/components/Seo';
export const metadata = {
    title: {
        default: 'Wize Ideation – Tactical Intellectual Research',
        template: '%s | Wize Ideation'
    },
    description: 'A high‑end research archive for stylometric alignment, AI persona architecture, and forensic linguistics.',
    openGraph: {
        images: [{ url: '/banner-sunrise.jpg', alt: 'Sunrise over cracked salt flats' }]
    }
};
const RootLayout = ({ children }) => {
    return (_jsxs("html", { lang: "en", className: "scroll-smooth", children: [_jsx("head", { children: _jsx(Seo, { title: metadata.title.default, description: metadata.description, image: metadata.openGraph.images[0].url }) }), _jsxs("body", { className: "bg-saltWhite text-striationCharcoal antialiased", children: [_jsx(NavMenu, {}), _jsx("main", { className: "max-w-7xl mx-auto py-8 px-4", children: children }), _jsxs("footer", { className: "border-t border-dpmOlive py-4 text-center text-sm text-dpmOlive", children: ["\u00A9 ", new Date().getFullYear(), " Wize Ideation. All rights reserved."] })] })] }));
};
export default RootLayout;
