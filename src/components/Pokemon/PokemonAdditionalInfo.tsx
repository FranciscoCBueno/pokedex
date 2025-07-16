import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { PokemonSpeciesDataContext } from "../../context/PokemonSpeciesDataContext";
import "../../styles/PokemonAdditionalInfo.css";

export function PokemonAdditionalInfo() {
    const { pokemonSpeciesData } = useContext(PokemonSpeciesDataContext);
    const [shape, setShape] = useState("");
    const genus = pokemonSpeciesData?.genera?.find((genus) => genus.language.name === "en")?.genus;
    const shapeIconUrl = `https://res.cloudinary.com/dwuvbn1wd/image/upload/${pokemonSpeciesData?.shape?.name}.png`;

    useEffect(() => {
        const getShape = async () => {
            try {
                const response = await axios.get(pokemonSpeciesData.shape.url);
                const data = response.data;
                const shapeName = data.awesome_names.filter((name: { awesome_name: string, language: { name: string, url: string } }) =>
                    name.language.name === "en")[0]?.awesome_name;
                setShape(shapeName);
            } catch (error) {
                console.error("Error fetching shape data:", error);
            }
        }
        if (pokemonSpeciesData && pokemonSpeciesData.shape && pokemonSpeciesData.shape.url) {
            getShape();
        }
    }, [pokemonSpeciesData]);

    return (
        <div className="additional-info">
            Additional Info
            <hr />
            <div className="info-list">
                <div className="info-item">
                    Shape: {shape ? shape.charAt(0).toUpperCase() + shape.slice(1) : "Unknown"}
                    <img className="shape-icon" src={pokemonSpeciesData && pokemonSpeciesData.shape && pokemonSpeciesData.shape.name ? shapeIconUrl : "url"} alt="shape icon" />
                </div>
                <div className="info-item">
                    Genus: {genus ? genus.charAt(0).toUpperCase() + genus.slice(1) : "Unknown"}
                </div>
            </div>
        </div>
    );
}