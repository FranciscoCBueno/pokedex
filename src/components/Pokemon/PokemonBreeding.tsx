import React, { useContext } from "react";
import { PokemonSpeciesDataContext } from "../../context/PokemonSpeciesDataContext";
import { ColorUtils } from "../../utils/ColorUtils";
import "../../styles/PokemonBreeding.css";
import male from "../../assets/male.svg"
import female from "../../assets/female.svg";
import genderless from "../../assets/genderless.svg";

export function PokemonBreeding() {
    const { pokemonSpeciesData } = useContext(PokemonSpeciesDataContext);
    const eggGroups = pokemonSpeciesData?.egg_groups;
    const genderRate = pokemonSpeciesData?.gender_rate;
    const eggCycles = pokemonSpeciesData?.hatch_counter;
    const { getEggColor } = new ColorUtils();

    return (
        <div className="pokemon-breeding">
            Breeding
            <hr/>
            <div className="egg-groups">
                Egg Groups:
                <div className="egg-group-list">
                    {eggGroups ? eggGroups.map((group, index) => (
                        <span key={index} className="egg-group" style={getEggColor(group.name as keyof ColorUtils['eggGroupColors'])}>
                            {group.name.charAt(0).toUpperCase() + group.name.slice(1).split("-").join(" ")}
                        </span>
                    )) : " No egg groups available."}
                </div>
            </div>
            <div className="egg-cycles">
                Egg Cycles:
                {eggCycles > 0 ? ` ${eggCycles + 1}` : " No hatch counter available."}
            </div>
            {genderRate === -1 ? (
                <div className="genderless">
                    Genderless
                    <img src={genderless} alt="genderless-icon" className="genderless-icon" />
                </div>
            ) : (
                <div className="gender-rate">
                    Gender Rate:
                    <div className="genders">
                        <div className="male">
                            <img src={male} alt="male icon" className="male-icon"/>
                            <span>{(8-genderRate)/8*100}%</span>
                        </div>
                        <div className="female">
                            <img src={female} alt="female icon" className="female-icon"/>
                            <span>{(genderRate/8)*100}%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}