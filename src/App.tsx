import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ProductPage } from "./components/ProductPage";
import { CartPage } from "./components/CartPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { products } from "./data/products";

type Page = "home" | "products" | "cart" | "checkout";

type CartItem = {
  productId: number;
  quantity: number;
};

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartProducts = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [cartItems],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartProducts.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartProducts],
  );

  const addToCart = (productId: number) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === productId);
      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentItems, { productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, change: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
  };

  const handleOrderPlaced = () => {
    setCartItems([]);
    setPage("home");
  };

  return (
    <div className="app-shell">
      <div className="background-orb orb-left" />
      <div className="background-orb orb-right" />

      <Header currentPage={page} cartCount={cartCount} onNavigate={setPage} />

      {page === "home" ? (
        <HomePage onBrowseProducts={() => setPage("products")} />
      ) : page === "products" ? (
        <ProductPage onAddToCart={addToCart} />
      ) : page === "cart" ? (
        <CartPage
          items={cartProducts}
          subtotal={subtotal}
          onIncreaseQuantity={(productId) => updateQuantity(productId, 1)}
          onDecreaseQuantity={(productId) => updateQuantity(productId, -1)}
          onRemoveItem={removeFromCart}
          onContinueShopping={() => setPage("products")}
          onCheckout={() => setPage("checkout")}
        />
      ) : (
        <CheckoutPage
          items={cartProducts}
          subtotal={subtotal}
          onBackToCart={() => setPage("cart")}
          onOrderPlaced={handleOrderPlaced}
        />
      )}
    </div>
  );
}
