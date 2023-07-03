import React, { useState } from "react";
import styled from "styled-components";

const AdminLogin: React.FC<{ onAdminLogin: () => void }> = ({
    onAdminLogin,
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username }),
            });

            if (response.ok) {
                const data = await response.json();
                onAdminLogin();
                console.log(data);
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            setError("Ett fel inträffade, försök igen.");
        }
    };

    return (
        <>
            <H1>admin</H1>
            <Container>
                <div>
                    <InnerContainer>
                        <form onSubmit={handleLogin}>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Button type="submit">Logga in</Button>
                        </form>
                    </InnerContainer>
                </div>
            </Container>
            {error && <p>{error}</p>}
        </>
    );
};

const Input = styled.input`
    font-size: 10px;
    width: auto;
    height: auto;
    padding: 10px;
    margin: 10px;
`;

const Button = styled.button`
    font-size: 9px;
    box-shadow: none;
    border-radius: 50px;
    background-color: rgba(255, 236, 236, 0.8);
    // display: flex;
    // align-items: center;
    // justify-content: center;
    &:hover {
        background-color: rgba(255, 236, 236, 0.8);
        font-size: 9.5px;
    }
`;

const H1 = styled.h1`
    font-size: 10px;
`;

const Container = styled.div`
    // align-items: start;
    // justify-content: start;

    flex-direction: column;

    display: flex;
    // flex-wrap: wrap;
    padding: 10px;
    margin: 10px;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export default AdminLogin;
