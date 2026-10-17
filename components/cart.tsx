"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

type CartLine = { product: Product; quantity: number };
type CartContextValue = {
  items: CartLine[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = "sutra-shopping-bag";
const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919019181160";

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Sutra cart controls must be used inside CartProvider.");
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((line): line is CartLine =>
            line && typeof line === "object" && "product" in line && "quantity" in line &&
            typeof line.quantity === "number" && line.quantity > 0,
          ));
        }
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    isOpen,
    setIsOpen,
    addItem(product) {
      setItems((current) => {
        const existing = current.find((line) => line.product.id === product.id);
        return existing
          ? current.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
          : [...current, { product, quantity: 1 }];
      });
    },
    changeQuantity(productId, quantity) {
      setItems((current) => quantity < 1
        ? current.filter((line) => line.product.id !== productId)
        : current.map((line) => line.product.id === productId ? { ...line, quantity } : line));
    },
    removeItem(productId) {
      setItems((current) => current.filter((line) => line.product.id !== productId));
    },
  }), [items, isOpen]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function CartButton() {
  const { items, setIsOpen } = useCart();
  const count = items.reduce((total, line) => total + line.quantity, 0);

  return (
    <button className="cart-trigger" type="button" onClick={() => setIsOpen(true)} aria-label={`Open shopping bag, ${count} ${count === 1 ? "item" : "items"}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
      <span className="cart-trigger-label">Bag</span>
      <span className="cart-badge" aria-live="polite">{count}</span>
    </button>
  );
}

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, setIsOpen } = useCart();

  return (
    <button
      className="product-cta product-cta-secondary"
      type="button"
      disabled={product.available === false}
      onClick={() => { addItem(product); setIsOpen(true); }}
    >
      <span>{product.available === false ? "Currently unavailable" : "Add to cart"}</span>
      <span className="product-cta-arrow" aria-hidden="true">＋</span>
    </button>
  );
}

function whatsappCheckoutUrl(items: CartLine[], total: number) {
  const order = items.map(({ product, quantity }) => `• ${product.name} × ${quantity} — ₹${(product.price * quantity).toLocaleString("en-IN")}`).join("\n");
  const message = `Hello Sutra, I'd like to enquire about these pieces:\n${order}\n\nEstimated total: ₹${total.toLocaleString("en-IN")}\nPlease share availability and delivery details.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function CartDrawer() {
  const { items, isOpen, setIsOpen, changeQuantity, removeItem } = useCart();
  const total = items.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const count = items.reduce((sum, line) => sum + line.quantity, 0);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-drawer-header">
          <div><p className="eyebrow">YOUR SUTRA SELECTION</p><h2 id="cart-title">Shopping bag <span>({count})</span></h2></div>
          <button className="cart-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close shopping bag">×</button>
        </div>

        {items.length ? (
          <>
            <div className="cart-lines">
              {items.map(({ product, quantity }) => (
                <article className="cart-line" key={product.id}>
                  <img src={product.image || "/placeholder.svg"} alt="" onError={(event) => { event.currentTarget.src = "/placeholder.svg"; }} />
                  <div className="cart-line-details">
                    <div className="cart-line-heading"><h3>{product.name}</h3><strong>₹{(product.price * quantity).toLocaleString("en-IN")}</strong></div>
                    <p>{product.subtitle}</p>
                    <div className="cart-line-actions">
                      <div className="quantity-stepper" aria-label={`Quantity for ${product.name}`}>
                        <button type="button" onClick={() => changeQuantity(product.id, quantity - 1)} aria-label={`Decrease ${product.name} quantity`}>−</button>
                        <span aria-live="polite">{quantity}</span>
                        <button type="button" onClick={() => changeQuantity(product.id, quantity + 1)} aria-label={`Increase ${product.name} quantity`}>＋</button>
                      </div>
                      <button className="cart-remove" type="button" onClick={() => removeItem(product.id)}>Remove</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Estimated total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
              <p>Availability and delivery will be confirmed with Sutra on WhatsApp.</p>
              <a className="cart-checkout" href={whatsappCheckoutUrl(items, total)} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
                <span>Continue on WhatsApp</span><span aria-hidden="true">↗</span>
              </a>
            </div>
          </>
        ) : (
          <div className="cart-empty"><span aria-hidden="true">✳</span><h3>Your bag is waiting for a story.</h3><p>Save a piece here and we’ll help you with the details.</p><button type="button" onClick={() => setIsOpen(false)}>Continue exploring</button></div>
        )}
      </aside>
    </div>
  );
}

export function buyNowUrl(product: Product) {
  const message = `Hello Sutra, I'd like to enquire about ${product.name} (${product.priceLabel}). Please share availability and delivery details.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
