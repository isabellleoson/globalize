import React, { useState } from "react";
import { UserContext, User, Product } from "../UserContext";

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : { name: "", products: [] };
  });

  const setName = (name: string) => {
    setUser((prevUser) => ({ ...prevUser, name }));
    localStorage.setItem("user", JSON.stringify({ ...user, name }));
  };

  const setProducts = (products: Product[]) => {
    setUser((prevUser) => ({ ...prevUser, products }));
    localStorage.setItem("user", JSON.stringify({ ...user, products }));
  };

  const removeProduct = (productId: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      products: prevUser.products.filter((product) => product.id !== productId),
    }));

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        products: user.products.filter((product) => product.id !== productId),
      })
    );
  };

  const loggOut = () => {
    setUser({ name: "", products: [] });
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, setName, setUser, setProducts, removeProduct, loggOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
