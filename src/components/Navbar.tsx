import React from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="navbar-container">
            <div className="navigation">
                <button className="home-button" onClick={() => navigate("/home")}>
                    Home
                </button>
            </div>
        </div>
    );
}