import React from "react";
import "../styles/About.css";

export function About() {
    return (
        <div className="about-container">
            <div className="about-text-container">
                <h1 className="about-title">The Pokédex</h1>
                <p className="about-list-container">
                    This Pokédex application is built using React with TypeScript, in addition to:
                    <ul className="about-list">
                        <li><a href="https://pokeapi.co/">PokéAPI</a> for fetching Pokémon data</li>
                        <li><a href="https://lokeshdhakar.com/projects/color-thief/">Color Thief</a> for extracting dominant colors from Pokémon sprites</li>
                        <li><a href="https://cloudinary.com">Cloudinary</a> for storing images</li>
                    </ul>
                </p>
                <p className="about-text">
                    I developed this application to study React and web development in general, it is a fan project and is not affiliated with the official Pokémon brand.
                </p>
                <p className="about-text">
                    You can check the source code <a href="https://github.com/FranciscoCBueno/pokedex">here.</a>
                </p>
            </div>
        </div>
    );
}