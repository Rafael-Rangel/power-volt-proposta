import fs from "fs";

const p = "lp/index.html";
let h = fs.readFileSync(p, "utf8");

h = h.replace('<h1 class="reveal">', "<h1>");
h = h.replace('<p class="eyebrow reveal">', '<p class="eyebrow">');
h = h.replace('<p class="lead reveal">', '<p class="lead">');
h = h.replace('<div class="hero-actions reveal">', '<div class="hero-actions">');

h = h.replace(
  /<img src="\/lp\/img\/logo(?:-sm)?\.webp" alt="Power Volt"[^>]*>/,
  '<img src="/lp/img/logo-sm.webp" alt="Power Volt" width="140" height="48" decoding="async" />'
);

// restore any -sm to full, then scope sm to area-card only
for (const n of ["foto-oficina", "foto-eletrica", "foto-automacao", "foto-campo"]) {
  h = h.split(`/lp/img/${n}-sm.webp`).join(`/lp/img/${n}.webp`);
}

h = h.replace(
  /(<div class="area-card[^"]*"><img src="\/lp\/img\/)(foto-[a-z]+)(\.webp")/g,
  '$1$2-sm$3 loading="lazy" decoding="async" width="560" height="340"'
);

fs.writeFileSync(p, h);
console.log("h1 reveal?", h.includes('h1 class="reveal"'));
console.log("logo-sm?", h.includes("logo-sm.webp"));
console.log("area sm count", (h.match(/area-card[^>]*>[\s\S]*?-sm\.webp/g) || []).length);
console.log("offer full?", h.includes('id="offerImg" src="/lp/img/foto-oficina.webp"'));
