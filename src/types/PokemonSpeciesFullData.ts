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
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: {
        name: string;
        url: string;
    };
    pokedex_numbers: {
        entry_number: number;
        pokedex: {
            name: string;
            url: string;
        };
    }[];
    egg_groups: {
        name: string;
        url: string;
    }[];
    color: {
        name: string;
        url: string;
    }
    shape: {
        name: string;
        url: string;
    };
    evolves_from_species: {
        name: string;
        url: string;
    };
    evolution_chain: {
        url: string;
    };
    habitat: {
        name: string;
        url: string;
    };
    generation: {
        name: string;
        url: string;
    };
    names: {
        name: string;
        language: {
            name: string;
            url: string;
        };
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
    form_descriptions: {
        description: string;
        language: {
            name: string;
            url: string;
        };
    }[];
    genera: {
        genus: string;
        language: {
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