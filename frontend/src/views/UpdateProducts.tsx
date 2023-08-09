import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

interface Product {
    _id: number;
    id: number;
    productName: string;
    price: number;
    description: string;
    image: string | File;
}

const UpdatedProducts: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        _id: 0,
        id: 0,
        productName: "",
        price: 0,
        description: "",
        image: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleInputChangeTextArea = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const [confirmationMessage, setConfirmationMessage] = useState<string>("");

    const [result, setResult] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api").then((response) => {
            setResult(response.data);
        });
    }, []);

    const [products, setProducts] = useState<Product[]>([]);

    console.log(products);
    const initialProductState: Product = {
        _id: 0,
        id: 0,
        productName: "",
        price: 0,
        description: "",
        image: "",
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("id", String(product.id));
            formData.append("productName", product.productName);
            formData.append("price", String(product.price));
            formData.append("description", product.description);
            formData.append("image", product.image);

            await axios.post("http://localhost:8080/api/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setConfirmationMessage("Produkten är tillagd!");
            console.log("Tillagd product", product.id, product._id);
            console.log("Produkten tillagd");
            setProducts((prevProducts) => [...prevProducts, product]);
            setProduct({
                ...initialProductState,
                image: "",
            });
            setProduct({
                _id: 0,
                id: 0,
                productName: "",
                price: 0,
                description: "",
                image: "",
            });

            const response = await axios.get("http://localhost:8080/api");
            setProducts(response.data);
            setResult(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async (productId: number) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/product/${productId}`
            );
            console.log("Raderad produkt ID:", productId);

            setResult((prevResult) =>
                prevResult.filter((product) => product._id !== productId)
            );
            console.log("Produkten raderad!");
        } catch (error) {
            console.error("Gick inte att radera produkten:", error);
        }
    };

    // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files.length > 0) {
    //         const file = event.target.files[0];
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             setProduct((prevProduct) => ({
    //                 ...prevProduct,
    //                 image: reader.result as string,
    //             }));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const formData = new FormData();

            formData.append("image", file);
            setProduct((prevProduct) => ({
                ...prevProduct,
                image: file,
                imageFormData: formData,
            }));
        }
    };

    return (
        <>
            <>
                <h1>Hantera produkter</h1>

                <ProductContainer>
                    <ul>
                        {result.map((product) => (
                            <Li key={product._id}>
                                {typeof product.image === "string" ? (
                                    <Img
                                        style={imgStyle}
                                        alt="product"
                                        src={product.image}
                                    />
                                ) : (
                                    <span>No image</span>
                                )}

                                <P>{product.productName}</P>
                                <P>{product.price}kr</P>
                                <P>{product.description}</P>

                                <EraseButton
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Radera
                                </EraseButton>
                            </Li>
                        ))}
                    </ul>
                </ProductContainer>
            </>
            <form
                encType="multipart/form-data"
                method="post"
                onSubmit={handleSubmit}
            >
                {confirmationMessage && <p>{confirmationMessage}</p>}
                <StyledAddProduct>
                    <h1>Lägg till ny produkt</h1>
                    <p>Rubrik:</p>

                    <StyledInput
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleInputChange}
                        placeholder="Produktnamn..."
                    />
                    <p>Pris:</p>
                    <StyledInput
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                    />
                    <p>Bild:</p>
                    <StyledInput
                        name="image"
                        type="file"
                        // onChange={handleImages}
                        onChange={handleImageChange}
                    />

                    {typeof product.image === "string" && (
                        <img src={product.image} alt="product" />
                    )}
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChangeTextArea}
                        placeholder="Produktbeskrivning..."
                    />
                    <StyledButton type="submit" value=" Lägg till ny produkt">
                        Lägg till ny produkt
                    </StyledButton>
                </StyledAddProduct>
            </form>
        </>
    );
};

const imgStyle = {
    width: "50px",

    margin: "5px",
    boxShadow: "1px 3px 5px rgba(75, 75, 75, 0.1)",
};

const Img = styled.img`
    position: absolute;
    top: 15%;
    left: 10%;
`;

const P = styled.p`
    margin-left: 15px;
`;

const Li = styled.li`
    box-shadow: 1px 3px 5px 2px rgba(76, 75, 75, 0.1);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    list-style: armenian;

    align-items: center;
    background-color: rgba(255, 145, 77, 0.8);
    border-radius: 20px;
    margin: 10px;
    padding: 20px;
    position: relative;
`;

const ProductContainer = styled.div`
    // box-shadow: 1px 3px 5px 2px rgba(76, 75, 75, 0.1);
    // display: flex;
    // flex-wrap: wrap;

    // position: relative;

    // align-items: center;
    // background-color: rgba(255, 145, 77, 0.8);
    // border-radius: 20px;
    // margin: 10px;
    // padding: 20px;
`;

const StyledAddProduct = styled.div`
    box-shadow: 1px 3px 5px 2px rgba(76, 75, 75, 0.1);
    display: wrap;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    background-color: rgba(255, 145, 77, 0.8);
    border-radius: 20px;
    margin: 10px;
    padding: 20px;
`;

const StyledInput = styled.input`
    flex: 1 1 200px;
    margin: 10px;
    // margin-right: 10px;
    // margin-bottom: 10px;
`;

const EraseButton = styled.button`
    // flex: 0 0 200px;
    width: auto;
    font-size: 10px;
    padding: 10px;
    margin: 15px;
    position: absolute;
    bottom: 0;
    right: 0;
`;

const StyledButton = styled.button`
    // flex: 0 0 200px;
    width: auto;
    margin: 10px;
    font-size: 13px;
`;
export default UpdatedProducts;
