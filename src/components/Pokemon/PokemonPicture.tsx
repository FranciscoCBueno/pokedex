import React, { useState } from "react";
import { useContext } from "react";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import "../../styles/PokemonPicture.css";
import star from '../../assets/star.svg';

export function PokemonPicture() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [shiny, setShiny] = useState(false);

    return (
        <div className="picture-container">
            <button className='shiny-button' onClick={() => shiny ? setShiny(false) : setShiny(true)}>
                <img className='star-icon' src={star} alt='switch to shiny button'/> Shiny
            </button>
            {pokemonFullData && pokemonFullData.sprites.other['official-artwork'].front_default ? (
                <div className="pokemon-picture">
                    <img className='picture-img' src={shiny ? pokemonFullData.sprites.other['official-artwork'].front_shiny : 
                    pokemonFullData.sprites.other['official-artwork'].front_default} alt={`${pokemonFullData.name} sprite`} />
                </div>
            ) : (
                <div className="loading-sprite">Loading picture...</div>
            )}
        </div>
    );
}