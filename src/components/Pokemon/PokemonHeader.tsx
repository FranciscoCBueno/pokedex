import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { ColorUtils } from "../../utils/ColorUtils";
import back from '../../assets/back.svg';

export function PokemonHeader() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const { getTypeColor } = new ColorUtils();
    const navigate = useNavigate();

    return (
        <div className="pokemon-header">
            <button className="back-btn" onClick={() => navigate('/home')}>
                    <img src={back} alt='back icon' className='back-icon' height='20px'/> Return
            </button>
            <div className="pokemon-identification">
                <div className="pokemon-types">
                    {pokemonFullData ? pokemonFullData.types.map((type, index) => (
                        <div key={index} className="pokemon-type" style={getTypeColor(type.type.name as keyof ColorUtils['typeColors'])}>
                            {type.type.name.toUpperCase()}
                        </div>
                    )) : "Loading Types"}
                </div>
                <div className='pokemon-name'>{pokemonFullData ? '#'+pokemonFullData.id+' '+pokemonFullData.name.toUpperCase() 
                : "Loading Data"}</div>
            </div>
        </div>
    );
}