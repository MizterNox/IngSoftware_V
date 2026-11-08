/* ==========================================================================
   i18n · English (default, already in the HTML) ⇄ Spanish
   --------------------------------------------------------------------------
   Why a JS dictionary instead of separate JSON files?
   · Zero extra network requests: the page works offline and on file://.
   · The English text is already in the HTML, so search engines and the
     first paint never wait for a fetch.
   · Only Spanish lives here; the original English nodes are cached once and
     restored when the user switches back.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "ingles-lang";

  var ES = {
    "a11y.skip": "Saltar al contenido",

    "meta.title": "Requisitos de Software · Inglés V · Grupo 5",
    "meta.description":
      "Lección interactiva y bilingüe sobre requisitos funcionales y no funcionales: definiciones, tipos, ejemplos y un reto. Inglés V · Grupo 5 · Ingeniería de Software con IA.",

    "nav.label": "Secciones",
    "nav.topics": "Temas",
    "nav.compare": "Comparar",
    "nav.quiz": "Reto",
    "nav.team": "Equipo",
    "nav.start": "Empezar",
    "nav.menu": "Abrir menú",
    "nav.portfolio": "Portafolio académico",
    "lang.label": "Idioma",

    "hero.kicker": "Inglés para Ingeniería de Software · Semestre V",
    "hero.title1": "Requisitos de",
    "hero.title2": "Software",
    "hero.lead":
      "El puente entre lo que el cliente necesita y lo que los ingenieros construyen. Aprende las cuatro bases de los requisitos de software con ideas claras, ejemplos reales y un reto rápido.",
    "hero.chip.career": "Ingeniería de Software con IA",
    "hero.chip.semester": "Semestre V",
    "hero.chip.group": "Grupo 5",
    "hero.teamLabel": "Grupo 5 · Equipo",
    "hero.start": "Empezar la lección",
    "hero.explore": "Explorar temas",
    "hero.meta": "4 temas · 4 preguntas · 500 XP",
    "hero.imageAlt":
      "Ilustración 3D en arcilla de una laptop rodeada de tarjetas de requisitos y marcas de verificación",
    "hero.card.aria": "Tarjeta de misión del Grupo 5",
    "hero.card.title": "Requisitos de Software",
    "hero.card.status": "En progreso",
    "hero.card.instructorLabel": "Docente",
    "hero.card.pathLabel": "Ruta de aprendizaje",
    "hero.card.t1": "Funcionales · Definición",
    "hero.card.t2": "Funcionales · Tipos",
    "hero.card.t3": "No funcionales · Definición",
    "hero.card.t4": "No funcionales · Tipos",
    "hero.chip.functional": "Funcional",
    "hero.chip.nonfunctional": "No funcional",

    "basics.kicker": "La versión de 30 segundos",
    "basics.title": "Un requisito es una promesa que el sistema debe cumplir.",
    "basics.lead":
      "Dos preguntas dividen todo el tema: qué hace el sistema y qué tan bien lo hace.",
    "basics.b1.title": "Qué hace",
    "basics.b1.text": "Funcional",
    "basics.b2.title": "Qué tan bien",
    "basics.b2.text": "No funcional",
    "basics.b3.title": "Medible",
    "basics.b3.text": "O es un deseo",

    "topics.kicker": "La lección",
    "topics.title": "Cuatro ideas, un mapa claro",
    "topics.lead":
      "Definiciones breves, ideas clave y tipos. Marca cada tema como aprendido para llenar tu barra de XP.",

    "topic.mark": "Marcar como aprendido",
    "topic.done": "Aprendido",

    "t1.kicker": "Definición · Qué hace el sistema",
    "t1.title": "Definición de requisitos funcionales",
    "t1.definition":
      "Un requisito funcional describe un comportamiento o servicio que el sistema debe ofrecer: qué hace, para quién y en qué condiciones.",
    "t1.k1": "Describe comportamiento: entradas, procesamiento y salidas.",
    "t1.k2": "Se escribe desde el punto de vista del usuario o del negocio.",
    "t1.k3": "Debe ser específico y verificable: empieza con «El sistema deberá…».",
    "t1.k4": "Es la base del diseño, el código y los casos de prueba.",
    "t1.example":
      "«El sistema deberá enviar un correo de confirmación de reserva en un máximo de 30 segundos tras el pago.»",
    "t1.tip":
      "Si no puedes escribir una prueba para él, el requisito todavía es demasiado vago.",
    "t1.imageAlt":
      "Ilustración en arcilla de un portapapeles con requisitos marcados",
    "t1.imageTag": "Comportamiento, no calidad",

    "t2.kicker": "Tipos · La familia funcional",
    "t2.title": "Tipos de requisitos funcionales",
    "t2.introTitle": "La misma familia, distintos lentes",
    "t2.intro":
      "La mayoría de los requisitos funcionales encaja en uno de estos grupos. El grupo indica a quién le importa y cómo probarlo.",
    "t2.tip":
      "Son lentes, no cajas: un requisito puede ser de usuario y de sistema al mismo tiempo.",
    "t2.ty1.title": "Requisitos de usuario",
    "t2.ty1.text": "Lo que el usuario necesita lograr con el producto.",
    "t2.ty1.eg": "Ej. Iniciar sesión con una cuenta de Google.",
    "t2.ty2.title": "Requisitos de sistema",
    "t2.ty2.text": "Comportamiento detallado que el software debe ejecutar.",
    "t2.ty2.eg": "Ej. Validar el formato del correo antes de guardar.",
    "t2.ty3.title": "Datos y CRUD",
    "t2.ty3.text": "Crear, leer, actualizar y eliminar registros.",
    "t2.ty3.eg": "Ej. Editar el perfil de un cliente.",
    "t2.ty4.title": "Reglas de negocio",
    "t2.ty4.text": "Políticas que limitan lo que el sistema permite.",
    "t2.ty4.eg": "Ej. Solo los administradores pueden eliminar cuentas.",
    "t2.ty5.title": "Reportes",
    "t2.ty5.text": "Resúmenes, tableros y exportaciones.",
    "t2.ty5.eg": "Ej. Reporte mensual de ventas en PDF.",
    "t2.ty6.title": "Integración",
    "t2.ty6.text": "Conexiones con sistemas o API externas.",
    "t2.ty6.eg": "Ej. Sincronizar pedidos con la pasarela de pago.",
    "t2.imageAlt":
      "Ilustración en arcilla de un árbol que se ramifica en tarjetas de usuario, datos, reportes e integración",
    "t2.imageTag": "Una familia, seis lentes",

    "t3.kicker": "Definición · Qué tan bien funciona",
    "t3.title": "Definición de requisitos no funcionales",
    "t3.definition":
      "Un requisito no funcional describe qué tan bien debe funcionar el sistema: sus atributos de calidad y restricciones, no sus funciones.",
    "t3.k1": "Describe calidad, no comportamiento.",
    "t3.k2": "Normalmente aplica a todo el sistema.",
    "t3.k3": "Debe ser medible: números, no adjetivos.",
    "t3.k4": "Define la confianza del usuario, el costo y la arquitectura.",
    "t3.example":
      "«El 95 % de las solicitudes debe responder en menos de 2 segundos con 1 000 usuarios concurrentes.»",
    "t3.tip":
      "«Rápido» no es un requisito. «Menos de 2 s con 1 000 usuarios» sí lo es.",
    "t3.imageAlt":
      "Ilustración en arcilla de un medidor, un escudo, controles y un cronómetro",
    "t3.imageTag": "Calidad que se puede medir",

    "t4.kicker": "Tipos · La familia de calidad",
    "t4.title": "Tipos de requisitos no funcionales",
    "t4.introTitle": "Seis cualidades que lo hacen bueno",
    "t4.intro":
      "Un sistema puede hacerlo todo bien y aun así ser lento, inseguro o imposible de mantener. Estos atributos deciden si realmente es usable.",
    "t4.tip":
      "Cada requisito no funcional necesita una métrica, una meta y una forma de verificarlo. Si no, es solo un deseo.",
    "t4.ty1.title": "Rendimiento",
    "t4.ty1.text": "Velocidad y capacidad bajo carga real.",
    "t4.ty1.eg": "Ej. Respuesta de página en menos de 2 s.",
    "t4.ty2.title": "Escalabilidad",
    "t4.ty2.text": "Crece con usuarios, datos y tráfico.",
    "t4.ty2.eg": "Ej. Soportar 10 000 usuarios concurrentes.",
    "t4.ty3.title": "Confiabilidad y disponibilidad",
    "t4.ty3.text": "Tiempo activo y recuperación ante fallas.",
    "t4.ty3.eg": "Ej. 99,9 % de disponibilidad y respaldos diarios.",
    "t4.ty4.title": "Seguridad",
    "t4.ty4.text": "Protege datos, accesos y privacidad.",
    "t4.ty4.eg": "Ej. Cifrado en reposo y MFA.",
    "t4.ty5.title": "Usabilidad y accesibilidad",
    "t4.ty5.text": "Fácil para todos, en cualquier dispositivo.",
    "t4.ty5.eg": "Ej. Cumplir WCAG 2.1 AA.",
    "t4.ty6.title": "Mantenibilidad",
    "t4.ty6.text": "Fácil de cambiar, probar y corregir.",
    "t4.ty6.eg": "Ej. 80 % de cobertura de pruebas automatizadas.",
    "t4.imageAlt":
      "Ilustración en arcilla de íconos de velocidad, seguridad, tiempo, compatibilidad y accesibilidad",
    "t4.imageTag": "Atributos de calidad",

    "common.example": "Ejemplo",
    "common.tip": "Consejo",

    "compare.kicker": "Lado a lado",
    "compare.title": "Funcionales vs. no funcionales",
    "compare.lead":
      "El mismo sistema, dos preguntas distintas. Si puedes cambiar «qué tan bien» por un número, probablemente estás ante un requisito no funcional.",
    "compare.c1": "Aspecto",
    "compare.c2": "Funcional",
    "compare.c3": "No funcional",
    "compare.r1.label": "Pregunta que responde",
    "compare.r1.fr": "¿Qué hace el sistema?",
    "compare.r1.nfr": "¿Qué tan bien lo hace?",
    "compare.r2.label": "Enfoque",
    "compare.r2.fr": "Comportamiento y funciones",
    "compare.r2.nfr": "Calidad y restricciones",
    "compare.r3.label": "Alcance",
    "compare.r3.fr": "Una función específica",
    "compare.r3.nfr": "Todo el sistema",
    "compare.r4.label": "Ejemplo",
    "compare.r4.fr": "«La app envía un correo de confirmación.»",
    "compare.r4.nfr": "«El correo llega en menos de 5 segundos.»",
    "compare.r5.label": "Cómo se verifica",
    "compare.r5.fr": "Pruebas funcionales y criterios de aceptación",
    "compare.r5.nfr": "Benchmarks, pruebas de carga y auditorías",
    "compare.note": "Desliza la tabla horizontalmente en pantallas pequeñas.",

    "quiz.kicker": "El reto",
    "quiz.title": "Cuatro preguntas. Una insignia.",
    "quiz.lead":
      "Elige una respuesta y recibe retroalimentación al instante. Cada respuesta correcta suma 25 XP.",
    "quiz.question": "Pregunta",
    "quiz.correct": "¡Correcto!",
    "quiz.wrong": "Casi.",
    "quiz.score": "Puntaje",
    "quiz.restart": "Intentar de nuevo",
    "quiz.review": "Repasar temas",
    "quiz.badgeLabel": "Insignia desbloqueada",
    "quiz.badge": "Explorador de Requisitos",
    "quiz.badgeText":
      "Terminaste el reto. Repasa los temas que fallaste e inténtalo de nuevo para lograr el puntaje perfecto.",

    "q1.title": "¿Cuál oración es un requisito funcional?",
    "q1.a":
      "La app deberá permitir a los usuarios restablecer su contraseña por correo.",
    "q1.b": "La app deberá cargar en menos de 2 segundos.",
    "q1.c": "La app deberá estar disponible el 99,9 % del tiempo.",
    "q1.d": "La app deberá soportar 10 000 usuarios.",
    "q1.explain":
      "Describe un comportamiento que el sistema debe realizar. Las otras tres son metas de calidad.",

    "q2.title": "¿Qué tipo describe qué tan bien se comporta el sistema?",
    "q2.a": "Requisito funcional",
    "q2.b": "Requisito no funcional",
    "q2.c": "Regla de negocio",
    "q2.d": "Historia de usuario",
    "q2.explain":
      "Los requisitos no funcionales cubren atributos de calidad como velocidad, seguridad y disponibilidad.",

    "q3.title": "«El checkout debe responder en menos de 1,5 segundos» es…",
    "q3.a": "Un requisito funcional de integración",
    "q3.b": "Un requisito de reportes",
    "q3.c": "Un requisito no funcional de rendimiento",
    "q3.d": "Una regla de negocio",
    "q3.explain":
      "El tiempo de respuesta es rendimiento, un requisito no funcional clásico.",

    "q4.title": "¿Cuál está escrito como un requisito no funcional medible?",
    "q4.a": "La interfaz debe verse hermosa.",
    "q4.b": "El sistema debe ser fácil de usar.",
    "q4.c": "El 95 % de las páginas debe cargar en menos de 2 segundos.",
    "q4.d": "Los usuarios deben poder subir una foto.",
    "q4.explain":
      "Tiene una métrica (95 %), una meta (menos de 2 s) y se puede verificar.",

    "about.kicker": "Sobre esta lección",
    "about.title": "Hecho por el Grupo 5",
    "about.lead":
      "Un recurso de aprendizaje bilingüe para el curso de Inglés Técnico, Ingeniería de Software con Inteligencia Artificial, semestre V.",
    "about.courseData": "Datos del curso",
    "about.course": "Curso",
    "about.courseValue": "Inglés Técnico",
    "about.instructor": "Docente",
    "about.careerLabel": "Carrera",
    "about.careerValue":
      "Ingeniería de Software con Inteligencia Artificial",
    "about.semester": "Semestre",
    "about.semesterValue": "V",
    "about.group": "Grupo",
    "about.membersTitle": "Integrantes",
    "about.back": "Portafolio académico",
    "about.bilingual":
      "La lección se abre en inglés por defecto. Usa el selector EN / ES de la parte superior para leer todo en español.",

    "footer.note": "Inglés Técnico · Grupo 5 · Semestre V · 2026",
    "footer.top": "Volver arriba"
  };

  var originalTitle = document.title;
  var metaDescription = document.querySelector('meta[name="description"]');
  var originalDescription = metaDescription ? metaDescription.getAttribute("content") : "";
  var textCache = new WeakMap();
  var attrCache = new WeakMap();
  var current = "en";
  var announce = document.getElementById("langAnnounce");

  function safeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* almacenamiento no disponible: la sesión sigue funcionando */
    }
  }

  function translateText(lang) {
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      if (!textCache.has(element)) {
        textCache.set(element, element.textContent);
      }
      var key = element.getAttribute("data-i18n");
      var value = lang === "es" ? ES[key] : textCache.get(element);
      if (typeof value === "string") {
        element.textContent = value;
      }
    });
  }

  function translateAttributes(lang, dataAttribute, targetAttribute) {
    document.querySelectorAll("[" + dataAttribute + "]").forEach(function (element) {
      var cache = attrCache.get(element);
      if (!cache) {
        cache = {};
        attrCache.set(element, cache);
      }
      if (!(targetAttribute in cache)) {
        cache[targetAttribute] = element.getAttribute(targetAttribute) || "";
      }
      var key = element.getAttribute(dataAttribute);
      var value = lang === "es" ? ES[key] : cache[targetAttribute];
      if (typeof value === "string" && value !== "") {
        element.setAttribute(targetAttribute, value);
      }
    });
  }

  function updateMeta(lang) {
    document.title = lang === "es" ? ES["meta.title"] : originalTitle;
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        lang === "es" ? ES["meta.description"] : originalDescription
      );
    }
    document.documentElement.lang = lang;
  }

  function updateButtons(lang) {
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  function updateUrl(lang) {
    try {
      var url = new URL(window.location.href);
      if (lang === "es") {
        url.searchParams.set("lang", "es");
      } else {
        url.searchParams.delete("lang");
      }
      window.history.replaceState({}, "", url.toString());
    } catch (error) {
      /* navegadores muy antiguos: no pasa nada */
    }
  }

  function apply(lang) {
    current = lang;
    translateText(lang);
    translateAttributes(lang, "data-i18n-alt", "alt");
    translateAttributes(lang, "data-i18n-aria", "aria-label");
    updateMeta(lang);
    updateButtons(lang);

    if (announce) {
      announce.textContent =
        lang === "es"
          ? "Idioma cambiado a español. Todo el contenido está ahora en español."
          : "Language changed to English. All content is now in English.";
    }

    document.dispatchEvent(
      new CustomEvent("languagechange", { detail: { lang: lang } })
    );
  }

  function setLang(lang, persist) {
    var next = lang === "es" ? "es" : "en";
    apply(next);
    if (persist !== false) {
      safeSet(STORAGE_KEY, next);
      updateUrl(next);
    }
  }

  document.querySelectorAll("[data-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      setLang(button.getAttribute("data-lang"), true);
    });
  });

  var params = new URLSearchParams(window.location.search);
  var fromUrl = params.get("lang");
  var stored = safeGet(STORAGE_KEY);
  var initial = fromUrl === "es" || fromUrl === "en" ? fromUrl : stored === "es" ? "es" : "en";

  if (initial === "es") {
    apply("es");
  } else {
    updateButtons("en");
    document.documentElement.lang = "en";
  }

  window.I18N = {
    get lang() {
      return current;
    },
    set: function (lang) {
      setLang(lang, true);
    },
    dictionary: ES
  };
})();
