import { Catalog } from "@/components/catalog";
import { CartButton } from "@/components/cart";
import { getProducts } from "@/lib/products";

const heroImage = "/sutra-campaign-hero.webp";

const collections = [
  {
    number: "01",
    title: "Timeless Silk",
    note: "A curated gallery of silk sarees and enduring craft.",
    alt: "A timeless silk saree from Sutra's handwoven collection.",
    image:
      "https://static.wixstatic.com/media/26f6c4_8a32251358634c45bb8c7d5121477e9e~mv2.jpg/v1/fill/w_1078,h_601,al_c,q_85/Timeless%20Silk%20Collections.jpg",
    className: "collection-wide",
  },
  {
    number: "02",
    title: "Seasonal Drape",
    note: "Fresh textures for festive days and changing seasons.",
    alt: "A seasonal saree draped for a contemporary celebration.",
    image:
      "https://static.wixstatic.com/media/26f6c4_452ebe9d7dfd4019b1a4a1f523565750~mv2.jpg/v1/fill/w_700,h_900,al_c,q_85/Seasonal%20Drape%20Showcase.jpg",
    className: "",
  },
  {
    number: "03",
    title: "Everyday Wear",
    note: "Easy, breathable drapes for the rhythm of everyday life.",
    alt: "A woman wearing an ivory handloom saree with a burgundy border in warm daylight.",
    image: "/everyday-wear-editorial.webp",
    className: "",
  },
  {
    number: "04",
    title: "Everyday Luxury Sarees",
    note: "Comfortable, versatile pieces for life as it happens.",
    alt: "An everyday luxury saree from the Sutra collection.",
    image:
      "https://static.wixstatic.com/media/26f6c4_6da53ac657864853817338819f2f863f~mv2.jpg/v1/fill/w_700,h_900,al_c,q_85/Everyday%20Luxury%20Sarees.jpg",
    className: "",
  },
  {
    number: "05",
    title: "Handwoven Heritage Series",
    note: "Motifs and weaving techniques passed down through generations.",
    alt: "Traditional handwoven saree details from Sutra's heritage collection.",
    image:
      "https://static.wixstatic.com/media/26f6c4_13a6b7286ef84ac888da6c5bbed1f0cd~mv2.jpg/v1/fill/w_700,h_900,al_c,q_85/Handwoven%20Heritage%20Series.jpg",
    className: "",
  },
];

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <div className="announcement">A considered collection · Woven in India</div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Sutra home">
          <img className="wordmark-mark" src="/brand/sutra-mark.svg" alt="" />
          <span className="wordmark-lockup">
          <span className="wordmark-name">sutra</span>
          <span className="wordmark-caption">WEAVING TIMELESS STORIES</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#collection">The collection</a>
          <a href="#story">Our story</a>
          <a href="#contact">Visit us</a>
        </nav>
        <div className="header-actions">
          <CartButton />
          <a className="header-link" href="#collection">Explore <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" style={{ backgroundImage: `url('${heroImage}')` }} role="img" aria-label="Saree drape from the Sutra collection" />
        <div className="hero-wash" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span /> EST. 2026 · BENGALURU</p>
          <h1>Sutra:<br /><em>Weaving timeless stories.</em></h1>
          <p className="hero-intro">Sarees with a modern soul, woven to carry the beauty of timeless stories. A considered edit of heirloom silk, tactile detail, and expressive color.</p>
          <a className="button button-light" href="#collection">Discover the collection <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-side-note">HANDWOVEN STORIES <span>—</span> WORN YOUR WAY</div>
        <div className="hero-index"><span>01</span><i /> 03</div>
      </section>

      <section className="service-strip" aria-label="Sutra shopping details">
        <div><span className="service-mark">✳</span><p>Weaving timeless stories</p></div>
        <div><span className="service-mark">✳</span><p>Pan India shipping</p></div>
        <div><span className="service-mark">✳</span><p>Personal help, directly from Sutra</p></div>
      </section>

      <section className="intro-band" id="story">
        <p className="eyebrow">A THREAD THROUGH TIME</p>
        <h2>Tradition, held<br />in a <em>new light.</em></h2>
        <div className="intro-body">
          <p>We honor the silent language of the loom. Every knot, slub, and motif carries the touch of a maker and a story worth passing on.</p>
          <p>Rooted in artisanal heritage and shaped for today, our sarees find their place in the everyday as naturally as they do in the extraordinary.</p>
        </div>
        <span className="ornament" aria-hidden="true">✳</span>
      </section>

      <section className="collections-section" aria-labelledby="collections-heading">
        <div className="section-topline"><span>01 / THE EDIT</span><span>COLLECTED WITH INTENTION</span></div>
        <div className="section-heading-row">
          <h2 id="collections-heading">Our <em>collections</em></h2>
          <p>Pieces for the moments you remember<br />and all the ones in between.</p>
        </div>
        <div className="collection-grid">
          {collections.map((collection) => (
            <a href="#collection" className={`collection-card ${collection.className}`} key={collection.number}>
              <img src={collection.image} alt={collection.alt} loading="lazy" decoding="async" />
              <div className="collection-shade" />
              <span className="collection-number">{collection.number}</span>
              <div className="collection-label"><span>{collection.note}</span><h3>{collection.title}</h3></div>
              <span className="collection-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <div className="collection-foot"><span>CRAFTED SLOWLY, WORN FOREVER</span><a href="#collection">View all pieces <span>↘</span></a></div>
      </section>

      <section className="quote-band">
        <span className="quote-mark">“</span>
        <blockquote>True beauty lives in the<br />tactile, the archival, the <em>timeless.</em></blockquote>
        <span className="quote-credit">THE SUTRA APPROACH</span>
      </section>

      <Catalog products={products} />

      <section className="journal-section">
        <div className="section-topline"><span>03 / NOTES FROM THE LOOM</span><span>WEAVING STORIES</span></div>
        <div className="journal-heading"><h2>Worn with <em>meaning.</em></h2><p>Small notes on styling, craft, and the rituals that make a saree your own.</p></div>
        <div className="journal-grid">
          <article className="journal-card">
            <div className="journal-photo journal-photo-one" aria-hidden="true"><span>THE ART OF THE DRAPE</span></div>
            <p className="journal-meta">STYLE NOTES <span>·</span> 4 MIN READ</p>
            <h3>Discover timeless elegance: saree styling tips</h3>
            <p>From the first pleat to the final pin, make the drape feel entirely your own.</p>
            <a href="#collection" aria-label="Read saree styling tips">Read the story <span>↗</span></a>
          </article>
          <article className="journal-card">
            <div className="journal-photo journal-photo-two" aria-hidden="true"><span>COLLECTED FOR YOU</span></div>
            <p className="journal-meta">THE COLLECTION <span>·</span> 4 MIN READ</p>
            <h3>Elevate your wardrobe with luxurious sarees</h3>
            <p>A closer look at rich textures, thoughtful details, and pieces made to last.</p>
            <a href="#collection" aria-label="Explore luxurious sarees">Explore the edit <span>↗</span></a>
          </article>
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <div className="footer-main">
          <div><p className="eyebrow">SUTRA · BENGALURU</p><h2>Wear a story<br /><em>worth keeping.</em></h2><a className="footer-cta" href="#collection">Find your piece <span>↗</span></a></div>
          <div className="footer-contact"><p className="eyebrow">CONNECT</p><p>SUTRA — Weaving Timeless Stories</p><p>Bengaluru, Karnataka 560076</p><p>Pan India shipping</p><a href="tel:+916361312135">+91 63613 12135</a><a href="mailto:thesutraasarees@gmail.com">thesutraasarees@gmail.com ↗</a><a href="https://www.instagram.com/thesutraasarees/" target="_blank" rel="noreferrer">@thesutraasarees ↗</a></div>
        </div>
        <div className="footer-bottom"><a className="footer-wordmark" href="#top">sutra</a><span>© 2026 Sutra. Crafted with heritage in mind.</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}
