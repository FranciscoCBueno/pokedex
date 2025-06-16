import { PokemonData } from "./PokemonData";
import axios from "axios";

type Chain = {
    evolution_details: {
        gender: number;
        held_item: {
            name: string;
            url: string;
        } | null;
        item: {
            name: string;
            url: string;
        } | null;
        known_move: {
            name: string;
            url: string;
        } | null;
        known_move_type: {
            name: string;
            url: string;
        } | null;
        location: {
            name: string;
            url: string;
        } | null;
        min_affection: number | null;
        min_beauty: number | null;
        min_happiness: number | null;
        min_level: number | null;
        needs_overworld_rain: boolean | null;
        party_species: {
            name: string;
            url: string;
        } | null;
        party_type: {
            name: string;
            url: string;
        } | null;
        relative_physical_stats: number | null;
        time_of_day: string | null;
        trade_species: {
            name: string;
            url: string;
        } | null;
        turn_upside_down: boolean | null;
    }[];
    evolves_to: Chain[];
    is_baby: boolean;
    species: {
        name: string;
        url: string;
    };
}

export class EvolutionChain {
    baby_trigger_item: {
        name: string;
        url: string;
    } | null;
    chain: Chain;
    id: number;

    constructor(data: EvolutionChain) {
        this.baby_trigger_item = data.baby_trigger_item ? data.baby_trigger_item: null;
        this.chain = data.chain;
        this.id = data.id;
    }

    static async getList(data: EvolutionChain): Promise<PokemonData[]> {
        const list: PokemonData[] = [];

        const selfRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.chain.species.name}`);
        list.push(selfRes.data);
    
        for (const evolution of data.chain.evolves_to) {
            const evolutionRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`);
            list.push(evolutionRes.data);
    
            if (evolution.evolves_to.length > 0) {
                const subEvolutions = await EvolutionChain.getList({
                    baby_trigger_item: null,
                    chain: evolution,
                    id: data.id
                });
                list.push(...subEvolutions);
            }
        }
    
        return list;
    }

    static async asPokemonData(data: EvolutionChain): Promise<PokemonData> {
        const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.chain.species.name}`);
        return pokemonData.data;
    }
}