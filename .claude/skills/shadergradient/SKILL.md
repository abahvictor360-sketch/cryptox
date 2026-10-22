---
name: shadergradient
description: Animated 3D mesh-gradient backgrounds with ShaderGradient (@shadergradient/react on react-three-fiber, or @shadergradient/vue). Use when a website hero/section needs a moving, grainy, colorful 3D gradient background (plane, sphere or water-plane), or when the user pastes a shadergradient.co/customize URL.
---

# ShaderGradient

Source: https://github.com/ruucm/shadergradient (MIT). Playground: https://www.shadergradient.co/customize. Full upstream docs are in `references/upstream-README.md` and `references/vue-README.md`.

## Install (React)
```bash
npm i @shadergradient/react @react-three/fiber three three-stdlib camera-controls
npm i -D @types/three
```
| Environment | React | @react-three/fiber | three |
|---|---|---|---|
| Next 15+ App Router | ^19 | **^9** (v8 breaks) | >=0.158 |
| Next 14 / Pages / Vite | 18 or 19 | matching 8.x / 9.x | >=0.158 |

## Usage
```tsx
'use client'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export function HeroGradient() {
  return (
    <ShaderGradientCanvas style={{ position: 'absolute', inset: 0, zIndex: -1 }}
      pixelDensity={1.5} fov={45} lazyLoad>
      <ShaderGradient type="waterPlane" animate="on" uSpeed={0.2} uStrength={3}
        uDensity={1.3} uFrequency={5.5} color1="#ff5005" color2="#dbba95" color3="#d0bce1"
        cDistance={3.6} cPolarAngle={90} lightType="3d" brightness={1.2} grain="on" />
    </ShaderGradientCanvas>
  )
}
```
For Next.js, import the component with `dynamic(..., { ssr: false })`.

Easiest design workflow: tune the gradient at shadergradient.co/customize, copy the URL, then:
```tsx
<ShaderGradient control="query" urlString="https://www.shadergradient.co/customize?animate=on&..." />
```

## Key props
- Mesh: `type 'plane'|'sphere'|'waterPlane'`, `animate 'on'|'off'`, `uSpeed`, `uStrength`, `uDensity`, `uFrequency`, `uAmplitude`, `color1..3`, `reflection`, `wireframe`, `position/rotation X/Y/Z`, `range`/`rangeStart`/`rangeEnd`, `loop`/`loopDuration`.
- Camera/light: `cAzimuthAngle`, `cPolarAngle`, `cDistance`, `cameraZoom`, `lightType '3d'|'env'`, `envPreset 'city'|'dawn'|'lobby'`, `brightness`, `grain 'on'|'off'`.
- Canvas: `pixelDensity`, `fov`, `lazyLoad`, `threshold`, `rootMargin`, `powerPreference`, `preserveDrawingBuffer`.

## Tips
- Keep it behind content (`zIndex: -1` or an absolute layer). Keep `pixelDensity` at 1 to 1.5 on mobile.
- Use `animate="off"` when `prefers-reduced-motion` is set.
- It pairs well with the `liquid-glass-js` skill, because glass needs a rich background to refract.
- Vue/Nuxt: use `@shadergradient/vue` (TresJS). See `references/vue-README.md`.
