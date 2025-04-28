import React, {useState, useEffect, useCallback} from 'react';
import "../styles/Pokemon.css";
import axios from 'axios';
import { PokemonFullData } from '../types/PokemonFullData.ts';
import { useNavigate, useParams } from 'react-router-dom';

export function Pokemon() {
    const { id } = useParams<{ id: string }>();
    const [pokemonData, setPokemonData] = useState<PokemonFullData | null>(null);
    const navigate = useNavigate();

    const fetchPokemonFullData = useCallback(async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemonData(response.data);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchPokemonFullData();
        }
    }, [id, fetchPokemonFullData]);

    return (
        <div className="pokemon-container">
            <div>{pokemonData ? pokemonData.name : "Loading Data"}</div>
            <button className="back-btn" onClick={() => navigate('/home')}>Back</button>
        </div>
    );
}