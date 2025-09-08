import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import pokedex from "../assets/pokedex-icon.svg";
import random from "../assets/random.svg";
import about from "../assets/about.svg";

export function Navbar() {
    const navigate = useNavigate();

    function randomId (max: number) {
        return Math.floor(Math.random() * max);
    }

    return (
        <div className="navbar-container">
            <button className="btn" id="home-btn" onClick={() => navigate("/home")}>
                <img src={pokedex} alt="Pokédex" className="btn-icon" style={{ height: "20px"}}/>
                Pokédex
            </button>
            <button className="btn" id="random-btn" onClick={() => navigate(`/pokemon/${randomId(1026)}`)}>
                <img src={random} alt="Random" className="btn-icon" style={{ height: "20px"}}/>
                Go to random Pokémon
            </button>
            <button className="btn" id="about-btn" onClick={() => navigate("/about")}>
                <img src={about} alt="About" className="btn-icon" style={{ height: "15px"}}/>
                About
            </button>
        </div>
    );
}