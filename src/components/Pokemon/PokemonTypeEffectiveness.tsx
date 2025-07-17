import React, { useState, useEffect, useContext, useCallback } from "react";
import { ColorUtils } from "../../utils/ColorUtils";
import { TypeDamageRelations } from "../../types/TypeDamageRelations";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import "../../styles/PokemonTypeEffectiveness.css";

export function PokemonTypeEffectiveness() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [damageRelations, setDamageRelations] = useState<TypeDamageRelations | null>(null);
    const { getTypeColor } = new ColorUtils();

    const getTypeEffectiveness = useCallback(async (types = pokemonFullData.types) => {
        try {
            const relations = await TypeDamageRelations.getDamageRelations(types);
            setDamageRelations(relations);
        } catch (error) {
            console.error("Error fetching damage relations:", error);
        }
    }, [pokemonFullData.types]);

    useEffect(() => {
        getTypeEffectiveness(pokemonFullData.types);
    }, [getTypeEffectiveness, pokemonFullData.types]);

    return (
        <div className="type-effectiveness">
            {damageRelations ? (
                <div className="lists-container">
                    Type Effectiveness
                    <hr />
                    <div className="weaknesses-list">
                        Weaknesses:
                        <div className="type-list">
                            {damageRelations.double_damage_from.map((type, slot) => (
                                <div key={slot} className="pokemon-type" style={getTypeColor(type.name as keyof ColorUtils['typeColors'])}>
                                    {type.name.toUpperCase()} <span className="multiplier" style={type.multiplier === "×½" || type.multiplier === "×¼" ? 
                                        {fontFamily: "Roboto, sans-serif"} : {}}>{type.multiplier}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="resistances-list">
                        Resistances:
                        <div className="type-list">
                            {damageRelations.half_damage_from.map((type, slot) => (
                                <div key={slot} className="pokemon-type" style={getTypeColor(type.name as keyof ColorUtils['typeColors'])}>
                                    {type.name.toUpperCase()} <span className="multiplier" style={type.multiplier === "×½" || type.multiplier === "×¼" ? 
                                        {fontFamily: "Roboto, sans-serif"} : {}}>{type.multiplier}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="immunities-list">
                        Immunities:
                        <div className="type-list">
                            {damageRelations.no_damage_from.length > 0 ? damageRelations.no_damage_from.map((type, slot) => (
                                <div key={slot} className="pokemon-type" style={getTypeColor(type.name as keyof ColorUtils['typeColors'])}>
                                    {type.name.toUpperCase()}
                                </div>
                            )) : 
                            <div className="no-immunity">
                                <p>None</p>
                            </div>}
                        </div>
                    </div>
                </div>
            ) : "Loading type effectiveness"}
        </div>
    );
}