import React, { useContext } from "react";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { PokemonSpeciesDataContext } from "../../context/PokemonSpeciesDataContext";
import { ColorUtils } from "../../utils/ColorUtils";
import "../../styles/PokemonGenerations.css";

export function PokemonGenerations() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const { pokemonSpeciesData } = useContext(PokemonSpeciesDataContext);
    const { getGameColor } = new ColorUtils();

    return (
        <div className="pokemon-generations">
            Game Indices
            <hr />
            <div className="gen-introduced">
                Introduced in:
                {` Gen ${pokemonSpeciesData?.generation?.name.replace("generation-", "").toUpperCase()}`}
            </div>
            <div className="game-indices" style={pokemonFullData?.game_indices?.length ? {} : { display: "none" }}>
                {pokemonFullData?.game_indices?.map((gameIndex) => (
                    <div key={gameIndex.version.name} className="game-item" style={getGameColor(gameIndex.version.name as keyof ColorUtils['gameColors'])}>
                        {gameIndex.version.name.replace("-", " ").toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
}