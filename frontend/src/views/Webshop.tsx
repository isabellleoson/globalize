import WebshopFunction from "../components/WebshopFunction";
import { useContext } from "react";
import { UserContext } from "../UserContext";

function Webshop() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Webbshop</h1>
      <WebshopFunction userName={user.name} />
    </div>
  );
}

export default Webshop;
