import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import AdminLogin from "./AdminLogin";

interface NavProps {
    isOpen?: boolean;
}

const AdminNavbar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const handleLogout = () => {
        onLogout();
    };
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
            <Nav>
                <Ul>
                    <li>
                        <Link
                            className="link"
                            to="/product"
                            onClick={handleLinkClick}
                        >
                            {" "}
                            Hantera webshop
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="link"
                            to="/webshop"
                            onClick={handleLinkClick}
                        >
                            Webbshop
                        </Link>
                    </li>
                </Ul>
                <Button onClick={handleLogout}>Logga ut admin</Button>
            </Nav>
        </>
    );
};

const Button = styled.button`
    font-size: 9px;
    box-shadow: none;
    background-color: rgba(255, 236, 236, 0.8);

    &:hover {
        background-color: rgba(255, 236, 236, 0.8);
        font-size: 9.5px;
    }
`;

const Ul = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    padding-right: 30px;
`;

const Nav = styled.nav<NavProps>`
    background-color: rgba(255, 236, 236, 0.9);
    margin: 0;
    display: flex;

    flex-direction: row;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    padding: 30px;
    //   z-index: 1;
`;

export default AdminNavbar;
