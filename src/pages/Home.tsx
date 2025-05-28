import "../styles/Home.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PokemonCard } from "../components/Home/PokemonCard";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import search from "../assets/search.svg";

export function Home() {
    const { pokemonList, setPokemonList, searchQuery, setSearchQuery, filters, setFilters } = useContext(PokemonContext);
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const debounce = (func: () => void, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(func, delay);
        };
    };

    useEffect(() => {
        const fetchPokemonData = async (currentOffset: number) => {
            if (isLoading) return;
            setIsLoading(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${currentOffset}&limit=20`);
                const results = response.data.results;
                const pokemonData = await Promise.all(
                    results.map(async (pokemon: {name: string, url: string}) => {
                        if (!/\/(\d{5,})\/$/.test(pokemon.url)) {
                            const pokedata = await axios.get(pokemon.url);
                            return pokedata.data;
                        }
                        return null;
                    })
                );
                const pokemonDataNotNull = pokemonData.filter(Boolean);
                setPokemonList(prevList => {
                const mergedList = [...prevList];
                pokemonDataNotNull.forEach(newPokemon => {
                    if (!mergedList.some(p => p.id === newPokemon.id)) {
                        mergedList.push(newPokemon);
                    }
                });
                return mergedList.sort((a, b) => a.id - b.id);
                });
                setOffset(currentOffset + 20);
                if (results.length < 20) setHasMore(false);
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (pokemonList.length === 0) {
            fetchPokemonData(0);
        }

        const checkScroll = () => {
            if (!hasMore || isLoading) return;
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.documentElement.scrollHeight - 1000;
            
            if (scrollPosition >= threshold) {
                fetchPokemonData(offset);
            }
        };

        const debouncedScroll = debounce(checkScroll, 100);
        window.addEventListener('scroll', debouncedScroll);
        
        return () => {
            window.removeEventListener('scroll', debouncedScroll);
        };
    }, [hasMore, isLoading, pokemonList.length, offset, setPokemonList, setHasMore]);

    return (
        <div className="home-container">
            <div className="search">
                <img className="search-icon" src={search} alt="search icon" />
                <input type="text" className="search-bar" name="search" placeholder="Look up by name or id"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
            <div className="card_list">
                {pokemonList.length > 0 ? (
                pokemonList.map((pokemon) => (<PokemonCard key={pokemon.id} pokemonData={pokemon} 
                onClick={() => navigate(`/pokemon/${pokemon.id}`)}/>))
                ) : (<p>Loading Pokedex...</p>)}
            </div>
        </div>
    );
}