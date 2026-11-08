# Software Requirements · English V

Lección web interactiva y bilingüe sobre **requisitos funcionales y no funcionales**, creada por el **Grupo 5** para el curso de **Inglés Técnico** de la carrera de Ingeniería de Software con Inteligencia Artificial (V Semestre).

- **Docente:** HENRRY PASCUAL CABREJOS COSTALES
- **Grupo:** 5
- **Integrantes:**
  - ROJAS CORONADO LUZ DANIELA
  - MORA DAMIAN CHRISTIAN ALFREDO
  - VALERIO LOPEZ JARED PETER

## Contenido

Los cuatro temas se presentan como tarjetas que abren un **modal tipo diapositiva**:

1. Functional Requirements Definition
2. Functional Requirements Types
3. Non-Functional Requirements Definition
4. Non-Functional Requirements Types

Además incluye:

- Comparativa funcional vs. no funcional.
- Reto de 4 preguntas con retroalimentación inmediata.
- Ficha del equipo e información del curso.

La página abre en **inglés** y el botón `EN / ES` de la barra superior traduce todo el
contenido al **español** sin recargar.

## Estructura

```text
assets/ingles/
├── index.html                  ← presentación; GitHub Pages la abre en /assets/ingles/
├── README.md
├── tailwind.config.js          ← solo para reconstruir el CSS
├── .htmlvalidate.json          ← configuración de validación HTML
├── css/
│   ├── styles.css              ← fuentes, clases clay, modales y animaciones
│   ├── input.css               ← punto de entrada de Tailwind
│   └── tailwind.css            ← Tailwind compilado (se sirve tal cual)
├── fonts/                      ← Fredoka y Nunito autoalojadas (woff2)
├── img/                        ← ilustraciones clay en WebP + favicon + portada OG
└── js/
    ├── i18n.js                 ← diccionario español + motor de traducción
    └── app.js                  ← modales, progreso, XP, quiz, reveal y controles
```

No hay dependencias en tiempo de ejecución: la página funciona abriendo `index.html`
directamente o desde GitHub Pages.

## Navegación de la presentación

- No hay menú de navegación: la barra superior solo muestra la marca, el XP y el idioma.
- Los **cuatro temas** son tarjetas; al pulsarlas se abre un `<dialog>` con el contenido
  completo, botón **Marcar como aprendido** y controles **Tema anterior / siguiente**.
- La barra inferior permite saltar entre las seis secciones (portada, versión de 30
  segundos, temas, comparativa, reto y equipo).
- Cada modal actualiza el hash de la URL (`#topic-functional-definition`, etc.), por lo
  que se puede abrir directamente desde un enlace o un QR.
- `Esc`, el botón de cerrar o un clic fuera del panel cierran el modal, bloquean el
  scroll del fondo y devuelven el foco a la tarjeta.

## Cómo editar el contenido

- **Textos en inglés:** están escritos en el HTML y llevan `data-i18n="clave"`.
- **Textos en español:** viven en `js/i18n.js`, dentro del objeto `ES`.
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
cd assets/ingles
npx tailwindcss@3.4.17 -c tailwind.config.js -i css/input.css -o css/tailwind.css --minify
```

El repositorio ya incluye `css/tailwind.css` compilado, por lo que no hace falta
Node.js para publicar la presentación.

## Publicación

Al estar en `assets/ingles/index.html`, GitHub Pages la sirve en:

```text
https://mizternox.github.io/IngSoftware_V/assets/ingles/
```

El índice principal del portafolio (`../../index.html`) enlaza a esta página desde la
tarjeta del curso **Inglés Técnico**.

## Créditos

- Ilustraciones 3D generadas para este proyecto en estilo *claymorphism* pastel.
- Íconos: [Phosphor Icons](https://phosphoricons.com) (peso duotone), embebidos como sprite SVG.
- Tipografía: [Fredoka](https://fonts.google.com/specimen/Fredoka) y [Nunito](https://fonts.google.com/specimen/Nunito), autoalojadas.
