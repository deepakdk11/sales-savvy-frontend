import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signin = () => {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username,
      password
    };

    try {
      const resp = await fetch('http://localhost:8080/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const msg = await resp.text();
      alert(msg);

      if (msg === "admin") {
        navigate('/admin');
      } else if (msg === "customer") {
        navigate('/customer'); 
      } else {
        alert(msg);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit data");
    }
  }

  return (
    <>
      <h4>Sign in below</h4>
        <form onSubmit={handleSubmit}>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />

          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          <button type="submit">SIGN IN</button>
        </form>
    </>
  );
};

export default Signin;
