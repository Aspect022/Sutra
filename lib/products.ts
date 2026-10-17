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

const wix = "https://static.wixstatic.com/media/";

export const sampleProducts: Product[] = [
  {
    id: "crimson-kanjeevaram-classic", name: "Crimson Kanjeevaram Classic", category: "Timeless Sarees", price: 450, priceLabel: "₹450", subtitle: "Traditional silk · Statement border", description: "A traditional heavy silk red saree with intricate temple motifs woven along the border in copper thread, carrying handwoven heritage into celebrations and special moments.", image: "", options: [{ name: "Weaving Style", values: ["Traditional", "Modern"] }, { name: "Finish", values: ["Glossy", "Matte", "Satin"] }],
  },
  {
    id: "midnight-silk-weave", name: "Midnight Silk Weave", category: "Timeless Sarees", price: 250, priceLabel: "₹250", subtitle: "Pure silk · Zari border", description: "A deep navy midnight blue pure silk saree featuring gold zari borders and a subtle, shimmering geometric pattern throughout the drape.", image: `${wix}26f6c4_142d7acb0e59413d90f46e70e61afc40~mv2.jpg/v1/fill/w_700,h_850,al_c,q_85/26f6c4_142d7acb0e59413d90f46e70e61afc40~mv2.jpg`, options: [{ name: "Length", values: ["5.5 Meters", "6.5 Meters"] }, { name: "Border Finish", values: ["Antique Gold", "Rose Gold", "Matte Silver"] }],
  },
  {
    id: "ivory-floral-organza", name: "Ivory Floral Organza", category: "Timeless Sarees", price: 180, priceLabel: "₹180", subtitle: "Sheer organza · Hand embroidered", description: "An ethereal sheer organza saree in soft ivory tones, meticulously hand-embroidered with delicate pastel floral vines and scalloped edges.", image: `${wix}26f6c4_dfb03ef2a4c5457984b9eb4896db820e~mv2.jpg/v1/fill/w_700,h_850,al_c,q_85/26f6c4_dfb03ef2a4c5457984b9eb4896db820e~mv2.jpg`, options: [{ name: "Embellishment", values: ["Thread Work", "Pearl Accents"] }, { name: "Border Style", values: ["Plain", "Scalloped", "Embroidered"] }],
  },
  {
    id: "handwoven-brocade-silk", name: "Handwoven Brocade Silk", category: "Luxury Fabrics", price: 120, priceLabel: "₹120", subtitle: "Metallic thread · Textured", description: "Luxurious brocade fabric featuring complex, textured floral motifs woven with metallic threads, providing a rich, stiff foundation for structured garments.", image: `${wix}26f6c4_4b9d242b0f6b4eeb9d13ce8ff22acd9a~mv2.jpg/v1/fill/w_700,h_850,al_c,q_85/26f6c4_4b9d242b0f6b4eeb9d13ce8ff22acd9a~mv2.jpg`, options: [{ name: "Pattern", values: ["Lotus", "Peacock"] }, { name: "Base Hue", values: ["Gold", "Silver", "Copper"] }],
  },
  {
    id: "raw-mulberry-silk", name: "Raw Mulberry Silk", category: "Luxury Fabrics", price: 95, priceLabel: "₹95", subtitle: "Natural silk · Off-white", description: "High-quality, unrefined mulberry silk yardage in a natural off-white shade, ideal for creating bespoke garments or adding texture to craft projects.", image: `${wix}26f6c4_2cfdcacb972b486fb9ac4c0ae588a2bf~mv2.jpg/v1/fill/w_700,h_850,al_c,q_85/26f6c4_2cfdcacb972b486fb9ac4c0ae588a2bf~mv2.jpg`, options: [{ name: "Cut", values: ["1 Meter", "5 Meters"] }],
  },
  {
    id: "chiffon-crepe-fabric", name: "Chiffon Crepe Fabric", category: "Luxury Fabrics", price: 45, priceLabel: "₹45", subtitle: "Lightweight · Jewel tones", description: "Premium lightweight crepe chiffon material with an elegant drape, perfect for evening wear, available in rich jewel-toned solid colors.", image: `${wix}26f6c4_0e671303a72442b48a1d96307e2a2925~mv2.jpg/v1/fill/w_700,h_850,al_c,q_85/26f6c4_0e671303a72442b48a1d96307e2a2925~mv2.jpg`, options: [{ name: "Color", values: ["Emerald", "Sapphire", "Amethyst"] }, { name: "Texture", values: ["Sheer", "Semi-sheer"] }],
  },
  {
    id: "antique-brass-belt", name: "Antique Brass Belt", category: "Saree Accessories", price: 75, priceLabel: "₹75", subtitle: "Vintage inspired · Adjustable", description: "A vintage-inspired, sturdy brass waistband with an adjustable ornate clasp to cinch the silhouette and provide extra support to the drape.", image: "",
  },
  {
    id: "gold-filigree-brooch", name: "Gold Filigree Brooch", category: "Saree Accessories", price: 60, priceLabel: "₹60", subtitle: "Handmade · Vintage finish", description: "An exquisite handmade pin featuring intricate wire filigree work, designed to securely fasten your drape with a touch of vintage elegance.", image: `${wix}26f6c4_95259b9cc2c84610848651fcd7abaee5~mv2.jpg/v1/fill/w_700,h_850,al_c,q_85/26f6c4_95259b9cc2c84610848651fcd7abaee5~mv2.jpg`,
  },
  {
    id: "crystal-embellished-pin", name: "Crystal Embellished Pin", category: "Saree Accessories", price: 40, priceLabel: "₹40", subtitle: "Crystal detail · Saree pin", description: "A delicate crystal embellished pin, designed to bring a subtle shimmer to your drape and keep every pleat in place.", image: `${wix}26f6c4_c4cf6e42998f47fc8a6d174f4a1d3fad~mv2.jpg/v1/fill/w_700,h_850,al_c,q_85/26f6c4_c4cf6e42998f47fc8a6d174f4a1d3fad~mv2.jpg`,
  },
];

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
