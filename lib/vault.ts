import fs from "fs";
import path from "path";

export type VaultInteraction =
  | "shelf"
  | "queue"
  | "storyboard"
  | "tv"
  | "lab"
  | "moodboard"
  | "stack"
  | "gallery"
  | "timeline"
  | "feed"
  | "grid";

interface VaultPalette {
  from: string;
  to: string;
  ink: string;
}

export interface VaultCategory {
  slug: string;
  title: string;
  description: string;
  intro: string;
  interaction: VaultInteraction;
  palette: VaultPalette;
}

export interface VaultItem {
  title: string;
  description: string;
  tag?: string;
  meta?: string;
  href?: string;
}

export interface VaultGalleryFolder {
  id: string;
  title: string;
  images: string[];
}

export interface VaultCategoryPageData extends VaultCategory {
  items: VaultItem[];
  galleryFolders?: VaultGalleryFolder[];
}

const VAULT_PATH = path.join(process.cwd(), "content", "vault");
const IMAGE_PATTERN = /\.(png|jpe?g|webp|gif|avif)$/i;

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

export function getVaultCategories(): VaultCategory[] {
  return readJsonFile<VaultCategory[]>(path.join(VAULT_PATH, "categories.json"));
}

export function getVaultSlugs(): string[] {
  return getVaultCategories().map((category) => category.slug);
}

export function getVaultCategory(slug: string): VaultCategoryPageData | null {
  const category = getVaultCategories().find((entry) => entry.slug === slug);

  if (!category) {
    return null;
  }

  const filePath = path.join(VAULT_PATH, slug, "index.json");

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const items = readJsonFile<VaultItem[]>(filePath);
  const galleryFolders =
    category.interaction === "gallery" ? getGalleryFolders(slug) : undefined;

  return {
    ...category,
    items,
    galleryFolders,
  };
}

function getGalleryFolders(slug: string): VaultGalleryFolder[] {
  const galleryRootPath = path.join(process.cwd(), "public", "vault", slug);

  if (!fs.existsSync(galleryRootPath)) {
    return [];
  }

  const entries = fs.readdirSync(galleryRootPath, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory());
  const rootFiles = entries.filter(
    (entry) => entry.isFile() && IMAGE_PATTERN.test(entry.name)
  );

  const foldersFromDirectories = directories
    .map((directory) => {
      const directoryPath = path.join(galleryRootPath, directory.name);
      const images = fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && IMAGE_PATTERN.test(entry.name))
        .map((entry) => `/vault/${slug}/${directory.name}/${entry.name}`)
        .sort((first, second) => first.localeCompare(second));

      if (images.length === 0) {
        return null;
      }

      return {
        id: directory.name,
        title: directory.name
          .split(/[-_]+/)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
        images,
      };
    })
    .filter((folder): folder is VaultGalleryFolder => folder !== null);

  if (foldersFromDirectories.length > 0) {
    return foldersFromDirectories;
  }

  if (rootFiles.length === 0) {
    return [];
  }

  return [
    {
      id: "screenshots",
      title: "Screenshots",
      images: rootFiles
        .map((entry) => `/vault/${slug}/${entry.name}`)
        .sort((first, second) => first.localeCompare(second)),
    },
  ];
}
