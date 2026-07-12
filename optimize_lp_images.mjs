import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.resolve("lp/img");
const used = [
  "lp-hero.png",
  "logo.png",
  "foto-oficina.png",
  "foto-eletrica.png",
  "foto-campo.png",
  "foto-automacao.png",
  "foto-drone.png",
  "bg-planta.png",
  "compare-antes.png",
  "compare-depois.jpg",
  "lp-leandro.png",
  "lp-anderson.png",
];

const presets = {
  "lp-hero.png": { width: 1920, quality: 72 },
  "logo.png": { width: 320, quality: 82 },
  "foto-eletrica.png": { width: 1200, quality: 72 },
  "foto-campo.png": { width: 1200, quality: 72 },
  "foto-oficina.png": { width: 1000, quality: 74 },
  "foto-automacao.png": { width: 1000, quality: 74 },
  "foto-drone.png": { width: 1000, quality: 74 },
  "bg-planta.png": { width: 1600, quality: 68 },
  "compare-antes.png": { width: 1200, quality: 72 },
  "compare-depois.jpg": { width: 1200, quality: 72 },
  "lp-leandro.png": { width: 240, quality: 78 },
  "lp-anderson.png": { width: 240, quality: 78 },
};

async function convertOne(name) {
  const src = path.join(root, name);
  if (!fs.existsSync(src)) {
    console.warn("missing", name);
    return;
  }
  const base = name.replace(/\.(png|jpe?g)$/i, "");
  const out = path.join(root, `${base}.webp`);
  const cfg = presets[name] || { width: 1200, quality: 74 };
  const before = fs.statSync(src).size;
  await sharp(src)
    .rotate()
    .resize({ width: cfg.width, withoutEnlargement: true })
    .webp({ quality: cfg.quality, effort: 5 })
    .toFile(out);
  const after = fs.statSync(out).size;
  console.log(
    `${name} -> ${base}.webp  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
  );
}

const partnersDir = path.join(root, "partners");
async function convertPartners() {
  if (!fs.existsSync(partnersDir)) return;
  for (const f of fs.readdirSync(partnersDir)) {
    if (!/\.(png|jpe?g)$/i.test(f)) continue;
    const src = path.join(partnersDir, f);
    const out = path.join(partnersDir, f.replace(/\.(png|jpe?g)$/i, ".webp"));
    const before = fs.statSync(src).size;
    await sharp(src)
      .resize({ height: 120, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(out);
    const after = fs.statSync(out).size;
    console.log(`partners/${f} -> ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
  }
}

for (const name of used) await convertOne(name);
await convertPartners();
console.log("done");
