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
      var row = $('[data-hero-row="' + topic + '"]');
      if (row) row.classList.toggle("is-done", isDone);
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
     Navegación activa
     ------------------------------------------------------------------------ */
  var navLinks = $$('.nav-link[href^="#"]');
  var sections = ["topics", "compare", "challenge", "about"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          });

        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0, 0.2, 0.6] }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ------------------------------------------------------------------------
     Menú móvil
     ------------------------------------------------------------------------ */
  var menuBtn = $("#menuBtn");
  var mobileNav = $("#mobileNav");

  function closeMenu() {
    if (!menuBtn || !mobileNav) return;
    mobileNav.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", isOpen ? "false" : "true");
      mobileNav.classList.toggle("hidden", isOpen);
    });

    $$("a", mobileNav).forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!mobileNav.contains(event.target) && !menuBtn.contains(event.target)) {
        closeMenu();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Arranque
     ------------------------------------------------------------------------ */
  renderXp();
})();
