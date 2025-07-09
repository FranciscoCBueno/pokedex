import React, { useContext } from "react";
import { PokemonSpeciesDataContext } from "../../context/PokemonSpeciesDataContext";
import "../../styles/PokemonAdditionalInfo.css";

export function PokemonAdditionalInfo() {
    const { pokemonSpeciesData } = useContext(PokemonSpeciesDataContext);
    const habitat = pokemonSpeciesData?.habitat?.name;
    const shape = pokemonSpeciesData?.shape?.name;
    const genus = pokemonSpeciesData?.genera?.find((genus) => genus.language.name === "en")?.genus;

    return (
        <div className="additional-info">
            Additional Info:
            <li>
                Habitat: {habitat ? habitat.charAt(0).toUpperCase() + habitat.slice(1) : "Unknown"}
            </li>
            <li>
                Shape: {shape ? shape.charAt(0).toUpperCase() + shape.slice(1) : "Unknown"}
            </li>
            <li>
                Genus: {genus ? genus.charAt(0).toUpperCase() + genus.slice(1) : "Unknown"}
            </li>
        </div>
    );
}