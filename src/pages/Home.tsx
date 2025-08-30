import "../styles/Home.css";
import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import axios from "axios";
import { PokemonCard } from "../components/Home/PokemonCard";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import search from "../assets/search.svg";
import pokedex from "../assets/pokedex.png";
import alert from "../assets/alert.svg";

export function Home() {
    const { pokemonList, setPokemonList, searchQuery, setSearchQuery } = useContext(PokemonContext);
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchErrorMsg, setSearchErrorMsg] = useState("");
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchPokemonData = useCallback(async (currentOffset: number) => {
        if (isLoading || !hasMore) return;
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
    }, [isLoading, hasMore, setPokemonList]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setSearchErrorMsg("");
    };

    useEffect(() => {
        if (pokemonList.length === 0) {
            fetchPokemonData(0);
        }
    });

    useEffect(() => {
        if (!hasMore || searchQuery) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && hasMore) {
                    fetchPokemonData(offset);
                }
            },
            { rootMargin: "200px" }
        );
        
        const currentSentinel = sentinelRef.current;
        if (currentSentinel) observer.observe(currentSentinel);
        
        return () => {
            if (currentSentinel) observer.unobserve(currentSentinel);
        };
    }, [hasMore, isLoading, offset, fetchPokemonData, searchQuery]);

    useEffect(() => {
        if (!searchQuery) return;

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            const found = pokemonList.some(
                (pokemon) =>
                    pokemon.name.toLowerCase() === searchQuery.toLowerCase() ||
                    pokemon.id.toString() === searchQuery
            );
            if (found) return;

            const fetchSearchedPokemon = async () => {
                try {
                    const response = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
                    );
                    const newPokemon = response.data;
                    setPokemonList((prevList) => {
                        if (prevList.some((p) => p.id === newPokemon.id)) return prevList;
                        return [...prevList, newPokemon].sort((a, b) => a.id - b.id);
                    });
                    setSearchErrorMsg("");
                } catch (error) {
                    setSearchErrorMsg("No Pokémon found with that name or ID.");
                }
            };
            fetchSearchedPokemon();
        }, 400);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [searchQuery, pokemonList, setPokemonList]);

    return (
        <div className="home-container">
            <header className="header">
                <div className="header-text">
                    <div className="welcome-text">
                        <h1 className="title" id="welcome-title">Welcome to the Pokédex</h1>
                        <div className="paragraphs-container" id="welcome-paragraphs">
                            <hr />
                            <p>Click on any card on the list to see more about that Pokémon</p>
                            <p>Check the list to see them all, or search for your favorite one</p>
                            <p>Use the filter to personalize the list</p>
                        </div>
                    </div>
                    <div className="about-text">
                        <h2 className="title" id="about-title">This is a fan project</h2>
                        <div className="paragraphs-container" id="about-paragraphs">
                            <hr />
                            <p>It is not affiliated with the official Pokémon brand</p>
                            <p>Made using <a href="https://react.dev/" className="link" id="react-link" target="_blank" rel="noreferrer">React</a> and <a 
                                href="https://pokeapi.co/" className="link" id="pokeapi-link" target="_blank" rel="noreferrer">PokéAPI</a></p>
                            <p>Check out the source code <a href="https://github.com/FranciscoCBueno/pokedex" 
                            className="link" id="github-link" target="_blank" rel="noreferrer">here</a></p>
                        </div>
                    </div>
                </div>
                <img src={pokedex} alt="pokedex" className="pokedex-image" />
            </header>
            <div className="search">
                <img className="search-icon" src={search} alt="search icon" />
                <input type="text" className="search-bar" name="search" placeholder="Look up by name or id" 
                value={searchQuery} onChange={handleSearch}/>
            </div>
            {((searchErrorMsg !== "") && (searchQuery !== "")) && (
                <div className="search-error">
                    <div className="search-error-text">
                        <img src={alert} alt="error alert icon" className="alert-icon"/>
                        {searchErrorMsg}
                    </div>
                    <p className="search-error-note">Note: PokéAPI does not support search by partial names.</p>
                </div>
            )}
            <div className="card_list">
                {pokemonList.length > 0 ? (
                    pokemonList
                        .filter((pokemon) =>
                            searchQuery === "" ||
                            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            pokemon.id.toString() === searchQuery
                        )
                        .map((pokemon) => (
                            <PokemonCard key={pokemon.id} pokemonData={pokemon} onClick={() => navigate(`/pokemon/${pokemon.id}`)}/>
                        ))
                ) : (<p>Loading Pokedex...</p>)}
                <div ref={sentinelRef} style={{ height: 1 }} />
            </div>
            {isLoading && <p className="loading-text">Loading more...</p>}
        </div>
    );
}