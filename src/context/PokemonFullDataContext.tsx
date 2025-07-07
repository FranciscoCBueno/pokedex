import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
import { PokemonFullData } from "../types/PokemonFullData";

export const PokemonFullDataContext = createContext<{
    pokemonFullData: PokemonFullData;
    setPokemonFullData: Dispatch<SetStateAction<PokemonFullData>>;
}>({
    pokemonFullData: {} as PokemonFullData,
    setPokemonFullData: () => {}
});

export function PokemonFullDataProvider ({ children }: { children: ReactNode }) {
    const [pokemonFullData, setPokemonFullData] = useState<PokemonFullData>(new PokemonFullData());

    const value = {
        pokemonFullData,
        setPokemonFullData,
    };

    return (
        <PokemonFullDataContext.Provider value={value}>
            {children}
        </PokemonFullDataContext.Provider>
    );
};