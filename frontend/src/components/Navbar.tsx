import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import Modal from "react-modal";

import hamburgermenu from "../images/hamburgermenuimg.png";
import cartimg from "../images/cartimg.png";
import closeIcon from "../images/close.png";

import LoggoutButton from "./LoggoutButton";
import LoggIn from "./LoggIn";

interface NavProps {
    isOpen?: boolean;
}

function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        console.log("route", pathname);
    }, [pathname]);

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
            <div>
                <Container>
                    <StyledHamburger>
                        <Link to="/cart">
                            <img
                                src={cartimg}
                                alt="carticon"
                                className="cartimg"
                                style={{ cursor: "pointer" }}
                            />
                        </Link>

                        <img
                            src={hamburgermenu}
                            alt="meny"
                            className="hamburger"
                            onClick={toggleMenu}
                        />
                    </StyledHamburger>

                    <Nav isOpen={menuOpen}>
                        <StyledClosing>
                            <img
                                src={closeIcon}
                                alt="Close menu"
                                style={{
                                    width: "3%",
                                    height: "3%",
                                    cursor: "pointer",
                                }}
                                onClick={toggleMenu}
                            />
                        </StyledClosing>
                        <StyledUser>
                            {user.name ? (
                                <div>
                                    {user.name}

                                    <LoggoutButton />
                                </div>
                            ) : (
                                <div>
                                    <Button onClick={handleOpenModal}>
                                        Logga in
                                    </Button>
                                </div>
                            )}
                        </StyledUser>

                        <Ul>
                            <Li>
                                <Link
                                    className="link"
                                    to="/"
                                    onClick={handleLinkClick}
                                >
                                    Hem
                                </Link>
                            </Li>
                            <Li>
                                <Link
                                    className="link"
                                    to="/menu"
                                    onClick={handleLinkClick}
                                >
                                    Meny
                                </Link>
                            </Li>
                            <Li>
                                <Link
                                    className="link"
                                    to="/coq"
                                    onClick={handleLinkClick}
                                >
                                    COQ
                                </Link>
                            </Li>
                            <Li>
                                <Link
                                    className="link"
                                    to={`/webshop/${user.name}`}
                                    onClick={handleLinkClick}
                                >
                                    Webbshop
                                </Link>
                            </Li>

                            <Li>
                                <Link
                                    className="link"
                                    to={`/cart/${user.name}`}
                                    onClick={handleLinkClick}
                                >
                                    Kundkorg
                                </Link>
                            </Li>
                            <Li>
                                {" "}
                                <Link
                                    className="link"
                                    to="/book"
                                    onClick={handleLinkClick}
                                >
                                    Boka Catering
                                </Link>
                            </Li>
                        </Ul>
                    </Nav>
                </Container>
            </div>
        </>
    );
}

const Button = styled.button`
    font-size: 0.7rem;
    box-shadow: none;
    background-color: rgba(255, 236, 236, 0.8);

    &:hover {
        background-color: rgba(255, 236, 236, 0.8);
        font-size: 0.8rem;
    }
`;

const Li = styled.li`
    padding: 10px;
`;

const Container = styled.div`
    display: flex;
    justify-content: end;
`;
const StyledHamburger = styled.div`
    align-items: end;
    cursor: pointer;
    display: flex;
    justify-content: end;
    padding: 30px;
`;

const StyledClosing = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    padding-right: 30px;
    img {
        transition: transform 0.1s ease-in-out;
        &:hover {
            transform: scale(1.2);
        }
    }
`;

const StyledUser = styled.p`
    display: flex;
    flex-direction: row;
    align-items: start;
    padding-right: 30px;

    font-size: 20px;
    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Ul = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: black;
    padding-right: 30px;
`;

const Nav = styled.nav<NavProps>`
    background-color: rgba(255, 236, 236, 0.9);
    margin: 0;

    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 30px;
    //   z-index: 1;
`;

export default Navbar;
