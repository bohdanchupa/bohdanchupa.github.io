import type { ImageMetadata } from 'astro';

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/varieties/*.png',
  { eager: true }
);

const fileMap: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(allImages)) {
  const filename = path.split('/').pop()!.replace('.png', '');
  fileMap[filename] = mod.default;
}

const imageMap: Record<string, ImageMetadata[]> = {};

for (const [filename, img] of Object.entries(fileMap)) {
  const dupMatch = filename.match(/^(.+)-(\d+)$/);
  const extraMatch = filename.match(/^(.+)-extra$/);
  let baseSlug = filename;
  let isDup = false;

  if (extraMatch && fileMap[extraMatch[1]]) {
    baseSlug = extraMatch[1];
    isDup = true;
  } else if (dupMatch && fileMap[dupMatch[1]]) {
    baseSlug = dupMatch[1];
    isDup = true;
  }

  if (!imageMap[baseSlug]) imageMap[baseSlug] = [];
  if (isDup) {
    imageMap[baseSlug].push(img);
  } else {
    imageMap[baseSlug].unshift(img);
  }
}

export function getVarietyImages(slug: string): ImageMetadata[] {
  return imageMap[slug] ?? [];
}

export function getVarietyMainImage(slug: string): ImageMetadata | null {
  return imageMap[slug]?.[0] ?? null;
}

const aboutImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/about/*.png',
  { eager: true }
);

export function getAboutImage(name: string): ImageMetadata | null {
  for (const [path, mod] of Object.entries(aboutImages)) {
    if (path.endsWith(`${name}.png`)) return mod.default;
  }
  return null;
}
