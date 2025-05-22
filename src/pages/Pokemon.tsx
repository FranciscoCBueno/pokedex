import React, {useState, useEffect, useCallback, useContext} from 'react';
import { useParams } from 'react-router-dom';
import "../styles/Pokemon.css";
import axios from 'axios';
import { PokemonFullDataContext } from '../context/PokemonFullDataContext';
import { PokemonHeader } from '../components/Pokemon/PokemonHeader';
import { PokemonPicture } from '../components/Pokemon/PokemonPicture';
import { PokemonStats } from '../components/Pokemon/PokemonStats';
import { PokemonTypeEffectiveness } from '../components/Pokemon/PokemonTypeEffectiveness';

export function Pokemon() {
    const { id } = useParams<{ id: string }>();
    const { pokemonFullData, setPokemonFullData } = useContext(PokemonFullDataContext);
    const [pokedexEntry, setPokedexEntry] = useState<string | null>(null);

    const fetchPokemonFullData = useCallback(async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemonFullData(response.data);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    }, [id, setPokemonFullData]); 

    const getPokedexEntry = useCallback(() => {
        if (pokemonFullData && pokemonFullData.species && pokemonFullData.species.url) {
            axios.get(pokemonFullData.species.url).then((response) => {
                const entries = response.data.flavor_text_entries;
                const englishEntries = entries.filter(
                    (entry: { language: { name: string; } }) => entry.language.name === 'en'
                );
    
                if (englishEntries.length > 0) {
                    const latestEntry = englishEntries[englishEntries.length - 1];
                    setPokedexEntry(latestEntry.flavor_text.replace(/[^a-zA-Z0-9.,' ]/g, ' ').replace(/\s+/g, ' ').trim());
                }
            })
        }
    }, [pokemonFullData]);

    useEffect(() => {
        if (id) {
            fetchPokemonFullData();
        }
    }, [id, fetchPokemonFullData]);

    useEffect(() => {
        if (pokemonFullData) {
            getPokedexEntry();
        }
    }, [pokemonFullData, getPokedexEntry]);

    return (
        <div className="pokemon-container">
            <PokemonHeader/>
            <div className="pokemon-info">
                <PokemonPicture/>
                <div className="pokemon-details">
                    <h2 className="pokedex-entry">{pokedexEntry}</h2>
                    <PokemonStats/>
                    <PokemonTypeEffectiveness/>
                </div>
            </div>
        </div>
    );
}