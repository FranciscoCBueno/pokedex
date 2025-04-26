import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PokemonCard } from "../components/PokemonCard.tsx";

interface PokemonData {
    id: number;
    name: string;
    types: [{
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }]
    sprites: {
        front_default: string;
        front_shiny: string;
    };
}

export interface PokemonList {
    PokemonData: PokemonData[];
}

export function Home() {
    const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);

    const fetchPokemonData = async () => {
        const tempPokemonData: PokemonData[] = [];
        for (let i = 1; i <= 151; i++) {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
                tempPokemonData.push(response.data);
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
            }
        }
        setPokemonList({ PokemonData: tempPokemonData });
    };

    useEffect(() => {
        fetchPokemonData();
    }, []);

    return (
        <div className="home-container">
            {pokemonList ? (<PokemonCard pokemonList={pokemonList} />) : (<p>Loading Pokedex...</p>)}
        </div>
    );
}