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
           Training
           <hr />
           <div className="training-values" id="upper">
                <div className="training-item" id="base-experience">
                    <span>Base EXP:</span>
                    <br />
                    <span>{pokemonFullData.base_experience ?? "N/A"}</span>
                </div>
                <div className="training-item" id="capture-rate">
                    <span>Capture Rate:</span>
                    <br />
                    <span>{captureRate !== null ? captureRate : "N/A"}</span>
                </div>
            </div>
            <div className="training-values" id="lower">
                <div className="training-item" id="base-happiness">
                    <span>{baseHappiness !== null ? `Base Happiness: ${baseHappiness}` : "N/A"}</span>
                </div>
                <div className="training-item" id="growth-rate">
                    <span>{growthRate ? `Growth Rate: ${growthRate.split('-').join(' ')}` : "N/A"}</span>
                </div>
            </div>
        </div>
    );
}