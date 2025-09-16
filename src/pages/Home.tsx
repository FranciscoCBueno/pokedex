import "../styles/Home.css";
import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import axios from "axios";
import { PokemonCard } from "../components/Home/PokemonCard";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import search from "../assets/search.svg";
import pokedex from "../assets/pokedex.png";
import alert from "../assets/alert.svg";
import filter from "../assets/filter.svg";

export function Home() {
    const { pokemonList, setPokemonList, searchQuery, setSearchQuery, filters, setFilters } = useContext(PokemonContext);
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [allNames, setAllNames] = useState<string[]>([]);
    const batchSize = 20;
    const [isLoading, setIsLoading] = useState(false);
    const [searchErrorMsg, setSearchErrorMsg] = useState("");
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const fetchPokemonBatch = useCallback(async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            const nextNames = allNames.slice(offset, offset + batchSize);
            const pokemonData = await Promise.all(
                nextNames.map(async (name: string) => {
                    try {
                        const pokeRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                        return pokeRes.data;
                    } catch {
                        return null;
                    }
                })
            );
            setPokemonList(prevList => [
                ...prevList,
                ...pokemonData.filter(Boolean)
            ]);
            setOffset(prev => prev + batchSize);
            setHasMore(offset + batchSize < allNames.length);
        } catch (error) {
            console.error("Error fetching batch:", error);
        } finally {
            setIsLoading(false);
        }
    }, [allNames, offset, hasMore, isLoading, setPokemonList]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setSearchErrorMsg("");
    };

    useEffect(() => {
        const fetchPokedex = async () => {
            setIsLoading(true);
            try {
                const pokedexId = filters.pokedexId || "1";
                const response = await axios.get(`https://pokeapi.co/api/v2/pokedex/${pokedexId}/`);
                const entries = response.data.pokemon_entries;
                const names = entries.map((entry: any) => entry.pokemon_species.name);
                setAllNames(names);
                setOffset(0);
                setHasMore(names.length > 0);
                setPokemonList([]);
            } catch (error) {
                console.error("Error fetching Pokédex:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPokedex();
    }, [filters.pokedexId, setPokemonList]);

    useEffect(() => {
        if (pokemonList.length === 0 && allNames.length > 0 && !isLoading) {
            fetchPokemonBatch();
        }
    }, [allNames, pokemonList.length, fetchPokemonBatch, isLoading]);

    useEffect(() => {
        if (!hasMore || searchQuery) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && hasMore) {
                    fetchPokemonBatch();
                }
            },
            { rootMargin: "200px" }
        );
        const currentSentinel = sentinelRef.current;
        if (currentSentinel) observer.observe(currentSentinel);
        return () => {
            if (currentSentinel) observer.unobserve(currentSentinel);
        };
    }, [hasMore, isLoading, fetchPokemonBatch, searchQuery]);

    return (
        <div className="home-container">
            <header className="header">
                <div className="header-text">
                    <div className="welcome-text">
                        <h1 className="title" id="welcome-title">Welcome to the Pokédex</h1>
                        <div className="paragraphs-container" id="welcome-paragraphs">
                            <hr />
                            <p>Click on any Pokémon card on the list to see more about it</p>
                            <p>See the complete list or search for a specific one</p>
                            <p>Use the filter to personalize the list</p>
                            <p>This is not an official Pokémon product</p>
                            <p>Enjoy your stay! :)</p>
                        </div>
                    </div>
                </div>
                <img src={pokedex} alt="pokedex" className="pokedex-image" />
            </header>
            <div className="search">
                <img className="search-icon" src={search} alt="search icon" />
                <input type="text" className="search-bar" name="search" placeholder="Look up by name or id" 
                value={searchQuery} onChange={handleSearch}/>
                <img className="filter-icon" src={filter} alt="filter icon" />
                <select name="filter" id="type-filter" className="filter" value={filters.type || "all"} 
                onChange={e => setFilters({ ...filters, type: e.target.value })}>
                    <option value="all">All Types</option>
                    <option value="normal">Normal</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="electric">Electric</option>
                    <option value="grass">Grass</option>
                    <option value="ice">Ice</option>
                    <option value="fighting">Fighting</option>
                    <option value="poison">Poison</option>
                    <option value="ground">Ground</option>
                    <option value="flying">Flying</option>
                    <option value="psychic">Psychic</option>
                    <option value="bug">Bug</option>
                    <option value="rock">Rock</option>
                    <option value="ghost">Ghost</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="steel">Steel</option>
                    <option value="fairy">Fairy</option>
                </select>
                <select name="generation-filter" id="generation-filter" className="filter" value={filters.pokedexId || "1"}
                onChange={e => setFilters({ ...filters, pokedexId: e.target.value })}>
                    <option value="1">National (All)</option>
                    <option value="2">Kanto (Red, Blue, Yellow, FireRed, LeafGreen)</option>
                    <option value="3">Johto (Gold, Silver, Crystal)</option>
                    <option value="4">Hoenn (Ruby, Sapphire, Emerald)</option>
                    <option value="5">Sinnoh (Diamond/Pearl)</option>
                    <option value="6">Sinnoh (Platinum)</option>
                    <option value="7">Johto (HeartGold/SoulSilver)</option>
                    <option value="8">Unova (Black/White)</option>
                    <option value="9">Unova (Black2/White2)</option>
                    <option value="12">Central Kalos (X/Y)</option>
                    <option value="13">Coastal Kalos (X/Y)</option>
                    <option value="14">Mountain Kalos (X/Y)</option>
                    <option value="15">Hoenn (Omega Ruby/Alpha Sapphire)</option>
                    <option value="16">Alola (Sun/Moon)</option>
                    <option value="21">Alola (Ultra Sun/Ultra Moon)</option>
                    <option value="27">Galar (Sword/Shield)</option>
                    <option value="31">Paldea (Scarlet/Violet)</option>
                </select>
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
                        .filter((pokemon) => {
                            const matchesSearch =
                                searchQuery === "" ||
                                pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                pokemon.id.toString() === searchQuery;
                            const selectedType = filters.type || "all";
                            const matchesType =
                                selectedType === "all" ||
                                pokemon.types.some((t: any) => t.type.name === selectedType);

                            return matchesSearch && matchesType;
                        })
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