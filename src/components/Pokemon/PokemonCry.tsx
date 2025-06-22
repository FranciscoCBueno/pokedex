import React, { useContext } from "react";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import "../../styles/PokemonCry.css";

export function PokemonCry() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const cryUrl = pokemonFullData?.cries?.latest;
    const key = pokemonFullData?.name || pokemonFullData?.id || "audio";

    return (
        <div className="pokemon-cry">
            <div className="pokemon-cry-title">
                Hear cry:
            </div>
            {cryUrl ? (
                <audio controls key={key} className="pokemon-cry-audio">
                    <source src={cryUrl} />
                </audio>
            ) : (
                <span className="pokemon-cry-unavailable">No cry available.</span>
            )}
        </div>
    );  
}