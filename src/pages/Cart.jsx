import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Assuming '../utils/loadRzp' exists and exports the loadRazorpay function
import loadRazorpay from "../utils/loadRzp";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoad] = useState(true);
  const [error, setErr] = useState("");

  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  /* fetch cart */
  useEffect(() => {
    if (!username) {
      setLoad(false); // If no username, stop loading and show empty cart or redirect
      return;
    }
    (async () => {
      try {
        const r = await fetch(`http://localhost:8080/getCart/${username}`);
        if (!r.ok) {
          const errorDetail = await r.text();
          throw new Error(`Failed to fetch cart: ${errorDetail}`);
        }
        setItems(await r.json());
      } catch (e) {
        setErr(e.message);
        console.error("Cart fetch error:", e);
      } finally {
        setLoad(false);
      }
    })();
  }, [username]);

  const total = items.reduce((s, it) => s + it.product.price * it.quantity, 0);

  /* payment handler */
  async function payNow() {
    if (!items.length) {
      setErr("Your cart is empty. Please add items before proceeding to payment.");
      return;
    }

    // 1) load Razorpay SDK
    const ok = await loadRazorpay();
    if (!ok) {
      console.error("Razorpay SDK failed to load. Check your internet.");
      setErr("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    // 2) ask backend to create order
    try {
      const res = await fetch("http://localhost:8080/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, amount: total * 100 }) // amount in paise
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create Razorpay order: ${errorText}`);
      }
      const data = await res.json(); // { key, orderId, amount }

      // 3) open Razorpay checkout
      const rzp = new window.Razorpay({
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "Sales Savvy",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async (resp) => {
          /* 4) verify payment */
          try {
            const vr = await fetch("http://localhost:8080/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username,
                orderId: resp.razorpay_order_id,
                paymentId: resp.razorpay_payment_id,
                signature: resp.razorpay_signature
              })
            });
            if (!vr.ok) {
              const verificationError = await vr.text();
              throw new Error(`Payment verification failed: ${verificationError}`);
            }
            const orderId = await vr.text(); // we returned orderId
            navigate(`/order-summary/${orderId}`);
          } catch (verifyErr) {
            console.error("Payment verification error:", verifyErr);
            setErr(`Payment verification failed: ${verifyErr.message}`);
          }
        },
        prefill: {
          name: username,
          email: localStorage.getItem("email") || "",
        },
        theme: { color: "#3399cc" },
      });
      rzp.open();
    } catch (apiErr) {
      console.error("Payment initiation error:", apiErr);
      setErr(`Failed to initiate payment: ${apiErr.message}`);
    }
  }

  /* ---------- UI ---------- */
  return (
    <div>
      <h2>🛒 Your Cart</h2>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p>Your cart is empty.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.product.id}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.product.price.toFixed(2)}</td>
                  <td>₹{(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <button onClick={payNow}>
              Pay with Razorpay
            </button>
          </div>
        </>
      )}
    </div>
  );
}