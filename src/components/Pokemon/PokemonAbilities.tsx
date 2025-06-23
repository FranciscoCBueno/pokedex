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
            Abilities:
            <ul className="abilities-list">
                {pokemonFullData?.abilities?.map((ability: any, index: number) => (
                    <li key={index} className="ability-item">
                        <span className="ability-name">{formatAbilityName(ability.ability.name)}</span>
                        {ability.is_hidden && <span className="hidden-ability"> (Hidden)</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}