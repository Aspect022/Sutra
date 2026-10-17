"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { AddToCartButton, buyNowUrl } from "@/components/cart";

const categories: { label: string; value: Product["category"] | "All pieces" }[] = [
  { label: "All pieces", value: "All pieces" },
  { label: "Sarees", value: "Timeless Sarees" },
  { label: "Fabrics", value: "Luxury Fabrics" },
  { label: "Accessories", value: "Saree Accessories" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
];

export function Catalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<Product["category"] | "All pieces">("All pieces");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const sortTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const handlePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !sortMenuRef.current?.contains(event.target)) setSortOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSortOpen(false);
        sortTriggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [sortOpen]);

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = products.filter((product) =>
      (category === "All pieces" || product.category === category) &&
      (!normalized || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(normalized)),
    );
    if (sort === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, products, query, sort]);

  return (
    <section className="catalog-section" id="collection" aria-labelledby="catalog-heading">
      <div className="section-topline"><span>02 / THE COLLECTION</span><span>MADE TO BE YOURS</span></div>
      <div className="catalog-heading-row">
        <div>
          <p className="eyebrow">SAREES, FABRICS & FINISHING TOUCHES</p>
          <h2 id="catalog-heading">Shop the <em>edit</em></h2>
        </div>
        <p className="catalog-intro">A considered edit of handpicked pieces. Find the one that feels like you.</p>
      </div>

      <div className="catalog-toolbar">
        <div className="category-tabs" role="group" aria-label="Filter products by category">
          {categories.map((item) => {
            const count = item.value === "All pieces" ? products.length : products.filter((product) => product.category === item.value).length;
            return (
              <button key={item.value} className={category === item.value ? "active" : ""} onClick={() => setCategory(item.value)} aria-pressed={category === item.value}>
                {item.label}<span className="category-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="catalog-controls">
          <label className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="sr-only">Search products</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" />
            {query && <button className="clear-search" type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
          </label>

          <div className="sort-control" ref={sortMenuRef}>
            <button className={`sort-trigger${sortOpen ? " is-open" : ""}`} type="button" ref={sortTriggerRef} aria-haspopup="menu" aria-expanded={sortOpen} onClick={() => setSortOpen((open) => !open)}>
              <span className="sort-kicker">SORT BY</span>
              <span className="sort-value">{sortOptions.find((option) => option.value === sort)?.label}</span>
              <svg className="sort-chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1.5 5 5 5-5" /></svg>
            </button>
            {sortOpen && (
              <div className="sort-menu" role="menu" aria-label="Sort products">
                {sortOptions.map((option) => (
                  <button key={option.value} type="button" role="menuitemradio" aria-checked={sort === option.value} className={`sort-option${sort === option.value ? " selected" : ""}`} onClick={() => { setSort(option.value); setSortOpen(false); }}>
                    <span>{option.label}</span><span className="sort-check" aria-hidden="true">{sort === option.value ? "✓" : ""}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="catalog-count"><span>{visible.length.toString().padStart(2, "0")}</span> {visible.length === 1 ? "PIECE" : "PIECES"} <span className="count-divider">/</span> {category === "All pieces" ? "THE SUTRA EDIT" : categories.find((item) => item.value === category)?.label.toUpperCase()}</div>
      {visible.length ? (
        <div className="product-grid" id="product-grid">
          {visible.map((product, index) => (
            <article className="product-card" key={product.id} style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}>
              <div className="product-image-wrap">
                <img src={product.image || "/placeholder.svg"} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.src = "/placeholder.svg"; }} />
                <span className="product-category">{product.category === "Timeless Sarees" ? "THE SAREE EDIT" : product.category === "Luxury Fabrics" ? "THE FABRIC EDIT" : "FINISHING TOUCHES"}</span>
                {product.available === false ? <span className="product-status">CURRENTLY UNAVAILABLE</span> : <span className="product-view" aria-hidden="true">✳</span>}
              </div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.subtitle}</p></div><strong>{product.priceLabel}</strong></div>
              <p className="product-description">{product.description}</p>
              {(product.material || product.color || product.care || product.options?.length) ? <div className="product-options">
                {product.material ? <span>Material: {product.material}</span> : null}
                {product.color ? <span>Color: {product.color}</span> : null}
                {product.care ? <span>Care: {product.care}</span> : null}
                {product.options?.map((option) => <span key={option.name}>{option.name}: {option.values.join(" · ")}</span>)}
              </div> : null}
              <div className="product-actions">
                <AddToCartButton product={product} />
                {product.available === false
                  ? <button className="product-cta product-cta-buy" type="button" disabled>Unavailable</button>
                  : <a className="product-cta product-cta-buy" href={buyNowUrl(product)} target="_blank" rel="noreferrer"><span>Buy now</span><span className="product-cta-arrow" aria-hidden="true">↗</span></a>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state"><span>✳</span><p>No pieces found. Try another search or category.</p><button onClick={() => { setQuery(""); setCategory("All pieces"); }}>Show all pieces</button></div>
      )}
      <div className="catalog-note"><span>✳</span><p>Every piece has a story. <a href="https://wa.me/919019181160?text=Hello%20Sutra%2C%20I%27d%20love%20some%20help%20choosing%20a%20piece." target="_blank" rel="noreferrer">Let us help you find yours ↗</a></p></div>
    </section>
  );
}
