import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { PokemonData } from '../types/PokemonData';

export const PokemonContext = createContext<{
    pokemonList: PokemonData[];
    setPokemonList: React.Dispatch<React.SetStateAction<PokemonData[]>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    filters: Record<string, any>;
    setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}>({
    pokemonList: [],
    setPokemonList: () => {},
    searchQuery: "",
    setSearchQuery: () => {},
    filters: {},
    setFilters: () => {},
});

export function PokemonProvider ({ children }: { children: ReactNode }) {
    const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const savedFilters = localStorage.getItem("filters");
        if (savedFilters) {
            setFilters(JSON.parse(savedFilters));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("filters", JSON.stringify(filters));
    }, [filters]);

    const value = {
        pokemonList,
        setPokemonList,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters
    }

    return (
        <PokemonContext.Provider value={value}>
            {children}
        </PokemonContext.Provider>
    );
}
