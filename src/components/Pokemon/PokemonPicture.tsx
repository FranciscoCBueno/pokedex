import React, { useState } from "react";
import { useContext } from "react";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { ColorUtils } from "../../utils/ColorUtils";
import "../../styles/PokemonPicture.css";
import star from '../../assets/star.svg';

export function PokemonPicture() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const { getTypeColor } = new ColorUtils();
    const [shiny, setShiny] = useState(false);

    return (
        <div className="picture-container">
            <div className="header">
                <div className="pokemon-id">
                    {pokemonFullData ? `#${pokemonFullData.id}` : "Loading ID..."}
                </div>
                <button className='shiny-button' onClick={() => shiny ? setShiny(false) : setShiny(true)}>
                    <img className='star-icon' src={star} alt='switch to shiny button'/> Shiny
                </button>
            </div>
            {pokemonFullData && pokemonFullData.sprites.other['official-artwork'].front_default ? (
                <div className="pokemon-picture">
                    <img className='picture-img' src={shiny ? pokemonFullData.sprites.other['official-artwork'].front_shiny : 
                    pokemonFullData.sprites.other['official-artwork'].front_default} alt={`${pokemonFullData.name} sprite`} />
                </div>
            ) : (
                <div className="loading-sprite">Loading picture...</div>
            )}
            <div className="pokemon-identification">
                <div className="pokemon-name">
                    {pokemonFullData ? pokemonFullData.name.toUpperCase() : "Loading..."}
                </div>
                <div className="pokemon-types">
                    {pokemonFullData ? pokemonFullData.types.map((type, index) => (
                        <div key={index} className="pokemon-type" style={getTypeColor(type.type.name as keyof ColorUtils['typeColors'])}>
                            {type.type.name.toUpperCase()}
                        </div>
                    )) : "Loading Types"}
                </div>
            </div>
        </div>
    );
}