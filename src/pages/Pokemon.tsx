import React, {useEffect, useCallback, useContext} from 'react';
import { useParams } from 'react-router-dom';
import "../styles/Pokemon.css";
import axios from 'axios';
import { PokemonFullDataContext } from '../context/PokemonFullDataContext';
import { PokemonSpeciesDataContext } from '../context/PokemonSpeciesDataContext';
import { PokemonHeader } from '../components/Pokemon/PokemonHeader';
import { PokemonPicture } from '../components/Pokemon/PokemonPicture';
import { PokemonStats } from '../components/Pokemon/PokemonStats';
import { PokemonTypeEffectiveness } from '../components/Pokemon/PokemonTypeEffectiveness';
import { PokemonAbilities } from '../components/Pokemon/PokemonAbilities';
import { PokemonTraining } from '../components/Pokemon/PokemonTraining';
import { PokemonBreeding } from '../components/Pokemon/PokemonBreeding';
import { PokemonAdditionalInfo } from '../components/Pokemon/PokemonAdditionalInfo';
import { PokemonGenerations } from '../components/Pokemon/PokemonGenerations';
import { PokemonEvolutionChain } from '../components/Pokemon/PokemonEvolutionChain';
import { PokemonCry } from '../components/Pokemon/PokemonCry';
import { PokemonMoveList } from '../components/Pokemon/PokemonMoveList';
import { PokemonLocationsList } from '../components/Pokemon/PokemonLocationsList';

export function Pokemon() {
    const { id } = useParams<{ id: string }>();
    const { setPokemonFullData } = useContext(PokemonFullDataContext);
    const { setPokemonSpeciesData } = useContext(PokemonSpeciesDataContext);

    const fetchPokemonFullData = useCallback(async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemonFullData(response.data);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    }, [id, setPokemonFullData]);

    const fetchPokemonSpeciesData = useCallback(async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            setPokemonSpeciesData(response.data);
        } catch (error) {
            console.error("Error fetching Pokemon species data:", error);
        }
    }, [id, setPokemonSpeciesData]);

    useEffect(() => {
        if (id) {
            fetchPokemonFullData();
        }
    }, [id, fetchPokemonFullData]);

    useEffect(() => {
        if (id) {
            fetchPokemonSpeciesData();
        }
    }, [id, fetchPokemonSpeciesData]);

    return (
        <div className="pokemon-container">
            <PokemonHeader/>
            <div className="pokemon-info">
                <PokemonPicture/>
                <PokemonEvolutionChain/>
                <div className="pokemon-details">
                    <PokemonStats/>
                    <div className="details-1">
                        <PokemonTraining/>
                        <PokemonAbilities/>
                    </div>
                    <div className="details-2">
                        <PokemonBreeding/>
                        <PokemonAdditionalInfo/>
                    </div>
                    <PokemonGenerations/>
                    <PokemonTypeEffectiveness/>
                    <PokemonCry/>
                </div>
            </div>
            <div className="lists">
                <PokemonMoveList/>
                <PokemonLocationsList/>
            </div>
        </div>
    );
}