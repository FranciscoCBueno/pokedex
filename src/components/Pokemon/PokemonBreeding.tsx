import React, { useContext } from "react";
import { PokemonSpeciesDataContext } from "../../context/PokemonSpeciesDataContext";
import "../../styles/PokemonBreeding.css";

export function PokemonBreeding() {
    const { pokemonSpeciesData } = useContext(PokemonSpeciesDataContext);
    const eggGroups = pokemonSpeciesData?.egg_groups;
    const genderRate = pokemonSpeciesData?.gender_rate;
    const eggCycles = pokemonSpeciesData?.hatch_counter;

    return (
        <div className="pokemon-breeding">
            Breeding:
            <li className="egg-groups">
                Egg Groups:
                {eggGroups ? eggGroups.map((group, index) => (
                    <span key={index} className="egg-group">
                        {" " + group.name.charAt(0).toUpperCase() + group.name.slice(1).split("-").join(" ") + (index < eggGroups.length - 1 ? ", " : "")}
                    </span>
                )) : " No egg groups available."}
            </li>
            <li>
                Gender Rate:
                {genderRate === -1 ? " Genderless" : ` ${(8-genderRate)/8*100}% Male, ${(genderRate/8)*100}% Female`}
            </li>
            <li>
                Egg Cycles:
                {eggCycles > 0 ? ` ${eggCycles + 1}` : " No hatch counter available."}
            </li>
        </div>
    );
}