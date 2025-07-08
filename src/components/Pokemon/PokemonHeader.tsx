import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonSpeciesDataContext } from "../../context/PokemonSpeciesDataContext";
import '../../styles/PokemonHeader.css';
import back from '../../assets/back.svg';

export function PokemonHeader() {
    const { pokemonSpeciesData } = useContext(PokemonSpeciesDataContext);
    const [pokedexEntry, setPokedexEntry] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if (pokemonSpeciesData && pokemonSpeciesData.flavor_text_entries) {
            const englishEntries = pokemonSpeciesData.flavor_text_entries.filter(
                (entry: { language: { name: string; } }) => entry.language.name === 'en'
            );
            if (englishEntries.length > 0) {
                const latestEntry = englishEntries[englishEntries.length - 1];
                setPokedexEntry(latestEntry.flavor_text.replace(/[^\p{L}\p{N}.,'’ ]/gu, ' ').replace(/\s+/g, ' ').trim());
            }
        }
    }, [pokemonSpeciesData]);

    return (
        <div className="pokemon-header">
            <button className="back-btn" onClick={() => navigate('/home')}>
                    <img src={back} alt='back icon' className='back-icon' height='20px'/> Return
            </button>
            <h2 className="pokedex-entry">
                {pokedexEntry}
            </h2>
        </div>
    );
}