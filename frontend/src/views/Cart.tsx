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
            (p) => p.id === product._id
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
            <ClearAllButton onClick={clearCart}>Töm kundkorg</ClearAllButton>
            <ul>
                {user.products.map((product) => (
                    <Li key={product._id}>
                        {product.productName} - {product.price} sek{" "}
                        {product.quantity}st
                        <Button
                            className="button"
                            onClick={() =>
                                removeItem({
                                    ...product,
                                    image: "",
                                    user: "",
                                    _id: 0,
                                    description: "",
                                })
                            }
                            type="button"
                        >
                            Ta bort
                        </Button>
                    </Li>
                ))}
            </ul>
            <OrderButton>Beställ</OrderButton>
        </>
    );
}

const Li = styled.li`
    text-align: start;
    border-bottom: 1px solid blue;
    max-width: 350px;
    margin-left: 12px;

    justify-content: space-between;
    // text-align: end;

    display: flex;
    flex-direction: row;
`;

const ClearAllButton = styled.button`
    background-color: rgba(255, 236, 236, 1);
    box-shadow: none;
    font-size: 0.8rem;
    border-radius: 30px;

    display: flex;

    align-items: end;
    justify-content: end;
    text-align: end;

    margin-left: 294px;

    &:hover {
        background-color: rgba(255, 236, 236, 0.8);
        color: grey;
        // font-size: 0.8rem;
    }
`;

const Button = styled.button`
    background-color: rgba(255, 236, 236, 1);
    box-shadow: none;
    font-size: 0.7rem;
    border-radius: 30px;

    &:hover {
        background-color: rgba(255, 236, 236, 0.8);
        color: grey;
        // font-size: 0.8rem;
    }
`;

const OrderButton = styled.button`
    border-radius: 30px;
    padding-left: 15px;
    padding-right: 15px;

    background-color: rgba(0, 74, 173, 0.5);
    color: white;

    margin-left: 250px;
    margin-top: 30px;

    &:hover {
        background-color: rgba(255, 145, 77, 0.4);
        color: black;
    }
`;

export default Cart;
