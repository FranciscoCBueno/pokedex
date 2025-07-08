import React, { useContext } from "react";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { PokemonSpeciesDataContext } from "../../context/PokemonSpeciesDataContext";
import "../../styles/PokemonTraining.css";

export function PokemonTraining() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const { pokemonSpeciesData } = useContext(PokemonSpeciesDataContext);
    const baseHappiness = pokemonSpeciesData?.base_happiness || null;
    const captureRate = pokemonSpeciesData?.capture_rate || null;
    const growthRate = pokemonSpeciesData?.growth_rate?.name || null;

    return (
        <div className="pokemon-training">
           Training:
           <li className="base-experience">
                {pokemonFullData.base_experience ? `Base EXP: ${pokemonFullData.base_experience}` : "N/A"}
           </li>
            <li className="base-happiness">
                 {baseHappiness !== null ? `Base Happiness: ${baseHappiness}` : "N/A"}
            </li>
            <li className="capture-rate">
                {captureRate !== null ? `Capture Rate: ${captureRate}` : "N/A"}
            </li>
            <li className="growth-rate">
                {growthRate ? `Growth Rate: ${growthRate.split('-').join(' ')}` : "N/A"}
            </li>
        </div>
    );
}