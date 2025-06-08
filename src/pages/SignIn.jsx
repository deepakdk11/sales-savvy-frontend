import React from "react";

const Signin = () => {
  return (
    <>
      <div>
        <form>
          <div>
            <label htmlFor="username">username</label>
            <input type="text" id="username" name="username" required />
          </div>

          <div>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" required />
          </div>

          <button type="submit">SIGN IN</button>
        </form>
      </div>
    </>
  );
};

export default Signin;
