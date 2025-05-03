import React, {useState, useEffect, useCallback} from 'react';
import "../styles/Pokemon.css";
import axios from 'axios';
import { PokemonFullData } from '../types/PokemonFullData';
import { useNavigate, useParams } from 'react-router-dom';
import back from '../assets/back.svg';
import star from '../assets/star.svg';

export function Pokemon() {
    const { id } = useParams<{ id: string }>();
    const [pokemonData, setPokemonData] = useState<PokemonFullData | null>(null);
    const [pokedexEntry, setPokedexEntry] = useState<string | null>(null);
    const [shiny, setShiny] = useState(false);
    const navigate = useNavigate();
    const typeColours = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    const getTypeColor = (type: keyof typeof typeColours) => {
        return {backgroundColor: typeColours[type] || '#FFF'};
    }

    const fetchPokemonFullData = useCallback(async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemonData(response.data);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    }, [id]);

    const getPokedexEntry = useCallback(async () => {
        if (pokemonData) {
            axios.get(pokemonData.species.url).then((response) => {
                const entries = response.data.flavor_text_entries;
                const englishEntry = entries.find(
                    (entry: { language: { name: string; }, version: {name: string} }) => entry.language.name === 'en' 
                    && entry.version.name === 'shield'
                );
                if (englishEntry) {
                    setPokedexEntry(englishEntry.flavor_text.replace(/[^a-zA-Z0-9.,' ]/g, ' ').replace(/\s+/g, ' ').trim());
                }
            })
        }
    }, [pokemonData]);

    useEffect(() => {
        if (id) {
            fetchPokemonFullData();
        }
        if (pokemonData) {
            getPokedexEntry();
        }
    }, [id, pokemonData, fetchPokemonFullData, getPokedexEntry]);

    return (
        <div className="pokemon-container">
            <header className='pokemon-header'>
                <button className="back-btn" onClick={() => navigate('/home')}>
                    <img src={back} alt='back icon' className='back-icon' height='20px'/> Return
                </button>
                <div className="pokemon-identification">
                    <div className="pokemon-types">
                        {pokemonData ? pokemonData.types.map((type, index) => (
                            <div key={index} className="pokemon-type" style={getTypeColor(type.type.name as keyof typeof typeColours)}>
                                {type.type.name.toUpperCase()}
                            </div>
                        )) : "Loading Types"}
                    </div>
                    <div className='pokemon-name'>{pokemonData ? '#'+pokemonData.id+' '+pokemonData.name.toUpperCase() 
                    : "Loading Data"}</div>
                </div>
            </header>
            <div className="pokemon-info">
                <div className="sprite-container">
                    <button className='shiny-button' onClick={() => shiny ? setShiny(false) : setShiny(true)}>
                        <img className='star-icon' src={star} alt='switch to shiny button'/> Shiny</button>
                    {pokemonData && pokemonData.sprites.other['official-artwork'].front_default ? (
                        <div className="pokemon-sprite">
                            <img className='sprite-img' src={shiny ? pokemonData.sprites.other['official-artwork'].front_shiny : 
                            pokemonData.sprites.other['official-artwork'].front_default} alt={`${pokemonData.name} sprite`} />
                        </div>
                    ) : (
                        <div className="loading-sprite">Loading...</div>
                    )}
                </div>
                <div className="pokedex-entry">
                    <h2>{pokedexEntry}</h2>
                </div>
            </div>
        </div>
    );
}