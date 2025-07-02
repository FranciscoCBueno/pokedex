import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import { ColorUtils } from "../../utils/ColorUtils";
import '../../styles/PokemonHeader.css';
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
        </div>
    );
}