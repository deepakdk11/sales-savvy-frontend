import React, { useEffect, useState } from 'react';
import ProductCart from '../Components/productCart';
import { useNavigate } from 'react-router-dom';

const CustomerHome = () => {

  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/getAllProducts');

        if (!response.ok) throw new Error("Failed to fetch Products");

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddToCart = async (product, qty = 1) => {
    const username = localStorage.getItem("username");

    if (!username) {
      alert("Please sign in first");
      return;
    }

    try {
      const resp = await fetch('http://localhost:8080/addToCart', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          username,
          quantity: qty
        })
      });

      if (resp.ok) {
        alert(`Added "${product.name}" (x${qty}) to cart`);
      } else {
        alert("Could not add to cart");
      }

    } catch (err) {
      console.error(err);
      alert("Could not add to cart");
    }
  };

  const filtered = products.filter((p) => (p.name + p.description).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Welcome to Sales Savvy</h1>
      <h2>Available Products</h2>

       <button
          className="btn btn-primary go-to-cart"
          onClick={() => navigate("/cart")}
        >
          Go to Cart 🛒
        </button>

        <input
          className="shop-search"
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

        {!loading && !error && (
          filtered.length ? (
            <div className="products-grid">More actions
              {filtered.map((p) => (
                <ProductCart
                  key={p.id}
                  product={p}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">No products match your search.</p>
          )
        )}

    </div>
  );
};

export default CustomerHome;
