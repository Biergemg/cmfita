export interface TitledDescription {
  title: string;
  description: string;
}

export function asTitledDescriptionList(raw: unknown): TitledDescription[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.filter((entry): entry is TitledDescription => {
    if (typeof entry !== "object" || entry === null) {
      return false;
    }

    const candidate = entry as { title?: unknown; description?: unknown };
    return typeof candidate.title === "string" && typeof candidate.description === "string";
  });
}

export function toStableKey(label: string, index: number): string {
  const base = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${base || "item"}-${index}`;
}
