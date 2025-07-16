export interface PokemonSpeciesData {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    generation: {
        name: string;
        url: string;
    };
    growth_rate: {
        name: string;
        url: string;
    };
    egg_groups: {
        name: string;
        url: string;
    }[];
    evolution_chain: {
        url: string;
    };
    shape: {
        name: string;
        url: string;
    };
    genera: {
        genus: string;
        language: {
            name: string;
            url: string;
        }
    }[];
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
        version: {
            name: string;
            url: string;
        };
    }[];
    varieties: {
        is_default: boolean;
        pokemon: {
            name: string;
            url: string;
        };
    }[];
}