import React, { useState } from "react";

const Signup = () => {

  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [dob, setdob] = useState();
  const [role, setRole] = useState();


  return (
    <>
      <div>
        <form>
          <div>
            <label htmlFor="username">username</label>
            <input type="text" id="username" name="username" required />
          </div>

          <div>
            <label htmlFor="email">email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div>
            <label>gender</label>
            <input type="radio" id="genderM" name="gender" value="M" />
            <label htmlFor="genderM">M</label>

            <input type="radio" id="genderF" name="gender" value="F" />
            <label htmlFor="genderF">F</label>

            <input type="radio" id="genderO" name="gender" value="O" />
            <label htmlFor="genderO">O</label>
          </div>

          <div>
            <label htmlFor="dob">dob</label>
            <input type="date" id="dob" name="dob" />
          </div>

          <div>
            <label>role</label>
            <input type="radio" id="roleAdmin" name="role" value="ADMIN" />
            <label htmlFor="roleAdmin">ADMIN</label>

            <input
              type="radio"
              id="roleCustomer"
              name="role"
              value="CUSTOMER"
            />
            <label htmlFor="roleCustomer">CUSTOMER</label>
          </div>

          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
