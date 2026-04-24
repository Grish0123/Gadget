import { useState, type FormEvent } from "react";
import type { Product } from "../data/products";

type CartProduct = Product & {
  quantity: number;
};

type CheckoutPageProps = {
  items: CartProduct[];
  subtotal: number;
  onBackToCart: () => void;
  onOrderPlaced: () => void;
};

type CheckoutForm = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  alternateContact: string;
  province: string;
  city: string;
  area: string;
  postalCode: string;
  landmark: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const provinces = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];

const initialForm: CheckoutForm = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  alternateContact: "",
  province: "",
  city: "",
  area: "",
  postalCode: "",
  landmark: "",
};

export function CheckoutPage({
  items,
  subtotal,
  onBackToCart,
  onOrderPlaced,
}: CheckoutPageProps) {
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const formatPrice = (price: number) => `Rs ${price.toLocaleString()}`;

  if (items.length === 0) {
    return (
      <main className="page-shell">
        <section className="empty-card checkout-empty">
          <h2>No items to checkout</h2>
          <p>Add something to your cart first, then return here to enter delivery details.</p>
          <button className="primary-button" onClick={onBackToCart}>
            Back to Cart
          </button>
        </section>
      </main>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    setSubmitMessage("Sending order details to Gmail...");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            ...form,
            country: "Nepal",
          },
          items: items.map((item) => ({
            name: item.name,
            category: item.category,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
          })),
          subtotal,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to send order email.");
      }

      setSubmitState("success");
      setSubmitMessage("Order email sent successfully.");
      onOrderPlaced();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send order email.";
      setSubmitState("error");
      setSubmitMessage(message);
    }
  };

  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="section-tag">Checkout</span>
        <h2>Delivery details</h2>
        <p>Complete the form below with contact and address details for delivery.</p>
      </section>

      <section className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>First Name</span>
            <input
              required
              value={form.firstName}
              onChange={(event) => setForm({ ...form, firstName: event.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Last Name</span>
            <input
              required
              value={form.lastName}
              onChange={(event) => setForm({ ...form, lastName: event.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Email Address</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Contact Number</span>
            <input
              type="tel"
              required
              placeholder="Primary phone number"
              value={form.contactNumber}
              onChange={(event) => setForm({ ...form, contactNumber: event.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Alternate Contact</span>
            <input
              type="tel"
              placeholder="Optional backup number"
              value={form.alternateContact}
              onChange={(event) => setForm({ ...form, alternateContact: event.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Country</span>
            <input value="Nepal" readOnly disabled className="fixed-input" />
          </label>

          <label className="form-field">
            <span>Province / State</span>
            <input
              required
              list="province-options"
              placeholder="Start typing province"
              value={form.province}
              onChange={(event) => setForm({ ...form, province: event.target.value })}
            />
            <datalist id="province-options">
              {provinces.map((province) => (
                <option key={province} value={province} />
              ))}
            </datalist>
          </label>

          <label className="form-field">
            <span>City</span>
            <input
              required
              placeholder="City or municipality"
              value={form.city}
              onChange={(event) => setForm({ ...form, city: event.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Area / Street Address</span>
            <input
              required
              placeholder="Tole, ward, street, house number"
              value={form.area}
              onChange={(event) => setForm({ ...form, area: event.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Postal Code</span>
            <input
              placeholder="Optional postal code"
              value={form.postalCode}
              onChange={(event) => setForm({ ...form, postalCode: event.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Landmark</span>
            <input
              placeholder="Nearby landmark for easier delivery"
              value={form.landmark}
              onChange={(event) => setForm({ ...form, landmark: event.target.value })}
            />
          </label>

          {submitMessage ? (
            <div
              className={
                submitState === "error" ? "form-status form-status-error" : "form-status"
              }
            >
              {submitMessage}
            </div>
          ) : null}

          <div className="checkout-actions full-span">
            <button type="button" className="ghost-button" onClick={onBackToCart}>
              Back to Cart
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={submitState === "submitting"}
            >
              {submitState === "submitting" ? "Sending..." : "Place Order"}
            </button>
          </div>
        </form>

        <aside className="cart-summary">
          <span className="section-tag">Checkout Summary</span>
          <h3>{items.length} item(s)</h3>
          {items.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>
                {item.name} x {item.quantity}
              </span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </div>
          ))}
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </aside>
      </section>
    </main>
  );
}
