---
name: react-three-fiber
description: Build 3D scenes in React with @react-three/fiber (R3F, the React renderer for three.js). Use when a website needs WebGL/3D content such as hero scenes, product viewers, interactive backgrounds, loaded GLTF models or shader materials, or when another skill (e.g. shadergradient) depends on R3F.
---

# React Three Fiber

Source: https://github.com/pmndrs/react-three-fiber (MIT). The official docs are bundled in `references/`. Read the relevant page before writing non-trivial code.

## Versions (check before installing)
- `@react-three/fiber@9` needs **React 19** (`react >=19 <19.4`) and `three >=0.156`. Use v9 for Next.js 15+ App Router.
- `@react-three/fiber@8` is for React 18 projects.
- Read `references/tutorials/v9-migration-guide.mdx` when upgrading.

```bash
npm i three @react-three/fiber @react-three/drei
npm i -D @types/three
```

## Minimal scene
```tsx
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

function Box() {
  const ref = useRef<Mesh>(null!)
  useFrame((_, delta) => { ref.current.rotation.y += delta })
  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />
      <Box />
    </Canvas>
  )
}
```

## Rules that matter
- **Next.js:** R3F only runs on the client. Put `'use client'` in the scene file and load it with `dynamic(() => import('./Scene'), { ssr: false })`.
- Give `<Canvas>` a parent with an explicit size, since it fills its parent.
- In `useFrame`, mutate refs directly and **never call `setState`**. Never create objects (`new Vector3()`) in the loop. See `references/advanced/pitfalls.mdx`.
- Use `frameloop="demand"` and `invalidate()` for mostly-static scenes, and cap `dpr={[1, 2]}`. See `references/advanced/scaling-performance.mdx`.
- Load models with `useGLTF` (drei) or `useLoader`, wrapped in `<Suspense>`. Use `npx gltfjsx model.glb` to generate typed components. See `references/tutorials/loading-models.mdx`.
- Respect `prefers-reduced-motion` and provide a static fallback for low-power devices.

## Reference map
| Need | File |
|---|---|
| Canvas props (gl, camera, shadows, dpr, frameloop) | `references/API/canvas.mdx` |
| Hooks (`useFrame`, `useThree`, `useLoader`) | `references/API/hooks.mdx` |
| JSX ↔ three objects, `args`, `attach`, primitives | `references/API/objects.mdx` |
| Pointer events, raycasting | `references/API/events.mdx` |
| TypeScript / `extend` / `ThreeElements` | `references/API/typescript.mdx` |
| Ecosystem (drei, postprocessing, rapier…) | `references/getting-started/community-r3f-components.mdx` |
| Animation, textures, models | `references/tutorials/*.mdx` |
