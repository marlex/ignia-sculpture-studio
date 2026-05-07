## Resumen
La mayor parte de la experiencia ya existe (top bar con "Publicar escultura" a la derecha, login con redirect, wizard de 4 pasos, dashboard del artista, certificado, perfil del escultor). Esta entrega cubre los huecos reales: visor de obra con 3 estados, dos piezas demo con `.glb` real, botones contextuales en las cards, flujo "Añadir vista 3D", validación restaurada y Poppins global.

## Cambios

### 1. Tipografía Poppins global
- `index.html`: añadir Google Fonts Poppins (300/400/500/600/700).
- `tailwind.config.ts`: `fontFamily.display` y `fontFamily.body` apuntando a `Poppins`.

### 2. Datos: GLB real en 2 obras demo
- `src/data/igniaWorks.ts`: añadir campo opcional `glbUrl` y `extraImages?: string[]` al tipo `WorkRecord`.
  - "vertigo" → `glbUrl = https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf`
  - "confluencia" → `glbUrl = https://threejs.org/examples/models/gltf/Michelle.glb`
- Para 2-3 obras añadir `extraImages` (reutilizando assets existentes) para activar Estado 2.

### 3. Visor real Three.js reutilizable
- Nuevo `src/components/ignia/GlbViewer.tsx`: `Canvas` + `useGLTF(url)` + `OrbitControls` (autoRotate off por defecto, on al primer interact), `Suspense` con spinner. Acepta `url: string`.

### 4. Visor de obra con 3 estados — `src/pages/ObraDetalle.tsx`
- Detectar estado:
  - Estado 1: solo `image` → render limpio centrado.
  - Estado 2: `extraImages.length >= 1` → galería con thumbnails, flechas hover, crossfade 200ms, contador "X fotos · Navega por los ángulos".
  - Estado 3: `glbUrl` → tabs `[Fotos] [Vista 3D]` si también hay fotos extra; si solo glb sin extras, abre directamente 3D con fallback a la foto principal.
- Sin transformaciones CSS 3D sobre fotos.

### 5. Cards del catálogo — `src/components/ignia/Coleccion.tsx`
- Botón overlay condicional:
  - `glbUrl` → "VER EN 3D" (abre modal con `GlbViewer`).
  - solo `extraImages` → "VER ÁNGULOS" (link a `/obra/:slug`).
  - nada → card limpia, sin botón.

### 6. Validación restaurada en `src/pages/Publicar.tsx`
- Volver a `step1Valid` (todos los campos obligatorios + descripción ≥ 80) y `step2Valid` (`fotoPrincipal` requerida).
- Mantener artista fijado a "Cristina Iglesias" y campo oculto.

### 7. Flujo "Añadir vista 3D" — nuevo `src/pages/AddView3d.tsx`
- Ruta `/dashboard/obras/:id/3d`.
- Paso A: subida múltiple 20–40 fotos con contador y botón "Continuar" gateado.
- Paso B: barra de progreso simulada + toggle email + permite cerrar (estado persistido en `localStorage`).
- Paso C: éxito con `GlbViewer` cargando un `.glb` demo (Michelle) → "Publicar vista 3D" marca la obra con `glbUrl` en el store; o estado de error con reintento.
- En `Dashboard` (Mis obras): añadir botón "Añadir vista 3D" si la obra no tiene `glbUrl`, indicador "Vista 3D activa" si la tiene.

## Detalles técnicos
- Three Fiber ya instalado (`@react-three/fiber@^8`, `@react-three/drei@^9`).
- `useGLTF.preload` para las URLs demo.
- `GlbViewer` con `Suspense` fallback = spinner Lucide `Loader2`.
- Crossfade fotos: dos `<img>` absolutos con `opacity` + `transition-opacity duration-200`.
- Mobile: thumbnails con `overflow-x-auto snap-x` (swipe nativo).
- No se toca el backend; persistencia sigue en `localStorage` (`obrasStore`).

## Fuera de alcance
- Procesamiento real de fotogrametría (se simula como pide la spec).
- Email real de aviso (toggle visual).
- Blockchain real (ya simulado con SHA-256 + UUID).