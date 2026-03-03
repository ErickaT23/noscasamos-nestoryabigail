// ===================== SCRIPT.JS (MODELO EDITORIAL) =====================
// ⚠️ IMPORTANTE: NO usar "$" porque rsvp.js ya lo usa.
// Usamos "$$" para evitar conflicto.
const $$ = (s) => document.querySelector(s);

document.addEventListener("DOMContentLoaded", () => {
  // 1) Pintar invitado en portada (desde loads.js)
  paintGuestCard();

  // 2) Botón abrir invitación
  const btnOpenInvite = $$("#btnOpenInvite");
  if (btnOpenInvite) {
    btnOpenInvite.addEventListener("click", openInvitation);
  }

  // 3) Animaciones al hacer scroll
  initScrollReveal();

  initGoldReveal();

  // 4) Música
  initMusic();

  // 5) Contador (cambia a tu fecha real)
  // Formato recomendado: YYYY-MM-DDT00:00:00-06:00 (Guatemala -06)
  initFlipCountdown("2026-04-12T00:00:00-06:00");

  // 6) Foto separador rotativa (si existe el elemento)
  initRotatingSep([
    "images/H1.jpeg",
    "images/H2.jpeg",
    "images/H4.jpeg",
    "images/H5.jpeg",
    "images/V2.jpeg",
  ]);
});

/* ===================== INVITADO EN PORTADA ===================== */
function paintGuestCard() {
  const nameEl = $$("#guestCardName");
  const seatsEl = $$("#guestCardSeats");
  const seatsTxtEl = $$("#guestCardSeatsTxt");

  // Si no existen (por si aún no pegaste el HTML), no rompe
  if (!nameEl || !seatsEl) return;

  const g = window.currentGuest;

  if (g && g.name) {
    nameEl.textContent = g.name;
    const p = Number(g.passes || 1);
    seatsEl.textContent = String(p);
    if (seatsTxtEl) seatsTxtEl.textContent = p === 1 ? "lugar" : "lugares";
  } else {
    // Si entraste sin ?id=
    nameEl.textContent = "Nombre del invitado";
    seatsEl.textContent = "x";
    if (seatsTxtEl) seatsTxtEl.textContent = "lugares";
  }
}

/* ===================== ABRIR INVITACIÓN ===================== */
function openInvitation() {
  const cover = $$("#cover");
  const main = $$("#invitation");

  if (!cover || !main) return;

  // Ocultar portada con animación
  cover.classList.add("is-hidden");

  setTimeout(async () => {
    cover.style.display = "none";

    // Mostrar invitación
    main.classList.add("is-open");
    main.setAttribute("aria-hidden", "false");

    // ✅ Reproducir música automáticamente (por el click del usuario)
    await autoplayMusic();

    // Scroll suave al hero
    setTimeout(() => {
      $$("#hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

  }, 600);
}

/* ===================== REVEAL AL SCROLL ===================== */
function initScrollReveal() {
  const els = document.querySelectorAll(".fade-in-element");
  if (!els || els.length === 0) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => obs.observe(el));
}

/* ================= Animar True Love ================= */
function initGoldReveal() {
  const el = document.querySelector(".reveal-gold");
  if (!el) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.5 }
  );

  obs.observe(el);
}

/* ===================== MÚSICA ===================== */
/* ===================== MÚSICA ===================== */
function initMusic() {
  const btn = $$("#btnMusic");
  const audio = $$("#bgMusic");
  if (!btn || !audio) return;

  // asegurar loop
  audio.loop = true;

  // Estado inicial del botón
  btn.textContent = "▶";

  // Click manual play/pause
  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        btn.textContent = "❚❚";
      } else {
        audio.pause();
        btn.textContent = "▶";
      }
    } catch (e) {
      console.warn("No se pudo reproducir audio:", e);
    }
  });
}

/* ===================== AUTO-PLAY AL ABRIR ===================== */
async function autoplayMusic() {
  const btn = $$("#btnMusic");
  const audio = $$("#bgMusic");
  if (!btn || !audio) return;

  try {
    audio.loop = true;
    await audio.play();
    btn.textContent = "❚❚";
  } catch (e) {
    // Si el navegador bloquea, dejamos en play para que el usuario lo inicie
    console.warn("Auto-play bloqueado:", e);
    btn.textContent = "▶";
  }
}

/* ===================== CONTADOR ===================== */
function initCountdown(targetISO) {
  const dEl = $$("#cdDays");
  const hEl = $$("#cdHours");
  const mEl = $$("#cdMins");
  const sEl = $$("#cdSecs");
  if (!dEl || !hEl || !mEl || !sEl) return;

  const target = new Date(targetISO).getTime();
  const pad2 = (n) => String(n).padStart(2, "0");

  const tick = () => {
    const now = Date.now();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    dEl.textContent = pad2(days);
    hEl.textContent = pad2(hours);
    mEl.textContent = pad2(mins);
    sEl.textContent = pad2(secs);
  };

  tick();
  setInterval(tick, 1000);
}

/* ===================== SEPARADOR ROTATIVO ===================== */
function initRotatingSep(images){

  const imgEl = document.getElementById("rotatingSepImg");
  if(!imgEl || !images || images.length === 0) return;

  let currentIndex = 0;

  function changeImage(){

    imgEl.style.opacity = 0;

    setTimeout(() => {

      currentIndex = (currentIndex + 1) % images.length;

      imgEl.src = images[currentIndex];

      imgEl.onload = () => {
        imgEl.style.opacity = 1;
      };

    }, 400);

  }

  setInterval(changeImage, 5000);
}

//contador
function initFlipCountdown(targetISO){
  const target = new Date(targetISO).getTime();
  const pad2 = (n) => String(n).padStart(2, "0");

  const setFlip = (flipEl, newValue) => {
    if (!flipEl) return;

    const top = flipEl.querySelector(".top .digit");
    const bottom = flipEl.querySelector(".bottom .digit");
    const topFlip = flipEl.querySelector(".top-flip .digit");
    const bottomFlip = flipEl.querySelector(".bottom-flip .digit");

    const current = top?.textContent ?? "00";
    if (current === newValue) return;

    topFlip.textContent = current;
    bottomFlip.textContent = newValue;

    bottom.textContent = newValue;

    flipEl.classList.add("is-flipping");

    setTimeout(() => { top.textContent = newValue; }, 650);
    setTimeout(() => { flipEl.classList.remove("is-flipping"); }, 1300);
  };

  const flipDays = document.getElementById("flipDays");
  const flipHours = document.getElementById("flipHours");
  const flipMins = document.getElementById("flipMins");
  const flipSecs = document.getElementById("flipSecs");

  const initVal = (el, v) => {
    if (!el) return;
    el.querySelector(".top .digit").textContent = v;
    el.querySelector(".bottom .digit").textContent = v;
    el.querySelector(".top-flip .digit").textContent = v;
    el.querySelector(".bottom-flip .digit").textContent = v;
  };

  initVal(flipDays, "00");
  initVal(flipHours, "00");
  initVal(flipMins, "00");
  initVal(flipSecs, "00");

  const tick = () => {
    const now = Date.now();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    setFlip(flipDays, pad2(days));
    setFlip(flipHours, pad2(hours));
    setFlip(flipMins, pad2(mins));
    setFlip(flipSecs, pad2(secs));
  };

  tick();
  setInterval(tick, 1000);
}