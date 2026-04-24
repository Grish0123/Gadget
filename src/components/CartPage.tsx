import type { Product } from "../data/products";

type CartProduct = Product & {
  quantity: number;
};

type CartPageProps = {
  items: CartProduct[];
  subtotal: number;
  onIncreaseQuantity: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
  onRemoveItem: (productId: number) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
};

export function CartPage({
  items,
  subtotal,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onContinueShopping,
  onCheckout,
}: CartPageProps) {
  const formatPrice = (price: number) => `Rs ${price.toLocaleString()}`;

  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="section-tag">Your Cart</span>
        <h2>Review your selected items</h2>
        <p>Update quantities, remove products, and continue to checkout when ready.</p>
      </section>

      <section className="cart-layout">
        <div className="cart-list">
          {items.length === 0 ? (
            <div className="empty-card">
              <h3>Your cart is empty</h3>
              <p>Add products first, then come back here to complete your order.</p>
              <button className="primary-button" onClick={onContinueShopping}>
                Browse Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <article className="cart-item-card" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-content">
                  <div className="cart-item-top">
                    <div>
                      <span className="product-category">{item.category}</span>
                      <h3>{item.name}</h3>
                    </div>
                    <button className="remove-link" onClick={() => onRemoveItem(item.id)}>
                      Remove
                    </button>
                  </div>
                  <p>{item.description}</p>
                  <div className="cart-item-footer">
                    <div className="quantity-control">
                      <button type="button" onClick={() => onDecreaseQuantity(item.id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => onIncreaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="cart-summary">
          <span className="section-tag">Summary</span>
          <h3>Order total</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <strong>Calculated at checkout</strong>
          </div>
          <button className="primary-button" onClick={onCheckout} disabled={items.length === 0}>
            Proceed to Checkout
          </button>
          <button className="ghost-button full-width" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </aside>
      </section>
    </main>
  );
}
