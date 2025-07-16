import React, { useContext } from "react";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import "../../styles/PokemonAbilities.css";

export function PokemonAbilities() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);

    function formatAbilityName(name: string) {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div className="pokemon-abilities">
            Abilities
            <hr />
            <div className="abilities-list">
                {pokemonFullData?.abilities?.map((ability: any, index: number) => (
                    <div key={index} className="ability-item" id={ability.is_hidden ? "hidden-ability" : "normal-ability"}>
                        <span className="ability-name">{formatAbilityName(ability.ability.name)}</span>
                        {ability.is_hidden && <span className="hidden-ability"> (Hidden)</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}