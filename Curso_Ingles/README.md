# Software Requirements · English V

Lección web interactiva y bilingüe sobre **requisitos funcionales y no funcionales**, creada por el **Grupo 5** para el curso de **Inglés Técnico** de la carrera de Ingeniería de Software con Inteligencia Artificial (V Semestre).

- **Docente:** HENRRY PASCUAL CABREJOS COSTALES
- **Grupo:** 5
- **Integrantes:**
  - ROJAS CORONADO LUZ DANIELA
  - CARLOS ROJAS LETICIA IVETT
  - VALERIO LOPEZ JARED PETER

## Contenido

1. Functional Requirements Definition
2. Functional Requirements Types
3. Non-Functional Requirements Definition
4. Non-Functional Requirements Types
5. Comparativa funcional vs. no funcional
6. Reto de 4 preguntas con XP e insignia

La página abre en **inglés** y el botón `EN / ES` del encabezado traduce todo el contenido al **español** sin recargar.

## Estructura

```text
Curso_Ingles/
├── index.html                  ← SPA; GitHub Pages la abre en /Curso_Ingles/
├── README.md
├── tailwind.config.js          ← solo para reconstruir el CSS
└── assets/
    ├── css/
    │   ├── styles.css          ← fuentes, clases clay, estados y animaciones
    │   ├── input.css           ← punto de entrada de Tailwind
    │   └── tailwind.css        ← Tailwind compilado (se sirve tal cual)
    ├── fonts/                  ← Fredoka y Nunito autoalojadas (woff2)
    ├── img/                    ← ilustraciones clay en WebP + favicon + portada OG
    └── js/
        ├── i18n.js             ← diccionario español + motor de traducción
        └── app.js              ← progreso, XP, quiz, reveal y navegación
```

No hay dependencias en tiempo de ejecución: la página funciona abriendo `index.html`
directamente o desde GitHub Pages.

## Cómo editar el contenido

- **Textos en inglés:** están escritos en el HTML y llevan `data-i18n="clave"`.
- **Textos en español:** viven en `assets/js/i18n.js`, dentro del objeto `ES`.
- **Atributos traducibles:** `data-i18n-alt` (imágenes) y `data-i18n-aria` (etiquetas ARIA).
- Si agregas una clave nueva, replica el mismo nombre en el HTML y en `ES`.

El motor guarda el texto original en inglés la primera vez y lo restaura al volver
a `EN`; no hay peticiones `fetch` ni parpadeo.

## Progreso

- `localStorage["ingles-lang"]` guarda el idioma elegido.
- `localStorage["ingles-progress-v1"]` guarda los temas marcados y las respuestas del quiz.
- XP máximo: **500** = 4 temas × 100 + 4 respuestas correctas × 25.

## Reconstruir Tailwind

Solo es necesario si agregas clases nuevas al HTML o a `app.js`:

```bash
cd Curso_Ingles
npx tailwindcss@3.4.17 -c tailwind.config.js -i assets/css/input.css -o assets/css/tailwind.css --minify
```

El repositorio ya incluye `assets/css/tailwind.css` compilado, por lo que no hace falta
Node.js para publicar la presentación.

## Publicación

Al estar en `Curso_Ingles/index.html`, GitHub Pages la sirve en:

```text
https://mizternox.github.io/IngSoftware_V/Curso_Ingles/
```

El índice principal del portafolio (`../index.html`) enlaza a esta página desde la
tarjeta del curso **Inglés Técnico**.

## Créditos

- Ilustraciones 3D generadas para este proyecto en estilo *claymorphism* pastel.
- Íconos: [Phosphor Icons](https://phosphoricons.com) (peso duotone), embebidos como sprite SVG.
- Tipografía: [Fredoka](https://fonts.google.com/specimen/Fredoka) y [Nunito](https://fonts.google.com/specimen/Nunito), autoalojadas.
