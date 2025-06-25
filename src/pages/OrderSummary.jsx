import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function OrderSummary() {
  const { orderId } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {

        const r = await fetch(`http://localhost:8080/order/summary/${orderId}`);


        if (!r.ok) {

          const errorText = await r.text();
          throw new Error(`Unable to fetch order: ${errorText}`);
        }
        const json = await r.json();


        if (json.error) {
          throw new Error(`Order not found: ${json.error}`);
        }
        setData(json);
      } catch (e) {
        setErr(e.message); 
        console.error("Error fetching order summary:", e);
      }
    })();
  }, [orderId]);


  if (err) return <p>{err}</p>;
  if (!data) return <p>Loading…</p>;


  return (
    <div>
      <h2>✅ Payment Successful!</h2>
      <p><b>Order&nbsp;ID:</b> {data.orderId}</p>
      <p><b>Status:</b> {data.status}</p>

      <h4>Items</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((it, idx) => (
            <tr key={idx}>
              <td>{it.name}</td>
              <td>{it.qty}</td>
              <td>₹{it.price.toFixed(2)}</td>
              <td>₹{(it.qty * it.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total Paid: ₹{data.total.toFixed(2)}</h3>

      <Link to="/">Continue Shopping</Link>
    </div>
  );
}
