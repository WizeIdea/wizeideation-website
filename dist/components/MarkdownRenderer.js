import { jsx as _jsx } from "react/jsx-runtime";
const MarkdownRenderer = ({ html }) => (_jsx("div", { className: "prose lg:prose-xl max-w-none text-striationCharcoal", dangerouslySetInnerHTML: { __html: html } }));
export default MarkdownRenderer;
