import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = { username, password };

    try {
      const resp = await fetch("http://localhost:8080/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/plain"
        },
        body: JSON.stringify(data),
      });

      const msg = await resp.text();

      if (msg === "admin" || msg === "customer") {
        localStorage.setItem("username", username);
        navigate(`/${msg}`);
      } else {
        alert(msg);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Could not sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h4>Sign in</h4>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
