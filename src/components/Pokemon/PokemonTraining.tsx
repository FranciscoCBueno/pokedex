import React, { useContext, useState, useEffect } from "react";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import "../../styles/PokemonTraining.css";

export function PokemonTraining() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [baseHappiness, setBaseHappiness] = useState<number | null>(null);
    const [captureRate, setCaptureRate] = useState<number | null>(null);

    const fetchPokemonTrainingData = async () => {
        if (pokemonFullData.species) {
            try {
                const response = await fetch(pokemonFullData.species.url);
                const data = await response.json();
                setBaseHappiness(data.base_happiness);
                setCaptureRate(data.capture_rate);
            } catch (error) {
                console.error("Error fetching training data:", error);
            }
        }
    }

    useEffect(() => {
        fetchPokemonTrainingData();
    }, [pokemonFullData.species]);

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
        </div>
    );
}