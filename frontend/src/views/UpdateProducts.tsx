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

    // Add a new piece of state to hold the uploaded image
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("id", String(product.id));
            formData.append("productName", product.productName);
            formData.append("price", String(product.price));
            formData.append("description", product.description);
            // formData.append("image", product.image);

            if (uploadedImage) {
                formData.append("image", uploadedImage); // Append the uploaded image
            } else {
                formData.append("image", product.image); // Use existing image if no new image uploaded
            }

            await axios.post("http://localhost:8080/product", formData, {
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
            await axios.delete(`http://localhost:8080/product/${productId}`);
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

    // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files.length > 0) {
    //         const file = event.target.files[0];
    //         const formData = new FormData();

    //         formData.append("image", file);
    //         setProduct((prevProduct) => ({
    //             ...prevProduct,
    //             image: file,
    //             imageFormData: formData,
    //         }));
    //     }
    // };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setUploadedImage(file); // Set the uploaded image
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
                    <PAdd>Rubrik:</PAdd>

                    <StyledInput
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleInputChange}
                        placeholder="Produktnamn..."
                    />
                    <PAdd>Pris:</PAdd>
                    <StyledInput
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                    />

                    <PAdd>Bild:</PAdd>
                    <StyledInput
                        name="image"
                        type="file"
                        // onChange={handleImages}
                        onChange={handleImageChange}
                    />

                    {uploadedImage && (
                        <PreviewImg
                            src={URL.createObjectURL(uploadedImage)}
                            alt="Uploaded"
                        />
                    )}

                    {/* {typeof product.image === "string" && (
                        <img src={product.image} alt="bild saknas" />
                    )} */}
                    <Textarea
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

const PreviewImg = styled.img`
    max-width: 70px;
`;

const P = styled.p`
    margin-left: 15px;
`;

const PAdd = styled.p`
    margin-bottom: 1px;
    font-size: 14px;
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
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    // justify-content: space-between;
    align-items: center;

    background-color: rgba(255, 145, 77, 0.8);
    border-radius: 20px;
    margin: 50px;
    padding: 20px;
`;

const StyledInput = styled.input`
    flex: 1 1 200px;
    margin-bottom: 10px;
    max-width: 200px;
    max-height: 40px;
    padding: 10px;
    font-size: 12px;
    // margin-right: 10px;
    // margin-bottom: 10px;
`;

const Textarea = styled.textarea`
    font-size: 12px;
    width: 200px;
    margin-top: 10px;
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
    border-radius: 30px;
`;

const StyledButton = styled.button`
    // flex: 0 0 200px;
    width: auto;
    margin: 10px;
    font-size: 13px;
    border-radius: 30px;
`;
export default UpdatedProducts;
