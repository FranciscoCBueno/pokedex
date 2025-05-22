export class PokemonFullData {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    forms: {
        name: string;
        url: string;
    }[];
    game_indices: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    held_items: {
        item: {
            name: string;
            url: string;
        };
        version_details: {
            rarity: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    location_area_encounters: string;
    moves: {
        move: {
            name: string;
            url: string;
        };
        version_group_details: {
            level_learned_at: number;
            move_learn_method: {
                name: string;
                url: string;
            };
            version_group: {
                name: string;
                url: string;
            };
        }[];
    }[];
    species: {
        name: string;
        url: string;
    }
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
                front_shiny: string;
            };
        };
    };
    cries: {
        latest: string;
        legacy: string;
    }
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.base_experience = 0;
        this.height = 0;
        this.is_default = false;
        this.order = 0;
        this.weight = 0;
        this.abilities = [];
        this.forms = [];
        this.game_indices = [];
        this.held_items = [];
        this.location_area_encounters = "";
        this.moves = [];
        this.species = { name: "", url: "" };
        this.sprites = { other: { 'official-artwork': { front_default: "", front_shiny: "" } } };
        this.cries = { latest: "", legacy: "" };
        this.stats = [];
        this.types = [];
    }
}