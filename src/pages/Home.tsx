import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PokemonCard } from "../components/PokemonCard.tsx";
import { PokemonData } from "../types/PokemonData.ts";
import { useNavigate } from "react-router-dom";

export function Home() {
    const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
    const navigate = useNavigate();

    const fetchPokemonData = async () => {
        for (let i = 1; i <= 1025; i++) {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
                setPokemonList((prevList) => [...prevList, response.data]);
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
            }
        }
    };

    useEffect(() => {
        fetchPokemonData();
    }, []);

    return (
        <div className="home-container">
            <div className="card_list">
                {pokemonList.length > 0 ? (
                pokemonList.map((pokemon) => (<PokemonCard key={pokemon.id} pokemonData={pokemon} onClick={() => navigate(`/pokemon/${pokemon.id}`)}/>))
                ) : (<p>Loading Pokedex...</p>)}
            </div>
        </div>
    );
}