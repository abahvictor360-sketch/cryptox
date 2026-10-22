---
name: liquid-glass-js
description: Add Apple "Liquid Glass"-style WebGL glass UI (buttons, pills, nav bars, panels with real refraction, blur and rim lighting) to a web page using dashersw/liquid-glass-js. Use when a design calls for liquid glass, glassmorphism with true refraction, or frosted glass controls.
---

# Liquid Glass JS

Source: https://github.com/dashersw/liquid-glass-js (MIT, see `assets/LICENSE`). There is no npm package, so the library files are vendored in `assets/`:
`container.js` (core `Container` class), `button.js` (`Button extends Container`), `glass.css`, `styles.css`.

## Install into a project
1. Copy `assets/container.js`, `assets/button.js` and `assets/glass.css` into the project, e.g. `public/vendor/liquid-glass/`. Keep the LICENSE alongside them.
2. Load html2canvas first, because it snapshots the page so the glass can refract it:
```html
<link rel="stylesheet" href="/vendor/liquid-glass/glass.css" />
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="/vendor/liquid-glass/container.js"></script>
<script src="/vendor/liquid-glass/button.js"></script>
```
3. The scripts define globals (`Container`, `Button`), not ES modules. In React or Next.js, load them with `<Script strategy="afterInteractive">` (or in `useEffect` after loading), then construct the elements inside `useEffect` and append them to a ref. Remove them on unmount.

## API
```js
const nav = new Container({ type: 'rounded', borderRadius: 20, tintOpacity: 0.1 })
;['Home', 'Markets', 'Wallet'].forEach(t =>
  nav.addChild(new Button({ text: t, size: 16, type: 'pill', onClick: txt => go(txt) })))
document.querySelector('#nav-slot').appendChild(nav.element)
```
- `Container({ borderRadius=48, type='rounded'|'circle'|'pill', tintOpacity=0.2 })`, with `.addChild()`, `.removeChild()` and `.updateSizeFromDOM()`.
- `Button({ text, size=48 (font px), type, onClick(text), warp=false, tintOpacity=0.2 })`.
- Nested glass: children sample the parent container's rendered output.
- Global tuning: set `window.glassControls = { edgeIntensity, rimIntensity, baseIntensity, edgeDistance, rimDistance, baseDistance, cornerBoost, rippleEffect, blurRadius, tintOpacity }`, then update uniforms on `Container.instances` (see the README pattern in `container.js`).
- Styling hooks: `.glass-container`, `.glass-container-pill`, `.glass-container-circle`, `.glass-button`, `.glass-button-circle`, `.glass-button-text`.

## Caveats
- The effect needs a **rich background** (image, gradient, shader) behind it. On flat colors it looks like plain blur.
- html2canvas takes **one** page snapshot at init. If the content behind the glass changes, for example an animated background, call `Container.pageSnapshot = null` and re-capture it, or accept the static refraction.
- It requires WebGL. Give a CSS fallback (`backdrop-filter: blur(16px) saturate(180%)`) for when WebGL is unavailable, and keep text contrast accessible.
- Each instance has its own WebGL context, and browsers cap contexts at about 16. Use a few large containers rather than dozens of tiny ones.
