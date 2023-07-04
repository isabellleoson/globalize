import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";
import LoggIn from "./LoggIn";

export interface ProductProps {
    price: number;
    id: number;
    _id: number;
    productName: string;
    image: string;
    user: string;
    // name: string;
    quantity: number;
}

interface Props {
    userName: string;
}

const H2 = styled.h2`
    padding-left: 30px;
`;

const StyledAddedMessage = styled.p`
    padding-top: 30px;
`;

const Button = styled.button`
    border-radius: 100px;
    height: 70px;
    width: 70px;
`;

const StyledProductContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
`;

const StyledProductCards = styled.ul`
    display: grid;
    padding: 20px;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas: " . ";
    list-style: none;
    margin: 0;
    padding: 0;

    @media (min-width: 375px) {
        grid-template-areas: " .";
    }

    @media (min-width: 650px) {
        grid-template-areas: " . . ";
    }

    @media (min-width: 1000px) {
        grid-template-areas: " . . .";
    }
`;

const Li = styled.li`
    align-items: center;
    box-shadow: 1px 3px 5px 2px rgba(76, 75, 75, 0.1);

    flex-direction: column;

    background-color: rgba(255, 145, 77, 0.8);
    border-radius: 20px;
    margin: 10px;
    padding: 20px;
    width: 300px;
`;

const StyledCartButton = styled.div`
    margin: 15px;
`;

const imgStyle = {
    width: "200px",
    padding: "2px",
    boxShadow: "1px 3px 5px rgba(75, 75, 75, 0.1)",
};

function WebshopFunction(props: Props) {
    const [result, setResult] = useState<ProductProps[]>([]);
    const { user, setUser } = useContext(UserContext);
    const [quantity, setQuantity] = useState(1);

    const [isModalOpen, setModalOpen] = useState(false);
    const [addedMessage, setAddedMessage] = useState("");

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

    useEffect(() => {
        axios
            .get("http://localhost:8080/api")
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [result]);

    const addToCart = (product: ProductProps, quantity: number) => {
        if (user.name === "") {
            handleOpenModal();
            console.log("Användare inte inloggad");
            //return för att den inte ska läggas till ändå
            return;
        }

        const existingProductIndex = user.products.findIndex(
            (p) => p.id === product._id
        );

        if (existingProductIndex !== -1) {
            const updatedProducts = [...user.products];
            updatedProducts[existingProductIndex] = {
                ...updatedProducts[existingProductIndex],
                quantity:
                    updatedProducts[existingProductIndex].quantity + quantity,
            };
            setUser({
                ...user,
                products: updatedProducts,
            });
        } else {
            setUser({
                ...user,
                products: [
                    ...user.products,
                    {
                        ...product,
                        quantity: quantity,
                    },
                ],
            });
        }

        console.log(
            "Tillagd produkt:",
            quantity,
            product.productName,
            product._id,
            product.price
        );
        setAddedMessage(
            `${quantity}st '${product.productName}' har lagts till i kundvagnen.`
        );
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                className="modalclass"
            >
                <LoggIn
                    onLogin={(username: string) => {
                        setUser({ name: username, products: [] });
                    }}
                    closeModal={handleCloseModal}
                />
            </Modal>

            {user.name ? (
                <div>
                    <H2>Välkommen, {user.name}!</H2>
                </div>
            ) : (
                <div>
                    <H2>Logga in för att shoppa!</H2>
                    <Button onClick={handleOpenModal}>Logga in</Button>
                </div>
            )}
            <StyledAddedMessage>{addedMessage}</StyledAddedMessage>

            {result && result.length > 0 && (
                <>
                    <StyledProductContainer>
                        <StyledProductCards>
                            <ul>
                                {result.map((product) => (
                                    <Li key={product._id}>
                                        <img
                                            style={imgStyle}
                                            alt="product"
                                            src={product.image}
                                        />
                                        <p>{product.productName}</p>
                                        <p>Pris: {product.price} sek</p>

                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(event) =>
                                                setQuantity(
                                                    Number(event.target.value)
                                                )
                                            }
                                        />
                                        <StyledCartButton>
                                            <button
                                                className="button"
                                                style={{ borderRadius: "20px" }}
                                                onClick={() => {
                                                    const quantityInput =
                                                        document.querySelector(
                                                            'input[type="number"]'
                                                        );
                                                    if (
                                                        quantityInput instanceof
                                                        HTMLInputElement
                                                    ) {
                                                        addToCart(
                                                            product,
                                                            Number(
                                                                quantityInput.value
                                                            )
                                                        );
                                                    }
                                                }}
                                                type="button"
                                            >
                                                Lägg i kundvagn
                                            </button>
                                        </StyledCartButton>
                                    </Li>
                                ))}
                            </ul>
                        </StyledProductCards>
                    </StyledProductContainer>
                </>
            )}
        </>
    );
}

export default WebshopFunction;
