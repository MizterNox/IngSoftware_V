/* ==========================================================================
   Interactividad de la lección
   · Progreso y XP persistentes (localStorage)
   · Quiz con retroalimentación inmediata
   · Barra de lectura, revelado al hacer scroll y navegación activa
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "ingles-progress-v1";
  var TOPICS = [
    "functional-definition",
    "functional-types",
    "nonfunctional-definition",
    "nonfunctional-types"
  ];

  var state = {
    done: [],
    answers: {}
  };

  load();

  function load() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.done)) {
        state.done = parsed.done.filter(function (topic) {
          return TOPICS.indexOf(topic) !== -1;
        });
      }
      if (parsed && parsed.answers && typeof parsed.answers === "object") {
        state.answers = parsed.answers;
      }
    } catch (error) {
      /* datos corruptos o almacenamiento bloqueado: empezamos de cero */
    }
  }

  function save() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      /* modo privado: el progreso vive solo en esta sesión */
    }
  }

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function correctCount() {
    var total = 0;
    Object.keys(state.answers).forEach(function (qid) {
      var card = $('[data-q="' + qid + '"]');
      if (!card) return;
      var options = $$(".quiz-opt", card);
      var index = Number(state.answers[qid]);
      if (options[index] && options[index].getAttribute("data-correct") === "true") {
        total += 1;
      }
    });
    return total;
  }

  function renderXp() {
    var done = state.done.length;
    var correct = correctCount();
    var xp = done * 100 + correct * 25;
    var max = 500;
    var percentage = Math.max(0, Math.min(100, (xp / max) * 100));

    var xpValue = $("#xpValue");
    if (xpValue) xpValue.textContent = String(xp);

    var xpBar = $("#xpBar");
    if (xpBar) xpBar.style.width = percentage + "%";

    var score = $("#quizScore");
    if (score) score.textContent = String(correct);

    var quizXp = $("#quizXp");
    if (quizXp) quizXp.textContent = String(correct * 25);

    var resultScore = $("#resultScore");
    if (resultScore) resultScore.textContent = String(correct);

    TOPICS.forEach(function (topic) {
      var isDone = state.done.indexOf(topic) !== -1;
      var card = $('[data-topic-card="' + topic + '"]');
      if (card) card.classList.toggle("is-done", isDone);
      var button = $('.done-btn[data-topic="' + topic + '"]');
      if (button) button.setAttribute("aria-pressed", isDone ? "true" : "false");
    });
  }

  var toast = $("#toast");
  var toastText = $("#toastText");
  var toastTimer = null;

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add("is-show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-show");
    }, 1900);
  }

  /* ------------------------------------------------------------------------
     Marcar temas como aprendidos
     ------------------------------------------------------------------------ */
  $$(".done-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      var topic = button.getAttribute("data-topic");
      var index = state.done.indexOf(topic);
      var nowDone = index === -1;

      if (nowDone) {
        state.done.push(topic);
      } else {
        state.done.splice(index, 1);
      }

      save();
      renderXp();
      showToast(nowDone ? "+100 XP" : "−100 XP");
    });
  });

  /* ------------------------------------------------------------------------
     Quiz
     ------------------------------------------------------------------------ */
  function markAnswer(card, choice) {
    var options = $$(".quiz-opt", card);
    var selected = options[choice];
    if (!selected) return null;

    options.forEach(function (option, index) {
      option.disabled = true;
      if (option.getAttribute("data-correct") === "true") {
        option.setAttribute("data-state", "correct");
      } else if (index === choice) {
        option.setAttribute("data-state", "wrong");
      }
    });

    var isCorrect = selected.getAttribute("data-correct") === "true";
    var feedback = $(".quiz-feedback", card);
    if (feedback) {
      feedback.classList.remove("hidden");
      feedback.setAttribute("data-ok", isCorrect ? "true" : "false");
    }

    var explanation = $(".quiz-explain", card);
    if (explanation) explanation.classList.remove("hidden");

    card.setAttribute("data-answered", "true");
    return isCorrect;
  }

  function allAnswered() {
    return $$("[data-q]").every(function (card) {
      return card.getAttribute("data-answered") === "true";
    });
  }

  function showResult() {
    var result = $("#quizResult");
    if (result) result.classList.remove("hidden");
  }

  $$("[data-q]").forEach(function (card) {
    var qid = card.getAttribute("data-q");
    var options = $$(".quiz-opt", card);

    options.forEach(function (option, index) {
      option.addEventListener("click", function () {
        if (card.getAttribute("data-answered") === "true") return;

        state.answers[qid] = index;
        var isCorrect = markAnswer(card, index);
        save();
        renderXp();

        if (isCorrect) showToast("+25 XP");
        if (allAnswered()) window.setTimeout(showResult, 350);
      });
    });

    if (Object.prototype.hasOwnProperty.call(state.answers, qid)) {
      markAnswer(card, Number(state.answers[qid]));
    }
  });

  if (allAnswered()) showResult();

  var reset = $("#quizReset");
  if (reset) {
    reset.addEventListener("click", function () {
      state.answers = {};
      save();

      $$("[data-q]").forEach(function (card) {
        card.removeAttribute("data-answered");
        $$(".quiz-opt", card).forEach(function (option) {
          option.disabled = false;
          option.removeAttribute("data-state");
        });
        var feedback = $(".quiz-feedback", card);
        if (feedback) {
          feedback.classList.add("hidden");
          feedback.setAttribute("data-ok", "true");
        }
        var explanation = $(".quiz-explain", card);
        if (explanation) explanation.classList.add("hidden");
      });

      var result = $("#quizResult");
      if (result) result.classList.add("hidden");

      renderXp();
      showToast("+0 XP");
    });
  }

  var reveals = $$(".reveal");

  /* ------------------------------------------------------------------------
     Barra de progreso de lectura + red de seguridad del revelado
     ------------------------------------------------------------------------
     Si el usuario salta con un ancla, usa End o restaura el scroll, el
     IntersectionObserver puede no ver un bloque. Este chequeo por geometría
     garantiza que nada quede invisible. */
  var progress = $("#scrollProgress");
  var ticking = false;

  function revealInView() {
    var limit = window.innerHeight * 0.95;
    reveals.forEach(function (element) {
      if (element.classList.contains("is-visible")) return;
      var rect = element.getBoundingClientRect();
      /* Todo lo que ya quedó por encima del borde inferior también se
         revela: así un salto rápido nunca deja bloques invisibles. */
      if (rect.top < limit) {
        element.classList.add("is-visible");
      }
    });
  }

  function updateProgress() {
    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? window.scrollY / max : 0;
      progress.style.width = Math.max(0, Math.min(100, ratio * 100)) + "%";
    }
    revealInView();
    ticking = false;
  }

  var lastReveal = 0;

  window.addEventListener(
    "scroll",
    function () {
      /* El revelado se ejecuta en el propio evento: no depende de timers ni
         de rAF, que los navegadores pueden retrasar en segundo plano. */
      var now = Date.now();
      if (now - lastReveal > 90) {
        lastReveal = now;
        revealInView();
      }
      if (!ticking) {
        ticking = true;
        window.setTimeout(updateProgress, 16);
      }
    },
    { passive: true }
  );

  updateProgress();
  window.setTimeout(revealInView, 120);
  window.addEventListener("resize", revealInView, { passive: true });
  /* Red de seguridad final: pase lo que pase con los eventos de scroll,
     a los 2,2 s todo el contenido queda visible. Nunca dejamos una sección
     atrapada en opacity 0. */
  window.setTimeout(function () {
    reveals.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }, 2200);

  /* ------------------------------------------------------------------------
     Revelado al hacer scroll
     ------------------------------------------------------------------------ */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    reveals.forEach(function (element) {
      element.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    reveals.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  /* ------------------------------------------------------------------------
     Temas como modales
     ------------------------------------------------------------------------ */
  var MODALS = [
    "topic-functional-definition",
    "topic-functional-types",
    "topic-nonfunctional-definition",
    "topic-nonfunctional-types"
  ];
  var topicModals = MODALS.map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);
  var triggerMap = new WeakMap();
  var finalized = new WeakSet();

  function finalizeClose(dialog) {
    if (!dialog || dialog.open || finalized.has(dialog)) return;
    finalized.add(dialog);

    var anotherOpen = $$(".topic-modal[open]").length > 0;
    if (!anotherOpen) {
      document.documentElement.classList.remove("modal-open");
      if (window.location.hash === "#" + dialog.id) {
        try {
          history.replaceState(null, "", window.location.pathname + window.location.search);
        } catch (error) {
          /* sin History API */
        }
      }
      var trigger = triggerMap.get(dialog);
      if (trigger && typeof trigger.focus === "function") trigger.focus();
    }
    triggerMap.delete(dialog);
  }

  function openModal(dialog, trigger) {
    if (!dialog) return;
    if (trigger) triggerMap.set(dialog, trigger);
    if (dialog.open) return;

    /* Solo un tema abierto a la vez: al pasar de tema cerramos el anterior. */
    topicModals.forEach(function (other) {
      if (other !== dialog && other.open) other.close();
    });

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    finalized.delete(dialog);
    document.documentElement.classList.add("modal-open");
    $$(".reveal", dialog).forEach(function (element) {
      element.classList.add("is-visible");
    });

    try {
      history.replaceState(null, "", "#" + dialog.id);
    } catch (error) {
      /* file:// o navegador sin History API */
    }
  }

  function closeModal(dialog) {
    if (!dialog) return;
    if (dialog.open) {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
        dialog.dispatchEvent(new Event("close"));
      }
    }
    /* No dependemos solo del evento close: algunos navegadores lo difieren
       y dejarían el hash o el bloqueo de scroll activos. */
    finalizeClose(dialog);
  }

  function modalFromHash() {
    var raw = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!raw) return null;
    if (MODALS.indexOf(raw) !== -1) return document.getElementById(raw);
    /* Enlaces antiguos: #functional-definition → #topic-functional-definition */
    if (MODALS.indexOf("topic-" + raw) !== -1) return document.getElementById("topic-" + raw);
    return null;
  }

  $$("[data-modal-open]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openModal(document.getElementById(trigger.getAttribute("data-modal-open")), trigger);
    });
  });

  topicModals.forEach(function (dialog, index) {
    $$("[data-modal-close]", dialog).forEach(function (button) {
      button.addEventListener("click", function () {
        closeModal(dialog);
      });
    });

    var prev = $("[data-modal-prev]", dialog);
    var next = $("[data-modal-next]", dialog);
    if (prev) {
      prev.addEventListener("click", function () {
        openModal(topicModals[(index - 1 + topicModals.length) % topicModals.length]);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        openModal(topicModals[(index + 1) % topicModals.length]);
      });
    }

    /* Clic en el fondo (fuera del panel) cierra. */
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeModal(dialog);
    });

    /* Escape: cerramos nosotros para limpiar hash y scroll sin depender
       de que el navegador emita close de inmediato. */
    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeModal(dialog);
    });

    dialog.addEventListener("close", function () {
      finalizeClose(dialog);
    });
  });

  var initialModal = modalFromHash();
  if (initialModal) window.setTimeout(function () {
    openModal(initialModal);
  }, 120);

  /* ------------------------------------------------------------------------
     Controles de presentación (puntos + anterior/siguiente)
     ------------------------------------------------------------------------ */
  var deckIds = ["top", "basics", "topics", "compare", "challenge", "about"];
  var deckSections = deckIds.map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);
  var deckDots = $$("[data-deck-target]");
  var deckCurrent = $("#deckCurrent");
  var deckIndex = 0;

  function setDeckIndex(index) {
    if (!deckSections.length) return;
    deckIndex = (index + deckSections.length) % deckSections.length;
    if (deckCurrent) {
      deckCurrent.textContent = String(deckIndex + 1).padStart(2, "0");
    }
    deckDots.forEach(function (dot) {
      var target = dot.getAttribute("data-deck-target");
      var active = target === deckSections[deckIndex].id;
      dot.classList.toggle("is-active", active);
      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  function goToSection(index) {
    var target = deckSections[(index + deckSections.length) % deckSections.length];
    if (!target) return;
    setDeckIndex(index);
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });
  }

  var deckPrev = $("[data-deck-prev]");
  var deckNext = $("[data-deck-next]");
  if (deckPrev) deckPrev.addEventListener("click", function () {
    goToSection(deckIndex - 1);
  });
  if (deckNext) deckNext.addEventListener("click", function () {
    goToSection(deckIndex + 1);
  });

  deckDots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var index = deckSections.map(function (section) {
        return section.id;
      }).indexOf(dot.getAttribute("data-deck-target"));
      if (index !== -1) goToSection(index);
    });
  });

  /* El observer puede perder saltos instantáneos; la geometría es la fuente
     de verdad y mantiene el contador sincronizado con la sección visible. */
  var deckTicking = false;

  function updateDeckFromScroll() {
    deckTicking = false;
    if (!deckSections.length) return;
    document.documentElement.classList.toggle("is-scrolled", window.scrollY > 80);
    var line = window.innerHeight * 0.38;
    var index = 0;
    deckSections.forEach(function (section, i) {
      if (section.getBoundingClientRect().top <= line) index = i;
    });
    setDeckIndex(index);
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!deckTicking) {
        deckTicking = true;
        window.setTimeout(updateDeckFromScroll, 60);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", updateDeckFromScroll, { passive: true });

  /* Refuerzo: cualquier cambio de intersección recalcula por geometría. */
  if ("IntersectionObserver" in window) {
    var deckObserver = new IntersectionObserver(
      function () {
        updateDeckFromScroll();
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.2] }
    );
    deckSections.forEach(function (section) {
      deckObserver.observe(section);
    });
  }

  updateDeckFromScroll();

  /* ------------------------------------------------------------------------
     Arranque
     ------------------------------------------------------------------------ */
  renderXp();
})();
