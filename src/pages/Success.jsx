import { useEffect } from "react";

const Success = () => {

    useEffect(() => {
    const username = localStorage.getItem("username");

    fetch(`http://localhost:8080/api/cart/clearCart/${username}`, {
        method: "DELETE"
    })
    .then(() => {
        console.log("Cart cleared!");
    })
    .catch((err) => console.error("Failed to clear cart", err));
}, []);


    return (
        <div>
            <h2>🎉 Payment Successful!</h2>
            <p>Thank you for your order.</p>
        </div>
    );
};

export default Success;
