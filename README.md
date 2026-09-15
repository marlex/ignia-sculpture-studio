# Ignia Art Collective

Déjame ver el SVG del logo primero.Perfecto. Tengo el logo completo: IGNIA en tipografía custom con la G icónica. Ahora veo exactamente cómo es. Tiene fondo blanco y sombra, necesito limpiarlo para el header. Y ahora construyo el prompt más ambicioso de todo el proyecto.

---

# IGNIA GALLERY — PROMPT DEFINITIVO DESDE CERO
## Hero inmersivo, sin convenciones, todo wow.

---

## LOGO — IMPLEMENTACIÓN EXACTA

El logo es un SVG adjunto. Úsalo exactamente así, limpiando el fondo blanco y la sombra para que sea transparente sobre cualquier superficie:

```html
<!-- Logo en el header — versión negra sobre blanco -->
<svg width="94" height="31" viewBox="0 0 133 38" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M126.938 27.5329H107.986V23.0249H126.938V27.5329ZM133.47 35.4449H127.858L116.588 6.14293H118.336L107.066 35.4449H101.638L114.656 2.55493H120.452L133.47 35.4449Z" fill="#111111"/>
  <path d="M96.6889 35.4449H91.3989V2.55493H96.6889V35.4449Z" fill="#111111"/>
  <path d="M61.9599 35.4449H56.8079V2.55493H62.4199L81.0959 30.2469H79.3019V2.55493H84.4539V35.4449H78.8419L60.1199 7.75293H61.9599V35.4449Z" fill="#111111"/>
  <path d="M50.7515 35.445H45.8295V30.799L46.3815 31.029C45.3081 32.6543 43.8208 33.927 41.9195 34.847C40.0488 35.7363 37.9481 36.181 35.6175 36.181C33.1948 36.181 30.9561 35.767 28.9015 34.939C26.8468 34.0803 25.0528 32.8843 23.5195 31.351C21.9861 29.8176 20.7901 28.0083 19.9315 25.923C19.1035 23.807 18.6895 21.4916 18.6895 18.977C18.6895 16.5236 19.1188 14.2543 19.9775 12.169C20.8361 10.0836 22.0475 8.2743 23.6115 6.74097C25.1755 5.17697 27.0155 3.96564 29.1315 3.10697C31.2475 2.2483 33.5475 1.81897 36.0315 1.81897C38.9141 1.81897 41.5208 2.3863 43.8515 3.52097C46.2128 4.62497 48.1295 6.12764 49.6015 8.02897L46.0595 11.571C44.9555 10.007 43.5448 8.7803 41.8275 7.89097C40.1408 6.97097 38.2088 6.51097 36.0315 6.51097C33.7621 6.51097 31.7228 7.06297 29.9135 8.16697C28.1348 9.2403 26.7395 10.7123 25.7275 12.583C24.7155 14.4536 24.2095 16.585 24.2095 18.977C24.2095 21.3996 24.7155 23.5616 25.7275 25.463C26.7701 27.3643 28.1808 28.8516 29.9595 29.925C31.7688 30.9983 33.8388 31.535 36.1695 31.535C38.4695 31.535 40.5088 31.0443 42.2875 30.063C44.0968 29.051 45.4001 27.6556 46.1975 25.877L45.7835 27.671V22.105H35.7555V17.781H50.7515V35.445Z" fill="#111111"/>
  <path d="M12.8198 35.4449H7.52979V2.55493H12.8198V35.4449Z" fill="#111111"/>
</svg>

<!-- Logo versión blanca — para uso sobre fondos oscuros -->
<!-- Mismo SVG con fill="#FFFFFF" en todos los paths -->
```

El logo nunca tiene sombra, nunca tiene fondo. Solo los paths en negro o blanco según el contexto.

---

## SISTEMA DE DISEÑO

### Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@200;300;400;700&family=Manrope:wght@200;300;400&display=swap" rel="stylesheet">
```

```css
:root {
  --f-display: 'Urbanist', sans-serif;
  --f-body:    'Manrope', sans-serif;
  --white:     #FFFFFF;
  --black:     #111111;
  --gray:      #888888;
  --muted:     #BBBBBB;
  --border:    #E8E8E4;
  --surface:   #F8F8F6;
  --verde:     #CCFF00;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--f-body); background: var(--white); overflow-x: hidden; }
```

Pesos permitidos: Urbanist 200 / 300 / 700. Manrope 200 / 300 / 400. Sin ningún otro peso. Sin ninguna otra fuente. Sin border-radius en ningún elemento excepto avatares circulares. Todos los botones con border-radius 0. Sin sombras decorativas. Sin gradientes. Sin badges de color en ninguna sección.

### CTAs — regla absoluta

```css
.btn-primary {
  font-family: var(--f-body);
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: var(--black);
  color: var(--white);
  border: none;
  border-radius: 0;
  padding: 13px 28px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.7; }

.btn-ghost {
  font-family: var(--f-body);
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: transparent;
  color: var(--black);
  border: 0.5px solid var(--border);
  border-radius: 0;
  padding: 13px 28px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.btn-ghost:hover { border-color: var(--black); }

.link-arrow {
  font-family: var(--f-body);
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--black);
  text-decoration: none;
  border-bottom: 0.5px solid var(--black);
  padding-bottom: 1px;
  display: inline-block;
  transition: opacity 0.2s;
}
.link-arrow:hover { opacity: 0.45; }
```

---

## HEADER

Fondo `#FFFFFF`. Height 56px. Sticky. Border-bottom `0.5px solid #E8E8E4`. Sin blur. Z-index 100. Padding 0 48px.

```
[LOGO SVG]     [Ignia  Colección  Artistas  Aprende  Editorial]     [Entrar]  [Publicar obra ↗]
```

Nav central: Manrope 300, 12px, color `#888888`, gap 36px. Sin separadores. Sin uppercase.

"Entrar": Manrope 300, 11px, color `#888888`. Sin borde.

"Publicar obra": btn-primary con padding 8px 20px.

Estado logado: avatar circular 28px + nombre Manrope 300 11px `#111111`.

---

## HERO — CONCEPTO RADICAL

Olvida el hero tradicional de galería. Este hero es una experiencia de sala de exposición.

**La escultura ocupa el centro de la pantalla, sola, en rotación continua. No hay texto superpuesto encima de la obra. No hay columnas. No hay split layout. La obra ES la pantalla.**

El texto y las miniaturas viven en una franja horizontal en la parte inferior, superpuesta sobre el fondo del visor con un fade de blanco muy sutil en la base. Como si estuvieras en una galería y la cartela de la obra estuviera en el suelo frente a ti.

### Layout

```css
#hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--surface);
}

/* El canvas ocupa TODA la pantalla */
#viewer-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: grab;
}
#viewer-canvas:active { cursor: grabbing; }

/* Fade inferior — gradiente blanco desde abajo */
#hero-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 220px;
  background: linear-gradient(to top, rgba(248,248,246,0.98) 0%, rgba(248,248,246,0.85) 40%, transparent 100%);
  pointer-events: none;
  z-index: 2;
}

/* La franja inferior con miniaturas y descripción */
#hero-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 0 48px 36px;
  display: flex;
  align-items: flex-end;
  gap: 48px;
}
```

### Miniaturas inline — izquierda

```html



    


    


    


```

```css
#hero-thumbs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.hero-thumb {
  cursor: pointer;
  transition: opacity 0.25s;
  opacity: 0.3;
}
.hero-thumb:hover { opacity: 0.6; }
.hero-thumb.active { opacity: 1; }

.hero-thumb-img {
  width: 44px;
  height: 56px;
  background: #EDEDEA;
  border: 0.5px solid #E8E8E4;
  overflow: hidden;
  transition: border-color 0.2s;
}

/* Miniatura activa: línea inferior en verde ácido */
.hero-thumb.active .hero-thumb-img {
  border-bottom: 2px solid var(--verde);
}
```

### Descripción de obra — bloque central

```html




  

01 — 03



  

Ofrenda



  


    Helena Vázquez
    ·
    Bronce pulido a mano
    ·
    2025
    ·
    Edición única



  


    € 22.500
    Ver obra completa →






```

```css
#obra-info {
  flex: 1;
}

.obra-index {
  font-family: var(--f-body);
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.2em;
  color: var(--gray);
  text-transform: uppercase;
  margin-bottom: 6px;
}

.obra-nombre {
  font-family: var(--f-display);
  font-size: clamp(36px, 5vw, 72px);
  font-weight: 700;
  color: var(--black);
  letter-spacing: -0.03em;
  line-height: 0.95;
  margin-bottom: 12px;
}

.obra-meta-line {
  font-family: var(--f-body);
  font-size: 12px;
  font-weight: 300;
  color: var(--gray);
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.sep { color: var(--border); }

.obra-footer-line {
  display: flex;
  align-items: baseline;
  gap: 28px;
}

.obra-precio {
  font-family: var(--f-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--black);
  letter-spacing: -0.01em;
}
```

### Selector de fondo — derecha extrema del hero-bottom

```html


Fondo


    Estudio
    Blanco
    Negro


```

```css
#visor-controls {
  flex-shrink: 0;
  text-align: right;
}

.vc-label {
  font-family: var(--f-body);
  font-size: 8px;
  font-weight: 300;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}

.vc-btns {
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: flex-end;
}

.vbtn {
  font-family: var(--f-body);
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray);
  background: rgba(248,248,246,0.88);
  border: 0.5px solid var(--border);
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 0;
  backdrop-filter: blur(6px);
  transition: all 0.15s;
}
.vbtn.on { color: var(--black); border-color: var(--black); }
```

### Visor Three.js — canvas full screen

```javascript
(function initViewer() {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('viewer-canvas'),
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xF8F8F6, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xF8F8F6);

  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.6, 6);

  /* GEOMETRÍAS — una por obra */
  const geos = [
    new THREE.TorusKnotGeometry(1.15, 0.4, 300, 32, 2, 3),
    new THREE.TorusGeometry(1.05, 0.48, 80, 160),
    new THREE.IcosahedronGeometry(1.25, 5),
  ];

  /* MATERIALES — bronce, mármol, alabastro */
  const mats = [
    new THREE.MeshStandardMaterial({ color: 0x9A7B5A, roughness: 0.18, metalness: 0.82 }),
    new THREE.MeshStandardMaterial({ color: 0xECE8E0, roughness: 0.55, metalness: 0.05 }),
    new THREE.MeshStandardMaterial({ color: 0xD8D0C4, roughness: 0.45, metalness: 0.02 }),
  ];

  const mesh = new THREE.Mesh(geos[0], mats[0]);
  mesh.position.set(0, 0.2, 0);
  scene.add(mesh);

  /* PEANA */
  const peana = new THREE.Mesh(
    new THREE.CylinderGeometry(1.6, 1.6, 0.05, 80),
    new THREE.MeshStandardMaterial({ color: 0xE5E1D8, roughness: 0.95, metalness: 0 })
  );
  peana.position.y = -2.0;
  scene.add(peana);

  /* ILUMINACIÓN */
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const key = new THREE.DirectionalLight(0xFFFAF0, 1.8);
  key.position.set(5, 8, 4);
  key.castShadow = true;
  key.shadow.mapSize.setScalar(2048);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xEEF2FF, 0.4);
  fill.position.set(-5, 0, 3);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xFFEEDD, 0.35);
  rim.position.set(0, -4, -5);
  scene.add(rim);

  /* INTERACCIÓN */
  let drag = false, ox = 0, oy = 0, rx = 0.12, ry = 0;

  const cv = renderer.domElement;

  function onDown(x, y) { drag = true; ox = x; oy = y; }
  function onUp() { drag = false; }
  function onMove(x, y) {
    if (!drag) return;
    ry += (x - ox) * 0.011;
    rx += (y - oy) * 0.007;
    rx = Math.max(-0.6, Math.min(0.6, rx));
    ox = x; oy = y;
  }

  cv.addEventListener('mousedown', e => onDown(e.clientX, e.clientY));
  window.addEventListener('mouseup', onUp);
  window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
  cv.addEventListener('touchstart', e => onDown(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  window.addEventListener('touchend', onUp);
  window.addEventListener('touchmove', e => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  cv.addEventListener('wheel', e => {
    camera.position.z = Math.max(3.5, Math.min(10, camera.position.z + e.deltaY * 0.005));
  }, { passive: true });

  /* RESIZE */
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  /* CAMBIO DE FONDO */
  const bgMap = { studio: 0xF8F8F6, white: 0xFFFFFF, dark: 0x111111 };
  window.setBg = function(mode) {
    const c = new THREE.Color(bgMap[mode]);
    scene.background = c;
    renderer.setClearColor(bgMap[mode], 1);

    /* Cuando el fondo es negro, el fade inferior se invierte */
    const fade = document.getElementById('hero-fade');
    if (mode === 'dark') {
      fade.style.background = 'linear-gradient(to top, rgba(17,17,17,0.98) 0%, rgba(17,17,17,0.85) 40%, transparent 100%)';
      document.getElementById('obra-info').style.color = '#ffffff';
      document.querySelector('.obra-nombre').style.color = '#ffffff';
      document.querySelector('.obra-precio').style.color = '#ffffff';
      document.querySelectorAll('.obra-meta-line span').forEach(s => s.style.color = '#888888');
    } else {
      const base = mode === 'white' ? '255,255,255' : '248,248,246';
      fade.style.background = `linear-gradient(to top, rgba(${base},0.98) 0%, rgba(${base},0.85) 40%, transparent 100%)`;
      document.getElementById('obra-info').style.color = '';
      document.querySelector('.obra-nombre').style.color = '';
      document.querySelector('.obra-precio').style.color = '';
      document.querySelectorAll('.obra-meta-line span').forEach(s => s.style.color = '');
    }

    document.querySelectorAll('.vbtn').forEach(b => b.classList.remove('on'));
    document.querySelector(`[data-bg="${mode}"]`).classList.add('on');
  };

  /* CAMBIO DE OBRA */
  window.cambiarGeometria = function(idx) {
    mesh.geometry = geos[idx];
    mesh.material = mats[idx];
    rx = 0.12; ry = 0;
  };

  /* HINT */
  const hint = document.getElementById('viewer-hint');
  setTimeout(() => { if (hint) { hint.style.opacity = '0'; hint.style.pointerEvents = 'none'; } }, 3000);

  /* LOOP */
  (function animate() {
    requestAnimationFrame(animate);
    if (!drag) ry += 0.0025;
    mesh.rotation.x = rx;
    mesh.rotation.y = ry;
    renderer.render(scene, camera);
  })();
})();
```

### Hint de interacción

```html


Arrastra para rotar · Scroll para zoom


```

```css
#viewer-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--f-body);
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gray);
  z-index: 5;
  pointer-events: none;
  transition: opacity 1.2s ease;
  white-space: nowrap;
}
```

### Datos de las tres obras y JavaScript del carrusel

```javascript
const obras = [
  {
    nombre: "Ofrenda",
    artista: "Helena Vázquez",
    material: "Bronce pulido a mano",
    año: "2025",
    edicion: "Edición única",
    precio: "€ 22.500",
    slug: "ofrenda",
  },
  {
    nombre: "Lirio en vuelo",
    artista: "Ana Ruiz",
    material: "Mármol de Carrara",
    año: "2024",
    edicion: "Edición única",
    precio: "€ 14.800",
    slug: "lirio-en-vuelo",
  },
  {
    nombre: "Torsión I",
    artista: "Camila Soler",
    material: "Alabastro blanco",
    año: "2025",
    edicion: "1 de 3",
    precio: "€ 11.600",
    slug: "torsion-i",
  },
];

let actual = 0;

function irAObra(idx) {
  actual = idx;
  const o = obras[idx];
  document.querySelector('.obra-index').textContent = '0' + (idx + 1) + ' — 03';
  document.getElementById('obra-nombre').textContent   = o.nombre;
  document.getElementById('obra-artista').textContent  = o.artista;
  document.getElementById('obra-material').textContent = o.material;
  document.getElementById('obra-año').textContent      = o.año;
  document.getElementById('obra-edicion').textContent  = o.edicion;
  document.getElementById('obra-precio').textContent   = o.precio;
  document.getElementById('obra-link').href            = '/obra/' + o.slug;
  document.querySelectorAll('.hero-thumb')
    .forEach((t, i) => t.classList.toggle('active', i === idx));
  if (typeof cambiarGeometria === 'function') cambiarGeometria(idx);
}

function next() { irAObra((actual + 1) % 3); }
function prev() { irAObra((actual + 2) % 3); }
```

### Flechas de navegación del hero

```html
←→
```

```css
.hero-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: rgba(248,248,246,0.85);
  border: 0.5px solid var(--border);
  color: var(--black);
  font-size: 15px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(6px);
  border-radius: 0;
  transition: background 0.2s;
}
.hero-arrow:hover { background: rgba(255,255,255,1); }
.hero-arrow.left  { left: 48px; }
.hero-arrow.right { right: 48px; }
```

---

## SECCIÓN COLECCIÓN

Fondo `#FAFAF8`. Padding 96px 48px.

Header de sección: a la izquierda el título **Descubre todas las colecciones** en Urbanist 700 32px. A la derecha, alineado al baseline, el link "Ver las 843 obras →" en link-arrow style.

Subtítulo debajo del título: "843 obras · Actualizado semanalmente" en Manrope 300 12px `#888888`.

Barra de filtros con margin-top 32px: input de búsqueda (240px) + tres selects Material / Precio / Técnica. Todos con border 0.5px `#E8E8E4`, fondo blanco, Manrope 300, 11px, border-radius 0, padding 10px 14px. Focus: border-color `#111111`.

Grid de 4 columnas, gap 1px, background `#E8E8E4`. Cada card fondo blanco. Imagen aspect-ratio 4:5 con hover scale 1.03 y overlay negro 50% con texto "Ver en 3D" centrado en Manrope 300 9px tracking 0.16em uppercase blanco. Bajo la imagen: material en Manrope 300 9px `#BBBBBB` uppercase tracking, título en Urbanist 700 17px, artista en Manrope 300 12px `#888888`, fila final con precio en Manrope 400 14px y estado "Disponible · 3D" en Manrope 300 9px `#BBBBBB`. Sin badges. Sin color. Todo el texto bajo la imagen, nunca encima.

8 obras con imágenes distintas de Unsplash (las URLs que ya están definidas en la versión anterior), precios desde €1.200.

---

## SECCIÓN ARTISTAS

Fondo `#FFFFFF`. Padding 96px 48px.

Header con título y tabs alineados: **Artistas en Ignia** en Urbanist 700 32px a la izquierda. Tabs "Establecidos" y "Emergentes" en Manrope 300 11px tracking 0.08em a la derecha. Tab activo: color `#111111`, border-bottom 1.5px `#111111`. Inactivo: `#888888`.

Grid 3 columnas, gap 32px. Foto circular en grayscale al 100%, color en hover (transition 0.35s). Nombre Urbanist 700 16px. Especialidad Manrope 300 12px `#888888`. Obras Manrope 300 10px `#BBBBBB` uppercase. Sin badges. Sin color. Fotos distintas para todos.

---

## SECCIÓN IGNIA APRENDE

Fondo `#F8F8F6`. Padding 96px 48px.

Header con título **Ignia Aprende** a la izquierda y "Ver más →" a la derecha.

Carrusel de 3 posts. Cada slide: grid 65%/35%, foto grande a la izquierda aspect-ratio 16:9, texto a la derecha con tag de audiencia Manrope 300 9px `#BBBBBB` uppercase, título Urbanist 700 26px, tiempo Manrope 300 11px `#888888`. Dots de navegación: líneas de 24px × 1px, activo `#111111`, inactivos `#E8E8E4`. Solo un slide visible, los demás `display:none`.

---

## SECCIÓN CTA FINAL

Fondo `#111111`. Padding 120px 48px. Text-align center.

Título **Tu obra de arte empieza aquí.** en Urbanist 700, font-size clamp(32px, 4vw, 52px), color `#FFFFFF`, letter-spacing -0.02em.

Subtítulo "Sin exclusividad. Sin contratos largos. Sin intermediarios." en Manrope 300 14px `#555555`. Margin-bottom 48px.

Dos botones en flex, gap 12px, justify-content center: "Crear mi perfil de artista" en btn-primary con fondo blanco color negro (invertir para fondo oscuro). "Acceder como coleccionista" con fondo transparent, color `#FFFFFF`, border 0.5px `#444444`.

---

## FOOTER

Fondo `#FFFFFF`. Border-top 0.5px `#E8E8E4`. Padding 56px 48px 32px. Grid 4 columnas.

Columna 1: logo SVG versión negra + frase "La primera galería digital dedicada exclusivamente a la escultura." en Manrope 300 12px `#888888` margin-top 16px.

Columnas 2, 3, 4: labels de sección en Manrope 300 9px `#BBBBBB` uppercase tracking 0.14em, margin-bottom 16px. Links en Manrope 300 12px `#888888`, gap 10px entre cada uno, display flex flex-direction column.

Línea final: border-top 0.5px `#E8E8E4`, margin-top 40px, padding-top 20px. Izquierda: "© 2026 Ignia Gallery" Manrope 300 11px `#888888`. Derecha: "v0.1 — Validación activa" Manrope 300 11px `#444444`.

---

## REGLAS FINALES — NO NEGOCIABLES

1. El canvas Three.js es full screen absolute. Nunca imagen estática. Si hay error técnico, comunicarlo sin sustituir.
2. El logo es el SVG con los paths en negro. Sin sombra. Sin fondo. Sin modificaciones.
3. Sin badges de ningún color en ninguna sección de la plataforma.
4. El fade inferior del hero cambia de color cuando el usuario activa el fondo negro del visor.
5. Las miniaturas están a la izquierda del bloque de texto en el hero-bottom, en columna vertical, con borde inferior en verde ácido `#CCFF00` en la activa.
6. `border-radius: 0` en absolutamente todo excepto avatares.
7. Sin gradientes de color. El único gradiente permitido es el fade blanco/gris/negro del hero.
8. Responsive obligatorio: en mobile el hero pasa a una sola columna con el visor arriba y la info abajo.
9. Probar en 375px, 768px y 1280px antes de entregar.
10. La plataforma es light mode. El único elemento permanentemente oscuro es la sección CTA final.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ignia-sculpture-studio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a867ebae-5f98-42c2-a553-42dac0fdc6cf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
