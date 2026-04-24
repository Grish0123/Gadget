type HeaderProps = {
  currentPage: "home" | "products" | "cart" | "checkout";
  cartCount: number;
  onNavigate: (page: "home" | "products" | "cart" | "checkout") => void;
};

export function Header({ currentPage, cartCount, onNavigate }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="brand-block">
        <span className="eyebrow">Static React Storefront</span>
        <h1>Gadget Nepal</h1>
      </div>

      <nav className="nav-links" aria-label="Primary">
        <button
          className={currentPage === "home" ? "nav-button active" : "nav-button"}
          onClick={() => onNavigate("home")}
        >
          Home
        </button>
        <button
          className={currentPage === "products" ? "nav-button active" : "nav-button"}
          onClick={() => onNavigate("products")}
        >
          Products
        </button>
        <button
          className={currentPage === "cart" ? "nav-button active" : "nav-button"}
          onClick={() => onNavigate("cart")}
        >
          Cart
          {cartCount > 0 ? <span className="cart-badge">{cartCount}</span> : null}
        </button>
      </nav>
    </header>
  );
}
