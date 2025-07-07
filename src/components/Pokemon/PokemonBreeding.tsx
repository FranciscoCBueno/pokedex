import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import "../../styles/PokemonBreeding.css";

export function PokemonBreeding() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [eggGroups, setEggGroups] = useState<{name: string, url: string}[]>([]);
    const [genderRate, setGenderRate] = useState<number>(4);
    const [eggCycles, seteggCycles] = useState<number>(0);

    const fetchBreedingData = useCallback(async () => {
        try {
            const response = await axios.get(pokemonFullData.species.url);
            const data = response.data;
            setEggGroups(data.egg_groups);
            setGenderRate(data.gender_rate);
            seteggCycles(data.hatch_counter);
        } catch (error) {
            console.error("Error fetching breeding data:", error);
        }
    }, [pokemonFullData.species.url]);

    useEffect(() => {
        if (pokemonFullData && pokemonFullData.species && pokemonFullData.species.url) {
            fetchBreedingData();
        }
    }, [pokemonFullData, pokemonFullData.species, pokemonFullData.species.url, fetchBreedingData]);

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