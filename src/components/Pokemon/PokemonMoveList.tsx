import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { PokemonMove } from "../../types/PokemonMove";
import { ColorUtils } from "../../utils/ColorUtils";
import "../../styles/PokemonMoveList.css";

export function PokemonMoveList() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [moves, setMoves] = useState<PokemonMove[]>([]);
    const { getTypeColor } = new ColorUtils();

    const getMoves = useCallback(async () => {
        try {
            const movePromises = pokemonFullData.moves.map((move) =>
                axios.get(move.move.url)
            );
            const moveResponses = await Promise.all(movePromises);
            const movesData = moveResponses.map((response) => response.data);
            setMoves(movesData);
        } catch (error) {
            console.error("Error fetching moves:", error);
        }
    }, [pokemonFullData.moves]);

    useEffect(() => {
        if (pokemonFullData && pokemonFullData.moves) {
            getMoves();
        }
    }, [pokemonFullData, pokemonFullData.moves, getMoves]);

    return (
        <div className="pokemon-move-list">
            <h2 className="move-list-title">Moves</h2>
            <div className="move-list">
                {moves.map((move) => (
                    <div className="move-item" key={move.name}>
                        <div className="section" id="section-1">
                            <span>{move.name.toUpperCase()}</span>
                            <div className="move-type">
                                <span className="pokemon-type" style={getTypeColor(move.type.name as keyof ColorUtils['typeColors'])}>
                                    {move.type.name.toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <div className="section" id="section-2">
                            <span className="move-pp">PP: {move.pp}</span>
                            <span className="move-accuracy">Accuracy: {move.accuracy ? move.accuracy : "N/A"}</span>
                        </div>
                        <div className="section" id="section-3">
                            <span className="move-power">Power: {move.power ? move.power : "N/A"}</span>
                            <span className="move-damage-class">Damage Class: {move.damage_class ? 
                                move.damage_class.name.charAt(0).toUpperCase() + move.damage_class.name.slice(1) : "N/A"}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}