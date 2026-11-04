/* services.js – builds the Services page from SERVICES in data.js */
(() => {
  const chips = document.getElementById("chips"), grid = document.getElementById("svcGrid");
  let cur = "all";

  const card = (s, i) => `
    <article class="svc" id="${s.id}" style="animation-delay:${i * 60}ms">
      <h3>${s.name}</h3>
      <p class="sub">${s.blurb}</p>
      ${s.items.map(([n, p]) => `<div class="price-row"><span>${n}</span><i></i><b>${p}</b></div>`).join("")}
      <a class="btn btn--sm" href="booking.html?s=${s.id}">Book ${s.name.toLowerCase()}</a>
    </article>`;

  function render() {
    chips.innerHTML = [{ id: "all", name: "All" }, ...SERVICES].map(s =>
      `<button class="chip ${s.id === cur ? "on" : ""}" data-id="${s.id}" role="tab">${s.name}</button>`).join("");
    grid.innerHTML = SERVICES.filter(s => cur === "all" || s.id === cur).map(card).join("");
  }
  chips.onclick = e => {
    const b = e.target.closest(".chip"); if (!b) return;
    cur = b.dataset.id; render();
    b.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  };

  /* open directly on a category when linked as services.html#facial */
  const h = location.hash.slice(1);
  if (SERVICES.some(s => s.id === h)) cur = h;
  render();
})();
