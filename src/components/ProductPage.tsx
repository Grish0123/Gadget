import { useState } from "react";
import { products } from "../data/products";

type ProductPageProps = {
  onAddToCart: (productId: number) => void;
};

export function ProductPage({ onAddToCart }: ProductPageProps) {
  const [recentlyAdded, setRecentlyAdded] = useState<number[]>([]);
  const formatPrice = (price: number) => `Rs ${price.toLocaleString()}`;
  const handleAddToCart = (productId: number) => {
    onAddToCart(productId);
    setRecentlyAdded((current) => [...new Set([...current, productId])]);

    window.setTimeout(() => {
      setRecentlyAdded((current) => current.filter((id) => id !== productId));
    }, 900);
  };

  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="section-tag">Product Display Page</span>
        <h2>All products</h2>
        <p>
          Every product is shown in a single responsive grid, with a featured
          discount card for the latest offer.
        </p>
      </section>

      <section className="product-grid" aria-label="All products">
        {products.map((product) => (
          <article
            className={product.featured ? "product-card featured-card" : "product-card"}
            key={product.id}
          >
            <div className="product-image-wrap">
              <img src={product.image} alt={product.name} className="product-image" />
              {product.originalPrice ? (
                <div className="discount-badge" aria-label="Discount offer">
                  <strong>
                    {Math.round(
                      ((product.originalPrice - product.price) / product.originalPrice) * 100,
                    )}
                    % OFF
                  </strong>
                  <span>Save Rs {(product.originalPrice - product.price).toLocaleString()}</span>
                </div>
              ) : null}
            </div>
            <div className="product-content">
              <div className="product-meta">
                <span className="product-category">{product.category}</span>
                {product.featured ? <span className="featured-pill">Hot Deal</span> : null}
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="price-row">
                {product.originalPrice ? (
                  <span className="product-original-price">
                    {formatPrice(product.originalPrice)}
                  </span>
                ) : null}
                <span className="product-price">{formatPrice(product.price)}</span>
              </div>
              <div className="product-actions">
                <button
                  className={
                    recentlyAdded.includes(product.id)
                      ? "add-cart-button add-cart-button-success"
                      : "add-cart-button"
                  }
                  onClick={() => handleAddToCart(product.id)}
                >
                  {recentlyAdded.includes(product.id) ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
