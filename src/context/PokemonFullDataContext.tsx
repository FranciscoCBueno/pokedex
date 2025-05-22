import React, { createContext, useState } from "react";
import { PokemonFullData } from "../types/PokemonFullData";

export const PokemonFullDataContext = createContext<{
    pokemonFullData: PokemonFullData;
    setPokemonFullData: React.Dispatch<React.SetStateAction<PokemonFullData>>;
}>({
    pokemonFullData: {} as PokemonFullData,
    setPokemonFullData: () => {}
});

export const PokemonFullDataProvider = ({ children }: { children: React.ReactNode }) => {
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