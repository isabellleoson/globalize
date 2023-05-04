import "./App.css";
import Root from "./Root";
import Webshop from "./views/Webshop";
import Cart from "./views/Cart";
import Home from "./views/Home";
import Booking from "./views/Booking";
import Menu from "./views/Menu";
import Coq from "./views/Coq";

import { createHashRouter, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import { useContext } from "react";

import { UserProvider } from "./components/UserProvider";
import { UserContext } from "./UserContext";

function App() {
  const { user } = useContext(UserContext);

  console.log(user);

  const router = createHashRouter([
    {
      children: [
        {
          element: <Home />,
          path: "/",
        },
        {
          element: <Menu />,
          path: "/menu",
        },
        {
          element: <Coq />,
          path: "/coq",
        },
        {
          element: <Webshop />,
          path: "/webshop/:user?",
        },
        {
          element: <Cart />,
          path: "/cart/:user?",
        },
        {
          element: <Booking />,
          path: "/book",
        },
      ],
      element: <Root />,
    },
  ]);

  return (
    <>
      <UserProvider>
        <div className="App">
          <RouterProvider router={router} />

          <main></main>
          <Footer />
        </div>
      </UserProvider>
    </>
  );
}

export default App;
