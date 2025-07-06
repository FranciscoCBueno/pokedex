import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import "../../styles/PokemonTraining.css";

export function PokemonTraining() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [baseHappiness, setBaseHappiness] = useState<number | null>(null);
    const [captureRate, setCaptureRate] = useState<number | null>(null);
    const [growthRate, setGrowthRate] = useState<string | null>(null);

    const fetchPokemonTrainingData = useCallback(async () => {
        if (pokemonFullData && pokemonFullData.species && pokemonFullData.species.url) {
            try {
                const response = await axios.get(pokemonFullData.species.url);
                const data = response.data;
                setBaseHappiness(data.base_happiness);
                setCaptureRate(data.capture_rate);
                setGrowthRate(data.growth_rate.name);
            } catch (error) {
                console.error("Error fetching training data:", error);
            }
        }
    }, [pokemonFullData]);

    useEffect(() => {
        fetchPokemonTrainingData();
    }, [fetchPokemonTrainingData]);

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