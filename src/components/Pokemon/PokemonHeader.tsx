import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PokemonFullDataContext } from "../../context/PokemonFullDataContext";
import '../../styles/PokemonHeader.css';
import back from '../../assets/back.svg';

export function PokemonHeader() {
    const { pokemonFullData } = useContext(PokemonFullDataContext);
    const [pokedexEntry, setPokedexEntry] = useState<string | null>(null);
    const navigate = useNavigate();

    const getPokedexEntry = useCallback(() => {
        if (pokemonFullData && pokemonFullData.species && pokemonFullData.species.url) {
            axios.get(pokemonFullData.species.url).then((response) => {
                const entries = response.data.flavor_text_entries;
                const englishEntries = entries.filter(
                    (entry: { language: { name: string; } }) => entry.language.name === 'en'
                );
    
                if (englishEntries.length > 0) {
                    const latestEntry = englishEntries[englishEntries.length - 1];
                    setPokedexEntry(latestEntry.flavor_text.replace(/[^\p{L}\p{N}.,'’ ]/gu, ' ').replace(/\s+/g, ' ').trim());
                }
            })
        }
    }, [pokemonFullData]);

    useEffect(() => {
            if (pokemonFullData) {
                getPokedexEntry();
            }
    }, [pokemonFullData, getPokedexEntry]);

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