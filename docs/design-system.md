# Design System – Forensic / Field‑Research Aesthetic

## Colour palette
- **Salt White** – `#F8F9FA` – page background  
- **Burnt Ochre** – `#B7410E` – primary interactive elements  
- **DPM Olive** – `#4B5320` – secondary structural cues, borders  
- **Striation Charcoal** – `#2E2E2E` – body text, headings  
- **Olive 50** – `#F2F5EA` – light background for call‑outs / cards  

All colours are available as Tailwind utilities: `bg‑saltWhite`, `text‑burntOchre`, `border‑dpmOlive`, `bg‑olive50`, etc.

## UI components
- **Button** (`components/ui/Button.tsx`): primary & secondary variants, focus‑visible ring in Burnt Ochre, disabled state.  
- **Card** (`components/ui/Card.tsx`): light olive background, 1 px DPM Olive border, hover → Burnt Ochre border.  
- **DataTable** (`components/ui/DataTable.tsx`): monospaced, solid olive borders, hover background in Burnt Ochre/10.  

## Micro‑interactions
- **Tick animation** – a 200 ms border‑color transition from DPM Olive to Burnt Ochre. Use `animate-tick` class after calling `injectTickAnimation()` from `utils/animations.ts`.

## Accessibility
- All interactive components expose `aria‑disabled`, `focus-visible` rings, and use semantic HTML (`<button>`, `table role="table">`).  

---

*Follow these guidelines when extending the UI library (e.g., forms, modal dialogs) to keep the forensic, data‑first aesthetic consistent.*
