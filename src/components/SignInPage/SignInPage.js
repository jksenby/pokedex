import "./SignInPage.scss";

import { useState } from "react";
import { useGetAccountQuery } from "../SignUpPage/accounts";

const SignInPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { data: accounts } = useGetAccountQuery();
  function authorization(e) {
    e.preventDefault();
    let account = null;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].login === login) {
        if (accounts[i].password === password) {
          account = accounts[i];
        }
      }
    }
    if (!account) {
      alert("Login or password is incorrect");
      return;
    }
    localStorage.setItem("isSignedIn", "true");
    localStorage.setItem("id", account.id + "");
    window.location.href = "http://localhost:3000/pokedex";
  }
  return (
    <main>
      <div className="login">
        <h3>Login</h3>
        <div className="registration-form">
          <form onSubmit={authorization}>
            <label htmlFor="Login">Login</label>
            <input type="text" onChange={(e) => setLogin(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
