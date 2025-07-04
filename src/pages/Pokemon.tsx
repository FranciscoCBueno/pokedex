import React, {useEffect, useCallback, useContext} from 'react';
import { useParams } from 'react-router-dom';
import "../styles/Pokemon.css";
import axios from 'axios';
import { PokemonFullDataContext } from '../context/PokemonFullDataContext';
import { PokemonHeader } from '../components/Pokemon/PokemonHeader';
import { PokemonPicture } from '../components/Pokemon/PokemonPicture';
import { PokemonStats } from '../components/Pokemon/PokemonStats';
import { PokemonTypeEffectiveness } from '../components/Pokemon/PokemonTypeEffectiveness';
import { PokemonAbilities } from '../components/Pokemon/PokemonAbilities';
import { PokemonTraining } from '../components/Pokemon/PokemonTraining';
import { PokemonEvolutionChain } from '../components/Pokemon/PokemonEvolutionChain';
import { PokemonCry } from '../components/Pokemon/PokemonCry';

export function Pokemon() {
    const { id } = useParams<{ id: string }>();
    const { setPokemonFullData } = useContext(PokemonFullDataContext);

    const fetchPokemonFullData = useCallback(async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemonFullData(response.data);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    }, [id, setPokemonFullData]);

    useEffect(() => {
        if (id) {
            fetchPokemonFullData();
        }
    }, [id, fetchPokemonFullData]);

    return (
        <div className="pokemon-container">
            <PokemonHeader/>
            <div className="pokemon-info">
                <PokemonPicture/>
                <PokemonEvolutionChain/>
                <div className="pokemon-details">
                    <div className="stat-section">
                        <PokemonStats/>
                        <PokemonTypeEffectiveness/>
                        <PokemonAbilities/>
                        <PokemonTraining/>
                        <PokemonCry/>
                    </div>
                </div>
            </div>
        </div>
    );
}