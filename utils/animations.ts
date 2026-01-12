/**
 * Minimal CSS‑in‑JS for the "tick" animation used on button clicks or
 * border state changes. The animation lasts 200 ms and transitions the
 * border colour from DPM Olive to Burnt Ochre.
 */
export const tickKeyframes = `
@keyframes tick {
  0%   { border-color: var(--tw-color-dpmOlive); }
  100% { border-color: var(--tw-color-burntOchre); }
}
`;

/** Helper to inject the keyframes into a global style tag (run once). */
export const injectTickAnimation = () => {
  if (typeof document === 'undefined') return;
  const styleId = 'tick-animation';
  if (document.getElementById(styleId)) return;
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = tickKeyframes;
  document.head.appendChild(style);
};
