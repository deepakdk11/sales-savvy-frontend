import React, { useState } from 'react';

const ProductCart = ({ product, onAddToCart }) => {

  const [qty, setQty] = useState(1);

  if(!product) return null;

  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q => Math.max(1, q - 1)));

  return (
    <div>
     
        <img
          src={product.photo}
          alt={product.name}
          loading="lazy"
        />


        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <p>{product.description}</p>

        <div>
          <button onClick={dec} aria-label="decrease quantity">−</button>
          <span>{qty}</span>
          <button onClick={inc} aria-label="increase quantity">+</button>
        </div>

      <button onClick={() => onAddToCart(product, qty)}>
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCart;
