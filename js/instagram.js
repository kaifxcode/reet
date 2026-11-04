/* instagram.js – Instagram section on the home page.
   Follow button animation, and reels with no real link yet fall back to your profile. */
(() => {
  const fb = document.getElementById("followBtn");
  if (!fb) return;
  const fc = document.getElementById("folCount");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* a reel still containing REEL_x_ID (placeholder) opens your profile instead of a broken page */
  document.querySelectorAll(".reels .reel").forEach(r => {
    if (/REEL_\d_ID/.test(r.getAttribute("href") || "")) r.href = `https://instagram.com/${SITE.instagram}`;
  });

  function hearts(x, y, n = 8) {
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const h = document.createElement("span");
      h.className = "heart-fly"; h.textContent = ["♥", "✿", "♥"][i % 3];
      h.style.cssText = `left:${x}px;top:${y}px;color:${["#D4607A", "#E2725B", "#F2A93B"][i % 3]}`;
      document.body.appendChild(h);
      const dx = (Math.random() - .5) * 120, dy = -80 - Math.random() * 100;
      h.animate([{ transform: "translate(-50%,-50%) scale(.4)", opacity: 1 },
                 { transform: `translate(calc(-50% + ${dx}px), ${dy}px) scale(${1 + Math.random() * .7}) rotate(${(Math.random() - .5) * 60}deg)`, opacity: 0 }],
        { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = () => h.remove();
    }
  }

  /* Follow: hearts + "Following ✓" + follower count +1, then the link opens Instagram */
  fb.addEventListener("click", () => {
    const r = fb.getBoundingClientRect(); hearts(r.left + r.width / 2, r.top + r.height / 2);
    fb.classList.add("done"); fb.textContent = "Following ✓";
    fc.textContent = (+fc.dataset.base + 1).toLocaleString(); fc.classList.add("bump");
    setTimeout(() => fc.classList.remove("bump"), 500);
  });
})();
