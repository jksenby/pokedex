import "./SignUpPage.scss";

import { useAddAccountMutation, useGetAccountQuery } from "./accounts";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SignUpPage = () => {
  const [createAction] = useAddAccountMutation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const { data: accounts } = useGetAccountQuery();
  function sendData(e) {
    e.preventDefault();
    if (verify !== password) {
      alert("Passwords don't match");
      return;
    } else {
      if (accounts.some((item) => item.login === login)) {
        alert("Such login already exists");
        return;
      }
      if (password.length < 6) {
        alert("The password is too simple");
        return;
      }
      const item = {
        id: uuidv4(),
        login: login,
        password: password,
        pokemons: [],
      };
      createAction(item)
        .unwrap()
        .then(() => {})
        .then((error) => console.log(error));
      setLogin("");
      setPassword("");
      setVerify("");
    }
  }
  return (
    <main>
      <div className="authorization">
        <h3>Register</h3>
        <div className="registration-form">
          <form onSubmit={sendData}>
            <label htmlFor="Login">Login</label>
            <input
              type="text"
              onChange={(e) => setLogin(e.target.value)}
              value={login}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label htmlFor="verify">Verify Password</label>
            <input
              type="password"
              onChange={(e) => setVerify(e.target.value)}
              value={verify}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
