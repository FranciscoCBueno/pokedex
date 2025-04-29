import "../styles/Home.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonData } from "../types/PokemonData";
import { useNavigate } from "react-router-dom";
import search from "../assets/search.svg";

export function Home() {
    const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPokemonData = useCallback(async () => {
        if (!hasMore || isLoading) return;
        setIsLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
        const results = response.data.results;
        try {
            const pokemonDataPromises = await Promise.all(
                results.map(async (pokemon: {name: string, url: string}) => {
                    if (!/\/(\d{5,})\/$/.test(pokemon.url)) {
                        const pokedata = await axios.get(pokemon.url);
                        return pokedata.data;
                    } else {
                        return null;
                    }
                })
            );
            const pokemonDataPromisesNoNull = pokemonDataPromises.filter((data) => data !== null);
            setPokemonList((prevList) => [...prevList, ...pokemonDataPromisesNoNull]);
            setOffset((prevOffset) => prevOffset + 20);
            if (pokemonDataPromises.length < 20) setHasMore(false);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [offset, hasMore, isLoading]);

    const debounce = (func: () => void, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(func, delay);
        };
    };

    useEffect(() => {
        fetchPokemonData();
    }, []);

    useEffect(() => {
        const checkScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.documentElement.scrollHeight - 2000;
            
            if (scrollPosition >= threshold && hasMore && !isLoading) {
                fetchPokemonData();
            }
        };

        const debouncedScroll = debounce(checkScroll, 100);
        window.addEventListener('scroll', debouncedScroll);
        
        return () => {
            window.removeEventListener('scroll', debouncedScroll);
        };
    }, [fetchPokemonData, hasMore, isLoading]);

    return (
        <div className="home-container">
            <img src={search} alt="search icon" />
            <input type="text" className="search-bar" name="search" placeholder="Look up by name or id"/>
            <div className="card_list">
                {pokemonList.length > 0 ? (
                pokemonList.map((pokemon) => (<PokemonCard key={pokemon.id} pokemonData={pokemon} onClick={() => navigate(`/pokemon/${pokemon.id}`)}/>))
                ) : (<p>Loading Pokedex...</p>)}
            </div>
        </div>
    );
}