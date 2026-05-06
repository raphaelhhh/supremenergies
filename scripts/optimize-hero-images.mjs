import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "src/assets";
const OUT_DIR = "public/images/hero";
const WIDTHS = [480, 800, 1200, 1600];
const HEROES = [
  "energy-label.png",
  "hero-isolation-facade.jpg",
  "hero-maison-renovation.jpg",
  "hero-maison-sans-personnes.jpg",
  "hero-renovation-energetique.jpg",
  "hero-renovation-realiste.jpg",
  "renovation-globale-maison.jpg",
];

await mkdir(OUT_DIR, { recursive: true });

for (const file of HEROES) {
  const inputPath = path.join(SRC_DIR, file);
  const baseName = path.parse(file).name;
  const meta = await sharp(inputPath).metadata();
  const maxWidth = meta.width ?? 1600;

  for (const w of WIDTHS) {
    if (w > maxWidth + 50) continue;
    const resized = sharp(inputPath).resize({ width: w, withoutEnlargement: true });
    await resized.clone().webp({ quality: 78 }).toFile(path.join(OUT_DIR, `${baseName}-${w}.webp`));
    await resized.clone().avif({ quality: 55 }).toFile(path.join(OUT_DIR, `${baseName}-${w}.avif`));
    await resized.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT_DIR, `${baseName}-${w}.jpg`));
  }
  console.log(`✓ ${file}`);
}
console.log("Done.");
