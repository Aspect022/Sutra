import catalogData from "@/data/catalog.json";

export type Product = {
  id: string;
  name: string;
  category: "Timeless Sarees" | "Luxury Fabrics" | "Saree Accessories";
  price: number;
  priceLabel: string;
  subtitle: string;
  description: string;
  image: string;
  material?: string;
  color?: string;
  care?: string;
  available?: boolean;
  options?: { name: string; values: string[] }[];
};

export const sampleProducts: Product[] = catalogData.map((product) => ({
  ...product,
  category: product.category as Product["category"],
  priceLabel: `₹${product.price.toLocaleString("en-IN")}`,
}));

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    if (char === '"' && quoted && csv[i + 1] === '"') { cell += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(cell.trim()); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && csv[i + 1] === "\n") i += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = []; cell = "";
    } else cell += char;
  }
  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function fromCsv(csv: string): Product[] {
  const [head = [], ...rows] = parseCsv(csv);
  const headers = head.map((value) => value.trim().toLowerCase().replace(/[ _-]+/g, ""));
  const value = (row: string[], key: string) => row[headers.indexOf(key)] ?? "";
  const firstValue = (row: string[], ...keys: string[]) => keys.map((key) => value(row, key)).find(Boolean) ?? "";
  const imageUrl = (input: string) => {
    const source = input.trim();
    if (!source) return "/placeholder.svg";
    if (/^[\w-]{20,}$/.test(source)) return `https://drive.google.com/uc?export=view&id=${source}`;
    try {
      const url = new URL(source);
      if (url.hostname === "drive.google.com") {
        const id = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] || url.searchParams.get("id");
        if (id) return `https://drive.google.com/uc?export=view&id=${id}`;
      }
    } catch {
      return "/placeholder.svg";
    }
    return source;
  };
  const parsed: Array<Product | null> = rows.map((row) => {
    const rawPrice = firstValue(row, "price", "cost", "amount");
    const priceText = rawPrice.replace(/[₹,\s]/g, "");
    const price = Number.parseFloat(priceText);
    const name = value(row, "name");
    if (!name || !Number.isFinite(price)) return null;
    const category = value(row, "category").trim().toLowerCase();
    const safeCategory: Product["category"] = ["luxury fabrics", "fabric", "fabrics"].includes(category)
      ? "Luxury Fabrics"
      : ["saree accessories", "accessories", "accessory"].includes(category)
        ? "Saree Accessories"
        : "Timeless Sarees";
    const options = value(row, "options").split(";").map((entry) => entry.trim()).filter(Boolean).map((entry) => {
      const [optionName, ...values] = entry.split(":");
      return { name: optionName.trim(), values: (values.join(":")).split("|").map((item) => item.trim()).filter(Boolean) };
    });
    return {
      id: value(row, "id") || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      category: safeCategory,
      price,
      priceLabel: rawPrice.startsWith("₹") ? rawPrice : `₹${price.toLocaleString("en-IN")}`,
      subtitle: value(row, "subtitle") || safeCategory,
      description: value(row, "description"),
      image: imageUrl(firstValue(row, "image", "imageurl", "photourl")),
      material: value(row, "material"),
      color: firstValue(row, "color", "colour"),
      care: value(row, "care"),
      available: !["no", "false", "0", "sold out", "unavailable"].includes(value(row, "available").trim().toLowerCase()),
      options,
    } satisfies Product;
  });
  return parsed.filter((product): product is Product => product !== null);
}

export async function getProducts(): Promise<Product[]> {
  const configuredUrl = process.env.GOOGLE_SHEET_CSV_URL;
  if (configuredUrl) {
    try {
      const source = new URL(configuredUrl);
      const sheetMatch = source.pathname.match(/^\/spreadsheets\/d\/([^/]+)\/(?:edit|view|export|pubhtml)?$/);
      if (source.hostname === "docs.google.com" && sheetMatch && /\/(edit|view)$/.test(source.pathname)) {
        const gid = source.searchParams.get("gid");
        source.pathname = `/spreadsheets/d/${sheetMatch[1]}/export`;
        source.search = new URLSearchParams({ format: "csv", ...(gid ? { gid } : {}) }).toString();
      }
      const response = await fetch(source, { next: { revalidate: 300 } });
      if (response.ok) {
        const products = fromCsv(await response.text());
        if (products.length) return products;
      }
    } catch (error) {
      console.error("Sutra sheet feed unavailable; using the sample catalog.", error);
    }
  }
  return sampleProducts;
}
