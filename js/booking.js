/* booking.js – 3-step booking that sends the request to WhatsApp.
   WhatsApp number, branches and services come from data.js. */
(() => {
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* categories = services from data.js + a "Not sure" option */
  const CATS = [...SERVICES.map(s => ({ id: s.id, name: s.name, items: s.items })),
    { id: "advice", name: "Not sure", items: [["I need advice", "We’ll guide you"]] }];

  const S = { cat: CATS[0].id, sel: [], date: "", time: "", step: 0 };

  /* preselect from services page link: booking.html?s=facial */
  const q = new URLSearchParams(location.search).get("s");
  if (q && CATS.some(c => c.id === q)) { S.cat = q; if (q === "advice") S.sel = ["I need advice"]; }

  $("br").innerHTML = SITE.branches.map(b => `<option>${esc(b.name)}</option>`).join("");

  /* ---- step 1: services ---- */
  const catObj = () => CATS.find(c => c.id === S.cat);
  function renderServices() {
    $("cats").innerHTML = CATS.map(c => `<button type="button" class="${c.id === S.cat ? "on" : ""}" data-c="${c.id}">${c.name}</button>`).join("");
    $("tiles").innerHTML = catObj().items.map((s, i) => `<button type="button" class="tile ${S.sel.includes(s[0]) ? "on" : ""}" style="animation-delay:${i * 50}ms" data-s="${esc(s[0])}">${esc(s[0])}<small>${esc(s[1])}</small></button>`).join("");
    $("picked").innerHTML = S.sel.length
      ? "<span>Selected:</span>" + S.sel.map(n => `<button type="button" data-r="${esc(n)}">${esc(n)} ✕</button>`).join("")
      : "<span>You can choose more than one service.</span>";
  }
  $("picked").onclick = e => { const b = e.target.closest("button"); if (b) { S.sel = S.sel.filter(x => x !== b.dataset.r); renderServices(); } };
  $("cats").onclick = e => { const b = e.target.closest("button"); if (b) { S.cat = b.dataset.c; renderServices(); } };
  $("tiles").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    const n = b.dataset.s; S.sel = S.sel.includes(n) ? S.sel.filter(x => x !== n) : [...S.sel, n];
    renderServices(); $("err").textContent = "";
  };

  /* ---- step 2: date + time ---- */
  const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const DN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], MN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const TIMES = ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"];
  const isClosed = d => { const h = SITE.hours.find(x => x.day === d.getDay()); return !h || !h.open; };
  function renderDates() {
    const o = []; for (let i = 1; i <= 21; i++) { const d = new Date(); d.setDate(d.getDate() + i); o.push(d); }
    $("dates").innerHTML = o.map(d => `<button type="button" ${isClosed(d) ? "disabled title='Closed'" : ""} class="${iso(d) === S.date ? "on" : ""}" data-d="${iso(d)}">${DN[d.getDay()]}<b>${d.getDate()}</b>${MN[d.getMonth()]}</button>`).join("");
    $("tm").innerHTML = TIMES.map(t => `<button type="button" class="${t === S.time ? "on" : ""}" data-t="${t}">${t}</button>`).join("");
  }
  $("dates").onclick = e => { const b = e.target.closest("button"); if (b && !b.disabled) { S.date = b.dataset.d; renderDates(); $("err").textContent = ""; } };
  $("tm").onclick = e => { const b = e.target.closest("button"); if (b) { S.time = b.dataset.t; renderDates(); $("err").textContent = ""; } };
  const nice = d => { const [y, m, dd] = d.split("-").map(Number); const x = new Date(y, m - 1, dd); return DN[x.getDay()] + ", " + dd + " " + MN[m - 1] + " " + y; };

  /* ---- step 3: details ---- */
  const data = () => ({ name: $("nm").value.trim(), phone: $("ph").value.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, ""), branch: $("br").value, notes: $("nt").value.trim() });
  function summary() {
    const d = data();
    $("sum").innerHTML = [["Services", S.sel.join(", ")], ["Date", S.date ? nice(S.date) : "-"], ["Time", S.time || "-"], ["Name", d.name || "-"], ["Mobile", d.phone || "-"], ["Branch", d.branch]]
      .map(r => `<div><span>${r[0]}</span><b>${esc(r[1])}</b></div>`).join("");
  }
  function check(n) {
    const d = data();
    if (n === 0 && !S.sel.length) return "Please choose at least one service.";
    if (n === 1 && !S.date) return "Please pick a day.";
    if (n === 1 && !S.time) return "Please pick a time.";
    if (n === 2 && d.name.length < 2) return "Please enter your name.";
    if (n === 2 && !/^[0-9]{10}$/.test(d.phone)) return "Enter a valid 10-digit mobile number.";
    return "";
  }

  /* ---- navigation ---- */
  function go(n, first) {
    S.step = n;
    document.querySelectorAll(".step").forEach(s => s.classList.toggle("on", +s.dataset.s === n));
    document.querySelectorAll(".prog i").forEach((i, k) => i.classList.toggle("on", k <= n));
    document.querySelectorAll(".prog u").forEach((u, k) => u.style.setProperty("--f", k < n ? 1 : 0));
    $("bk").style.visibility = n ? "visible" : "hidden";
    $("nx").textContent = n === 2 ? "Send on WhatsApp" : "Next";
    $("err").textContent = ""; if (n === 2) summary();
    if (!first) document.querySelector(".book-card").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  $("bk").onclick = () => go(S.step - 1);

  function burst() {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const c = ["#F7B6C4", "#E2553A", "#E76F8E", "#FADADD", "#A8C9A0", "#C79A3B"];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("span"); p.className = "bp";
      p.style.cssText = `left:50%;top:40%;background:${c[i % c.length]}`; document.body.appendChild(p);
      const a = Math.random() * 6.28, r = 90 + Math.random() * 190;
      p.animate([{ transform: "translate(0,0) rotate(0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * r}px,${Math.sin(a) * r + 120}px) rotate(${Math.random() * 540}deg)`, opacity: 0 }],
        { duration: 1500 + Math.random() * 700, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = () => p.remove();
    }
  }

  $("nx").onclick = () => {
    const m = check(S.step); if (m) { $("err").textContent = m; return; }
    if (S.step < 2) return go(S.step + 1);
    const d = data();
    const msg = ["*New appointment request*", "Name: " + d.name, "Mobile: " + d.phone, "Branch: " + d.branch, "Services: " + S.sel.join(", "), "Date: " + nice(S.date), "Time: " + S.time]
      .concat(d.notes ? ["Notes: " + d.notes] : []).join("\n");
    const url = "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(msg);
    document.querySelectorAll(".step,#nav2,#err,#prog").forEach(e => e.style.display = "none");
    $("okm").textContent = "WhatsApp is opening with your request ready. Just press Send there.";
    $("wa").href = url; $("ok").classList.add("on"); burst();
    window.open(url, "_blank") || (location.href = url);
  };

  renderServices(); renderDates(); go(0, true);
  ["nm", "ph", "br"].forEach(i => $(i).addEventListener("input", summary));
})();
