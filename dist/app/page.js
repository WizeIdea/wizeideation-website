import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Image from 'next/image';
import Seo from '@/components/Seo';
const Home = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Seo, { title: "Home", description: "Tactical Intellectual research archive \u2013 stylometric alignment, AI persona architecture, forensic linguistics." }), _jsxs("section", { className: "relative w-full h-[64vh] overflow-hidden rounded-none", children: [_jsx(Image, { src: "/banner-sunrise.png", alt: "Sunrise over a cracked salt lake with an olive flax\u2011bush in the foreground", fill: true, priority: true, className: "object-cover" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30", children: _jsx("h1", { className: "text-4xl md:text-6xl font-serif-primary text-saltWhite drop-shadow-md", children: "Wize Ideation" }) })] }), _jsx("section", { className: "mt-12 text-center", children: _jsx("p", { className: "text-lg max-w-2xl mx-auto text-striationCharcoal", children: "A high\u2011end research archive that aligns the noise of human writing into a sovereign signal. Explore papers, services, and case studies built on forensic linguistics and AI persona architecture." }) })] }));
};
export default Home;
