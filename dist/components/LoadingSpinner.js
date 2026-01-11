import { jsx as _jsx } from "react/jsx-runtime";
const frames = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
const LoadingSpinner = () => (_jsx("div", { className: "font-mono text-2xl text-dpmOlive animate-pulse", "aria-label": "Loading", children: frames.map((f, i) => (_jsx("span", { className: "inline-block", style: { animationDelay: `${i * 0.1}s` }, children: f }, i))) }));
export default LoadingSpinner;
