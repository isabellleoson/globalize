import { useState } from "react";

import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";

import { Outlet } from "react-router-dom";

function Root() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    const handleAdminLogin = () => {
        setIsAdminLoggedIn(true);
    };
    const handleAdminLogout = () => {
        setIsAdminLoggedIn(false);
    };
    return (
        <div>
            <div>
                {isAdminLoggedIn ? (
                    <AdminNavbar onLogout={handleAdminLogout} />
                ) : (
                    <Navbar />
                )}
            </div>

            <Outlet />
            <Footer />
            <footer>
                {isAdminLoggedIn ? (
                    <p>Admin inloggad</p>
                ) : (
                    <AdminLogin onAdminLogin={handleAdminLogin} />
                )}
            </footer>
        </div>
    );
}

export default Root;
