import { useGetAccountQuery } from "../SignUpPage/accounts";
import useRenderItems from "../../hooks/useRenderItems";

import "./Profile.scss";

const Profile = () => {
  const { data: accounts } = useGetAccountQuery();
  let account = null;
  if (
    localStorage.getItem("isSignedIn") &&
    localStorage.getItem("isSignedIn") === "true" &&
    accounts
  ) {
    accounts.forEach((item) => {
      if (item.id + "" === localStorage.getItem("id")) {
        account = item;
        return;
      }
    });
  }
  console.log(account);
  const pokeList = useRenderItems(account ? account.pokemons : null);
  return (
    <div className="wrapper">
      <div className="left">
        <div className="info">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="pfp"
          />
          <h3>{account ? account.login : null}</h3>
        </div>
      </div>
      <div className="right">{pokeList}</div>
    </div>
  );
};

export default Profile;
