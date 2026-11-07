(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var progressBar = document.getElementById('progressBar');
  var goCoverBtn = document.getElementById('goCoverBtn');
  var currentIndex = 0;

  /* ========================================================================
     1. NAVEGACIÓN ENTRE DIAPOSITIVAS (TECLADO, CLICS EN CHIPS Y TÁCTIL)
     ======================================================================== */
  function showSlide(targetIndex) {
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    slides.forEach(function (slide, idx) {
      var active = idx === targetIndex;
      slide.classList.toggle('is-active', active);
      if (active) {
        slide.removeAttribute('hidden');
      } else {
        slide.setAttribute('hidden', '');
      }
    });

    currentIndex = targetIndex;

    var theme = slides[currentIndex].getAttribute('data-theme') || 'cover';
    document.body.setAttribute('data-active-theme', theme);

    if (progressBar) {
      var pct = ((currentIndex + 1) / slides.length) * 100;
      progressBar.style.width = pct.toFixed(2) + '%';
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  document.querySelectorAll('[data-goto]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var idx = parseInt(chip.getAttribute('data-goto'), 10);
      if (!isNaN(idx)) showSlide(idx);
    });
  });

  if (goCoverBtn) {
    goCoverBtn.addEventListener('click', function () {
      showSlide(0);
    });
  }

  document.addEventListener('keydown', function (event) {
    var tag = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        event.preventDefault();
        showSlide(currentIndex + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        showSlide(currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        showSlide(0);
        break;
      case 'End':
        event.preventDefault();
        showSlide(slides.length - 1);
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      default:
        if (/^[1-7]$/.test(event.key)) {
          showSlide(parseInt(event.key, 10) - 1);
        }
        break;
    }
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(function () {});
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
  }

  /* Soporte Swipe táctil para tablets y móviles */
  var touchStartX = 0;
  var touchStartY = 0;

  document.addEventListener('touchstart', function (e) {
    if (!e.changedTouches || !e.changedTouches.length) return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    if (!e.changedTouches || !e.changedTouches.length) return;
    var dx = e.changedTouches[0].screenX - touchStartX;
    var dy = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) {
        showSlide(currentIndex + 1);
      } else {
        showSlide(currentIndex - 1);
      }
    }
  }, { passive: true });

  /* ========================================================================
     2. EFECTO GRADIENTE REACTIVO AL CURSOR EN TARJETAS (.grad-card)
     ======================================================================== */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.grad-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  }

  /* ========================================================================
     3. DEMO INTERACTIVA TEMA 01: GRAPHQL
     ======================================================================== */
  var gqlDataSample = {
    nombre: '"Luz Daniela"',
    correo: '"daniela@redsocial.pe"',
    biografia: '"Estudiante de Ing. de Software con IA"',
    seguidores: '1280',
    publicaciones: '42'
  };

  var gqlCheckboxes = Array.prototype.slice.call(document.querySelectorAll('[data-gql-field]'));
  var gqlQueryOut = document.getElementById('gqlQueryOutput');
  var gqlResOut = document.getElementById('gqlResponseOutput');
  var gqlBadge = document.getElementById('gqlSavingBadge');

  function renderGraphQLDemo() {
    if (!gqlQueryOut || !gqlResOut) return;
    var activeFields = gqlCheckboxes
      .filter(function (cb) { return cb.checked; })
      .map(function (cb) { return cb.value; });

    gqlCheckboxes.forEach(function (cb) {
      var label = cb.closest('.field-pill');
      if (label) label.classList.toggle('is-checked', cb.checked);
    });

    var queryText =
      'query {\n  usuario(id: "05") {\n    ' +
      activeFields.join('\n    ') +
      '\n  }\n}';

    var resLines = activeFields.map(function (field) {
      return '    "' + field + '": ' + gqlDataSample[field];
    });
    var responseText = '{\n  "usuario": {\n' + resLines.join(',\n') + '\n  }\n}';

    gqlQueryOut.textContent = queryText;
    gqlResOut.textContent = responseText;

    if (gqlBadge) {
      if (activeFields.length <= 2) {
        gqlBadge.textContent = 'Ligero · Sin over-fetching (' + activeFields.length + ' campos)';
        gqlBadge.classList.remove('is-heavy');
      } else if (activeFields.length < 5) {
        gqlBadge.textContent = 'Medida exacta (' + activeFields.length + ' campos pedidos)';
        gqlBadge.classList.remove('is-heavy');
      } else {
        gqlBadge.textContent = 'Perfil completo solicitado (5/5 campos)';
        gqlBadge.classList.add('is-heavy');
      }
    }
  }

  gqlCheckboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      var checkedCount = gqlCheckboxes.filter(function (x) { return x.checked; }).length;
      if (checkedCount === 0) {
        cb.checked = true;
      }
      renderGraphQLDemo();
    });
  });

  renderGraphQLDemo();

  /* ========================================================================
     4. DEMO INTERACTIVA TEMA 02: gRPC
     ======================================================================== */
  var grpcBtn = document.getElementById('grpcCallBtn');
  var grpcResultText = document.getElementById('grpcResultText');
  var rpcCallCounter = 104;

  if (grpcBtn && grpcResultText) {
    grpcBtn.addEventListener('click', function () {
      rpcCallCounter += 1;
      var latency = (1.1 + Math.random() * 1.4).toFixed(2);
      grpcResultText.innerHTML =
        '✓ Llamada binaria <code>#ORD-' + rpcCallCounter + '</code> completada en <strong>' +
        latency + ' ms</strong>: stock descontado entre Pagos (Python) e Inventario (Go).';
    });
  }

  /* ========================================================================
     5. DEMO INTERACTIVA TEMA 03: KUBERNETES (k8s)
     ======================================================================== */
  var k8sPodsGrid = document.getElementById('k8sPodsGrid');
  var k8sStatus = document.getElementById('k8sClusterStatus');
  var k8sPeakBtn = document.getElementById('k8sPeakBtn');
  var k8sCrashBtn = document.getElementById('k8sCrashBtn');
  var isBlackFriday = false;
  var healingIndex = -1;

  function renderK8sPods() {
    if (!k8sPodsGrid || !k8sStatus) return;
    var count = isBlackFriday ? 6 : 2;

    if (healingIndex >= 0) {
      k8sStatus.textContent = 'Auto-recuperación activa · Reemplazando Pod fallido...';
    } else if (isBlackFriday) {
      k8sStatus.textContent = 'Pico Black Friday · 6 Réplicas con Balanceo de Carga';
    } else {
      k8sStatus.textContent = 'Tráfico Estándar · 2 Réplicas Activas';
    }

    var html = '';
    for (var i = 0; i < count; i++) {
      var podCode = 'web-pod-0' + (i + 1);
      var isHealing = i === healingIndex;
      html +=
        '<div class="pod-card' + (isHealing ? ' is-healing' : '') + '">' +
        '<strong>' + podCode + '</strong>' +
        '<span>' + (isHealing ? '↻ Reemplazando...' : '● Healthy · Activo') + '</span>' +
        '</div>';
    }
    k8sPodsGrid.innerHTML = html;
  }

  if (k8sPeakBtn) {
    k8sPeakBtn.addEventListener('click', function () {
      isBlackFriday = !isBlackFriday;
      healingIndex = -1;
      k8sPeakBtn.textContent = isBlackFriday ? '↓ Finalizar Black Friday' : '⚡ Pico Black Friday';
      renderK8sPods();
    });
  }

  if (k8sCrashBtn) {
    k8sCrashBtn.addEventListener('click', function () {
      if (healingIndex !== -1) return;
      healingIndex = 0;
      renderK8sPods();
      window.setTimeout(function () {
        healingIndex = -1;
        renderK8sPods();
        if (k8sStatus) {
          k8sStatus.textContent =
            'Self-healing completado · Nuevo Pod saludable desplegado (' + (isBlackFriday ? 6 : 2) + ' activos)';
        }
      }, 950);
    });
  }

  renderK8sPods();

  /* ========================================================================
     6. DEMO INTERACTIVA TEMA 04: DOCKER COMPOSE
     ======================================================================== */
  var composeBtn = document.getElementById('composeRunBtn');
  var composeList = document.getElementById('composeStatusList');
  var composeRunning = false;
  var composeBusy = false;

  if (composeBtn && composeList) {
    composeBtn.addEventListener('click', function () {
      if (composeBusy) return;
      var items = Array.prototype.slice.call(composeList.querySelectorAll('li'));

      if (composeRunning) {
        composeRunning = false;
        composeBtn.textContent = '▶ docker-compose up';
        items.forEach(function (li) {
          li.classList.remove('is-running', 'is-starting');
          var em = li.querySelector('em');
          if (em) em.textContent = 'Detenido';
        });
        return;
      }

      composeBusy = true;
      composeBtn.textContent = 'Iniciando red y contenedores...';

      items.forEach(function (li, idx) {
        window.setTimeout(function () {
          li.classList.add('is-starting');
          var em = li.querySelector('em');
          if (em) em.textContent = 'Creando...';
        }, idx * 240);

        window.setTimeout(function () {
          li.classList.remove('is-starting');
          li.classList.add('is-running');
          var em = li.querySelector('em');
          if (em) em.textContent = 'Running ✓';
          if (idx === items.length - 1) {
            composeBusy = false;
            composeRunning = true;
            composeBtn.textContent = '■ docker-compose down';
          }
        }, idx * 320 + 420);
      });
    });
  }

  /* ========================================================================
     7. DEMO INTERACTIVA TEMA 05: WEBSOCKETS / SOCKET.IO
     ======================================================================== */
  var wsStage = document.getElementById('wsStage');
  var wsTabs = Array.prototype.slice.call(document.querySelectorAll('[data-ws-mode]'));
  var currentWsMode = 'chat';
  var financePrice = 4218.5;

  function renderWsStage() {
    if (!wsStage) return;
    if (currentWsMode === 'chat') {
      wsStage.innerHTML =
        '<div class="ws-event-line"><span>socket.emit("mensaje:nuevo")</span><span>⇄ Latencia: ~12 ms</span></div>' +
        '<p><strong>Chat en vivo:</strong> Leticia envía un mensaje y el servidor lo transmite al instante a Daniela y Jared sin recargar ni hacer peticiones HTTP repetidas.</p>';
    } else if (currentWsMode === 'docs') {
      wsStage.innerHTML =
        '<div class="ws-event-line"><span>socket.broadcast.emit("doc:cursor")</span><span>⇄ Sincronización continua</span></div>' +
        '<p><strong>Documento colaborativo:</strong> Varios integrantes editan el mismo párrafo simultáneamente observando cada cambio letra por letra en tiempo real.</p>';
    } else {
      financePrice = +(financePrice + (Math.random() * 6 - 2.6)).toFixed(2);
      wsStage.innerHTML =
        '<div class="ws-event-line"><span>socket.on("ticker:update")</span><span>Índice Tech: USD ' + financePrice.toFixed(2) + ' ▲</span></div>' +
        '<p><strong>Tablero financiero:</strong> El servidor empuja las variaciones de cotización continuamente a todos los paneles conectados en milisegundos.</p>';
    }
  }

  wsTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      currentWsMode = tab.getAttribute('data-ws-mode') || 'chat';
      wsTabs.forEach(function (t) {
        t.classList.toggle('is-active', t === tab);
      });
      renderWsStage();
    });
  });

  window.setInterval(function () {
    if (currentIndex === 5 && currentWsMode === 'finance') {
      renderWsStage();
    }
  }, 1800);

  renderWsStage();

  /* ========================================================================
     8. FONDO DE NODOS LIGERO DIFERIDO (CERO IMPACTO EN LA CARGA INICIAL)
     ======================================================================== */
  function initConstellation() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var canvas = document.getElementById('constellationCanvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var width = 0;
    var height = 0;
    var nodes = [];
    var NODE_COUNT = 26;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: 1.3 + Math.random() * 1.5
      });
    }

    function step() {
      if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';

        for (var i = 0; i < nodes.length; i++) {
          var a = nodes[i];
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;

          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
          ctx.fill();

          for (var j = i + 1; j < nodes.length; j++) {
            var b = nodes[j];
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            var distSq = dx * dx + dy * dy;
            if (distSq < 21000) {
              var alpha = (1 - distSq / 21000) * 0.14;
              ctx.strokeStyle = 'rgba(125, 211, 252, ' + alpha.toFixed(3) + ')';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initConstellation);
  } else {
    window.setTimeout(initConstellation, 150);
  }
})();
