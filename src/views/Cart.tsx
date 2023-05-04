import { useContext } from "react";
import { UserContext } from "../UserContext";
import { ProductProps } from "../components/WebshopFunction";
import styled from "styled-components";

function Cart() {
  const { setUser, user } = useContext(UserContext);

  const removeItem = (product: ProductProps) => {
    if (user.name === "") {
      console.log("Användare inte inloggad");
      return;
    }

    const existingProductIndex = user.products.findIndex(
      (p) => p.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedProducts = [...user.products];
      const existingProduct = updatedProducts[existingProductIndex];
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        updatedProducts.splice(existingProductIndex, 1);
      }
      setUser({
        ...user,
        products: updatedProducts,
      });
    }
  };

  const clearCart = () => {
    if (user.name === "") {
      console.log("Användaren är inte inloggad");
      return;
    }

    setUser({
      ...user,
      products: [],
    });
  };

  return (
    <>
      {user.name ? <h1>{user.name}s Kundkorg </h1> : <h1>Kundkorg</h1>}
      <Button onClick={clearCart}>Töm kundkorg</Button>
      <ul>
        {user.products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} sek {product.quantity}st
            <Button
              className="button"
              onClick={() => removeItem({ ...product, image: "", user: "" })}
              type="button"
            >
              Ta bort
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}

const Button = styled.button`
  background-color: rgba(255, 236, 236, 1);
  box-shadow: none;
  font-size: 0.7rem;

  &:hover {
    background-color: rgba(255, 236, 236, 0.8);
    font-size: 0.8rem;
  }
`;

export default Cart;
