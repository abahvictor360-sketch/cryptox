---
name: liquid-metal-logo
description: Render a logo/SVG/PNG as animated liquid chrome/metal with paper-design's WebGL2 liquid-logo shader (liquid.paper.design). Use when a site wants a liquid-metal, chrome or mercury animated logo or hero mark.
---

# Liquid Metal Logo (Paper Design)

Source: https://github.com/paper-design/liquid-logo, live tool at https://liquid.paper.design.
**License: PolyForm Shield 1.0.0** (see `assets/LICENSE`). Using it in client websites is fine. Do **not** use it to build a product that competes with Paper. Keep the license notice with any copied file.

## Options (pick in this order)
1. **npm package (preferred if available):** `@paper-design/shaders-react` ships a `LiquidMetal` component in recent versions. Check with `npm view @paper-design/shaders-react` and its README for current props before using it.
2. **No-code:** have the user upload the logo at liquid.paper.design, tune it, and embed or export the result.
3. **Vendored shader (this skill's `assets/`):**
   - `liquid-frag.ts` is the GLSL ES 3.0 fragment shader (`liquidFragSource`).
   - `canvas.tsx` is a React `<Canvas imageData params processing />` component that sets up WebGL2, uniforms and the RAF loop. It imports `toast` from `sonner` and `@/app/hero/liquid-frag`, so adjust both imports.
   - `parse-logo-image.ts`: `parseLogoImage(file | url) → { imageData, pngBlob }`. It turns a logo into the edge/height-field texture the shader needs. **The shader expects this processed ImageData, not the raw image.**
   - `params.ts` defines the ranges and defaults.

## Params (defaults)
| param | default | range |
|---|---|---|
| refraction | 0.015 | 0–0.06 |
| edge | 0.4 | 0–1 |
| patternBlur | 0.005 | 0–0.05 |
| liquid | 0.07 | 0–1 |
| speed | 0.3 | 0–1 |
| patternScale | 2 | 1–10 |

## Usage sketch (Next.js)
```tsx
'use client'
const [img, setImg] = useState<ImageData>()
useEffect(() => { parseLogoImage('/logo.svg').then(r => setImg(r.imageData)) }, [])
return img ? <Canvas imageData={img} params={defaultParams} processing={false} /> : null
```
Tips: use a solid single-color logo on a transparent background with clean edges, since thin strokes look weak. Size the canvas square-ish. It requires WebGL2, so render the static logo as a fallback and when `prefers-reduced-motion` is set.
