/* ==========================================================
   main.js – shared by every page (nav, petals, reveal, links, hours…)
   Needs data.js loaded first.
   ========================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- fill links from SITE (data.js) ---------- */
  $$("[data-ig]").forEach(a => a.href = `https://instagram.com/${SITE.instagram}`);
  $$("[data-ig-handle]").forEach(e => e.textContent = "@" + SITE.instagram);
  $$("[data-mail]").forEach(a => a.href = `mailto:${SITE.email}`);
  $$("[data-mail-text]").forEach(e => e.textContent = SITE.email);
  $$("[data-wa]").forEach(a => a.href = `https://wa.me/${SITE.whatsapp}`);
  $$("[data-call]").forEach(a => a.href = "tel:" + SITE.phone.replace(/\s/g, ""));
  $$("[data-phone-text]").forEach(e => e.textContent = SITE.phone);
  const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- top bar state + bottom tab bar ---------- */
  const nav = $("#nav");
  $$("[data-tel]").forEach(a => a.href = "tel:" + SITE.phone.replace(/\s/g, ""));
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 30 || !$("#home"));
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const page = location.pathname.split("/").pop() || "index.html";
  const setTab = k => $$("[data-tab]").forEach(a => a.classList.toggle("on", a.dataset.tab === k));
  const setSpy = k => $$("[data-spy]").forEach(a => a.classList.toggle("active", a.dataset.spy === k));
  if (page.startsWith("services")) setTab("services");
  else if (page.startsWith("booking")) setTab("book");
  else if ("IntersectionObserver" in window) {
    const map = { home: "home", about: "home", services: "services", gallery: "gallery", instagram: "gallery", testimonials: "gallery", visit: "visit" };
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { setTab(map[e.target.id]); setSpy(e.target.id); }
    }), { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(id => { const s = document.getElementById(id); s && io.observe(s); });
  }
  $$(".nav__side a").forEach(a => { if (a.getAttribute("href") === page) a.classList.add("active"); });

  /* ---------- falling soft petals ---------- */
  const pl = $("#petals");
  if (pl && !reduce) {
    const n = innerWidth < 700 ? 8 : 14;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("i"); p.className = "petal" + (i % 4 === 0 ? " m" : "");
      p.style.cssText = `--x:${Math.random() * 100}%;--s:${8 + Math.random() * 10}px;--t:${9 + Math.random() * 9}s;--d:${-Math.random() * 18}s;--dr:${-80 + Math.random() * 220}px`;
      pl.appendChild(p);
    }
  }

  /* ---------- scroll reveal ---------- */
  const rv = $$(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add("in"));

  /* ---------- count-up numbers ---------- */
  $$("[data-count]").forEach(el => {
    const end = +el.dataset.count, run = () => {
      const t0 = performance.now(), dur = 1600;
      const step = t => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))).toLocaleString() + (end >= 100 ? "+" : ""); k < 1 && requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) return run();
    const io = new IntersectionObserver(es => es[0].isIntersecting && (run(), io.disconnect()), { threshold: .6 }); io.observe(el);
  });

  /* ---------- featured service cards (home) ---------- */
  const feat = $("#featured");
  if (feat) feat.innerHTML = SERVICES.filter(s => s.featured).map((s, i) => `
    <a class="card reveal" style="--i:${i * .07}s" href="services.html#${s.id}">
      <span class="no">0${i + 1}</span><h3>${s.name}</h3><p>${s.blurb}</p>
      <span class="more">View prices <i>→</i></span>
    </a>`).join("");
  $$("#featured .reveal").forEach(el => requestAnimationFrame(() => el.classList.add("in")));

  /* ---------- hours + open/closed badge ---------- */
  const now = new Date(), today = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();
  const fmt = t => { const [h, m] = t.split(":").map(Number); return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "AM" : "PM"}`; };
  const toM = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const hl = $("#hours");
  if (hl) hl.innerHTML = SITE.hours.map(h => `<li class="${h.day === today ? "today" : ""}"><span>${h.label}</span><span>${h.open ? fmt(h.open) + " – " + fmt(h.close) : "Closed"}</span></li>`).join("");
  const fh = $("#footHours");
  if (fh) fh.innerHTML = SITE.hours.slice(0, 5).length ? `<li>Mon – Sat: ${fmt(SITE.hours[0].open)} – ${fmt(SITE.hours[0].close)}</li><li>Sunday: ${fmt(SITE.hours[6].open)} – ${fmt(SITE.hours[6].close)}</li>` : "";
  const badge = $("#openBadge");
  if (badge) {
    const t = SITE.hours.find(h => h.day === today), open = t && t.open && mins >= toM(t.open) && mins < toM(t.close);
    badge.textContent = open ? "Open now" : "Closed now"; badge.classList.toggle("closed", !open);
  }
  const br = $("#branches");
  if (br) br.innerHTML = SITE.branches.map(b => `<div class="branch"><b>📍 ${b.name}</b><span>${b.address}</span><br><a href="${b.map}" target="_blank" rel="noopener">Get directions →</a></div>`).join("") +
    `<div class="branch"><b>📞 Call / WhatsApp</b><a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a></div>`;

  /* ---------- gallery lightbox ---------- */
  const items = $$(".g-item"), lb = $("#lb");
  if (lb && items.length) {
    const im = $("img", lb); let cur = 0;
    const show = i => { cur = (i + items.length) % items.length; const s = $("img", items[cur]); im.src = s.src; im.alt = s.alt; };
    const open = i => { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    items.forEach((b, i) => b.onclick = () => open(i));
    $(".lb-x", lb).onclick = close; $(".lb-p", lb).onclick = () => show(cur - 1); $(".lb-n", lb).onclick = () => show(cur + 1);
    lb.onclick = e => e.target === lb && close();
    addEventListener("keydown", e => { if (!lb.classList.contains("open")) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
  }


  /* ---------- gallery: dots + counter for the phone carousel ---------- */
  const track = $("#gallery-track"), gd = $("#galDots"), gc = $("#galCount");
  if (track && gd) {
    const gi = $$(".g-item", track);
    gd.innerHTML = gi.map(() => "<i></i>").join("");
    const upd = () => {
      const step = gi[0].offsetWidth + 12;
      const k = Math.min(gi.length - 1, Math.round(track.scrollLeft / step));
      $$("i", gd).forEach((d, x) => d.classList.toggle("on", x === k));
      gc.textContent = `${k + 1} / ${gi.length}`;
    };
    track.addEventListener("scroll", () => requestAnimationFrame(upd), { passive: true }); upd();
  }

  /* ---------- testimonial slider ---------- */
  const slides = $("#slides"), dots = $("#dots");
  if (slides) {
    const n = slides.children.length; let i = 0, timer;
    dots.innerHTML = [...Array(n)].map((_, k) => `<button aria-label="Review ${k + 1}"></button>`).join("");
    const go = k => { i = (k + n) % n; slides.style.transform = `translateX(-${i * 100}%)`; $$("button", dots).forEach((d, x) => d.classList.toggle("on", x === i)); };
    const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(i + 1), 5500); };
    $$("button", dots).forEach((d, k) => d.onclick = () => { go(k); auto(); });
    let sx = 0; slides.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
    slides.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 40) { go(i + (d < 0 ? 1 : -1)); auto(); } });
    go(0); auto();
  }
})();
