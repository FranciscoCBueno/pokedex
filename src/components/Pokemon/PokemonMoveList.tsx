import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { PokemonMove } from "../../types/PokemonMove";
import { ColorUtils } from "../../utils/ColorUtils";
import "../../styles/PokemonMoveList.css";

export function PokemonMoveList() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [moves, setMoves] = useState<PokemonMove[]>([]);
    const [typeEffectiveness, setTypeEffectiveness] = useState<Record<string, any>>({});
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

    useEffect(() => {
        if (moves.length > 0) {
            const fetchTypeEffectiveness = async () => {
                const effectivenessPromises = moves.map(async (move) => {
                    try {
                        const response = await axios.get(move.type.url);
                        const damageRelations = response.data.damage_relations;
                        return {
                            name: move.name,
                            effectiveness: {
                                double_damage_to: damageRelations.double_damage_to.map((t: any) => t.name),
                                half_damage_to: damageRelations.half_damage_to.map((t: any) => t.name),
                                no_damage_to: damageRelations.no_damage_to.map((t: any) => t.name),
                            }
                        };
                    } catch {
                        return { name: move.name, effectiveness: null };
                    }
                });
                const results = await Promise.all(effectivenessPromises);
                const effectivenessMap: Record<string, any> = {};
                results.forEach(({ name, effectiveness }) => {
                    effectivenessMap[name] = effectiveness;
                });
                setTypeEffectiveness(effectivenessMap);
            };
            fetchTypeEffectiveness();
        }
    }, [moves]);

    return (
        <div className="pokemon-move-list">
            <h2 className="move-list-title">Moves</h2>
            <hr />
            <div className="move-list">
                {moves.map((move) => (
                    <div className="move-item" key={move.name}>
                        <span className="move-header">
                            <span className="move-name">{move.name.toUpperCase()}</span>
                            <span className="move-header-separator">-</span>
                            <span className="pokemon-type" style={getTypeColor(move.type.name as keyof ColorUtils['typeColors'])}>
                                {move.type.name.toUpperCase()}
                            </span>
                            <span className="move-header-separator">-</span>
                            <span className="move-damage-class">{move.damage_class ? 
                            move.damage_class.name.charAt(0).toUpperCase() + move.damage_class.name.slice(1) : "N/A"}</span>
                        </span>
                        <div className="sections">
                            <div className="section" id="section-1">
                                <span className="move-pp">PP: {move.pp}</span>
                                <span className="move-accuracy">Accuracy: {move.accuracy ? move.accuracy : "N/A"}</span>
                                <span className="move-power">Power: {move.power ? move.power : "N/A"}</span>
                            </div>
                            <div className="section" id="section-2">
                                <span className="move-type-effectiveness" id="double-damage-to">
                                    Double Damage To:
                                    {typeEffectiveness[move.name]?.double_damage_to?.length
                                        ? typeEffectiveness[move.name].double_damage_to.map((type: string, idx: number) => (
                                            <span key={type + idx} className="pokemon-type" style={getTypeColor(type as keyof ColorUtils['typeColors'])}>
                                                {type.toUpperCase()}
                                            </span>
                                        ))
                                        : <span className="move-stat-none">None</span>}
                                </span>
                                <span className="move-type-effectiveness" id="half-damage-to">
                                    Half Damage To:
                                    {typeEffectiveness[move.name]?.half_damage_to?.length
                                        ? typeEffectiveness[move.name].half_damage_to.map((type: string, idx: number) => (
                                            <span key={type + idx} className="pokemon-type" style={getTypeColor(type as keyof ColorUtils['typeColors'])}>
                                                {type.toUpperCase()}
                                            </span>
                                        ))
                                        : <span className="move-stat-none">None</span>}
                                </span>
                                <span className="move-type-effectiveness" id="no-damage-to">
                                    No Damage To:
                                    {typeEffectiveness[move.name]?.no_damage_to?.length
                                        ? typeEffectiveness[move.name].no_damage_to.map((type: string, idx: number) => (
                                            <span key={type + idx} className="pokemon-type" style={getTypeColor(type as keyof ColorUtils['typeColors'])}>
                                                {type.toUpperCase()}
                                            </span>
                                        ))
                                        : <span className="move-stat-none">None</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}