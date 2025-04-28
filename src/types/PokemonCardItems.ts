import { PokemonData } from "./PokemonData";

export interface PokemonCardItems {
    pokemonData: PokemonData;
    onClick?: () => void | Promise<void>;
}