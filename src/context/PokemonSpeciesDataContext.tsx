import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
import { PokemonSpeciesData } from "../types/PokemonSpeciesData";

export const PokemonSpeciesDataContext = createContext<{
    pokemonSpeciesData: PokemonSpeciesData;
    setPokemonSpeciesData: Dispatch<SetStateAction<PokemonSpeciesData>>;
}>({
    pokemonSpeciesData: {} as PokemonSpeciesData,
    setPokemonSpeciesData: () => {}
});

export function PokemonSpeciesDataProvider({ children }: { children: ReactNode }) {
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState<PokemonSpeciesData>({} as PokemonSpeciesData);

    const value = {
        pokemonSpeciesData,
        setPokemonSpeciesData,
    };

    return (
        <PokemonSpeciesDataContext.Provider value={value}>
            {children}
        </PokemonSpeciesDataContext.Provider>
    );
}