type HomePageProps = {
  onBrowseProducts: () => void;
};

export function HomePage({ onBrowseProducts }: HomePageProps) {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="section-tag">Landing Page</span>
          <h2>Celebrate meaningful moments with curated anniversary picks.</h2>
          <p>
            This static React homepage introduces the collection, highlights the
            brand feel, and gives visitors a quick way to view every product.
          </p>

          <div className="hero-actions">
            <button className="primary-button" onClick={onBrowseProducts}>
              View All Products
            </button>
            <a className="secondary-link" href="#highlights">
              Explore Highlights
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="stat-card">
            <strong>06</strong>
            <span>Featured products</span>
          </div>
          <div className="stat-card">
            <strong>04</strong>
            <span>Gift-ready categories</span>
          </div>
          <div className="stat-card accent">
            <strong>100%</strong>
            <span>Static front-end demo</span>
          </div>
        </div>
      </section>

      <section className="highlights-grid" id="highlights">
        <article className="highlight-card">
          <span className="section-tag">Thoughtful Curation</span>
          <h3>Products chosen for gifting, decor, and celebration.</h3>
          <p>
            The homepage sets the tone with a premium layout that still stays
            simple and easy to expand later.
          </p>
        </article>

        <article className="highlight-card">
          <span className="section-tag">Product Visibility</span>
          <h3>A dedicated display page shows the full collection at once.</h3>
          <p>
            Visitors can move from the landing message straight into a visual
            catalog without extra steps.
          </p>
        </article>

        <article className="highlight-card">
          <span className="section-tag">Ready To Extend</span>
          <h3>Built in TSX so you can later add routing, filters, or carts.</h3>
          <p>
            The structure is intentionally clean and split into components and
            data for easier future edits.
          </p>
        </article>
      </section>
    </main>
  );
}
