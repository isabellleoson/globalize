import { createContext } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface User {
  name: string;
  products: Product[];
}

export const UserContext = createContext<{
  user: User;
  setName: (name: string) => void;
  setUser: (user: User) => void;
  setProducts: (products: Product[]) => void;
  removeProduct: (productId: number) => void;
  loggOut: () => void;
}>({
  user: {
    name: "",
    products: [],
  },
  setName: () => {},
  setUser: () => {},
  setProducts: () => {},
  removeProduct: () => {},
  loggOut: () => {},
});
