---
name: liquid-logo-plasma
description: Animated liquid/plasma flow effect around a logo using collidingScopes/liquid-logo (WebGL1 fragment shader, XorDev "Plasma"-based, with presets and PNG/MP4 export). Use when a site needs a glowing, flowing liquid-energy logo animation or background that reacts to a logo's edges.
---

# Liquid Logo — plasma flow (collidingScopes)

Source: https://github.com/collidingScopes/liquid-logo (MIT, see `assets/LICENSE.txt`). Live tool: https://collidingscopes.github.io/liquid-logo
This is different from `liquid-metal-logo` (Paper's chrome look). This one makes colorful glowing plasma streams that flow around the logo's contours.

## Vendored files (`assets/`)
- `fragment-shader.glsl` / `vertex-shader.glsl` are the shaders (WebGL1, full-screen quad, `TRIANGLE_STRIP` of 4 verts).
- `shaders.js` has the `fetchShader(url)` and `createShaderProgram(gl, vs, fs)` helpers.
- `main.js` is the reference app: it sets up the context, `resizeAndCreateLogoTexture` (max 1500px, keeps aspect ratio), uniform wiring in `drawScene()` and the RAF loop. It uses dat.GUI and globals, so treat it as a reference to port, not a drop-in.
- `presets.js` holds named parameter presets (`Glow`, `Wisp`, …).

## Uniforms to set each frame
`u_resolution (vec2)`, `u_time (s)`, `u_speed`, `u_iterations`, `u_scale`, `u_dotFactor`, `u_vOffset`, `u_intensityFactor`, `u_expFactor`, `u_colorFactors (vec3 = red/green/blueFactor)`, `u_colorShift`, `u_dotMultiplier`, `u_noiseIntensity`, `u_logoTexture (sampler, unit 0)`, `u_logoOpacity`, `u_logoScale`, `u_logoAspectRatio`, `u_logoInteractStrength`, `u_logoBlendMode (int, 0 = normal)`.

Example "Glow" preset: `speed .34, iterations 15, scale 3.11, dotFactor .66, dotMultiplier .36, vOffset 6, intensityFactor .1, expFactor 1.8, noiseIntensity .5, colorFactors (.2, 0, -.2), colorShift .5, logoInteractStrength .66`.

## Porting into a site
1. Copy the shaders into the project. Inline them as template strings, or serve them from `public/` and `fetchShader` them.
2. Create a WebGL context with `{ alpha: true, premultipliedAlpha: false }`, enable `SRC_ALPHA, ONE_MINUS_SRC_ALPHA` blending, and clear to transparent so it can overlay any background.
3. Upload the logo as a texture (a transparent PNG with clean edges works best), then wire the uniforms from a preset.
4. In React, put the whole thing in a `useEffect` on a `<canvas ref>`, handle resize with `devicePixelRatio`, and cancel the RAF and delete the GL resources on unmount.
5. Pause when offscreen (IntersectionObserver) and honor `prefers-reduced-motion`. Lower `u_iterations` on mobile for performance.
6. For a pre-rendered asset instead of a live shader, export MP4 or PNG from the live tool and use a `<video autoplay muted loop playsinline>`.
