export interface PokemonData {
    id: number;
    name: string;
    types: [{
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }]
    sprites: {
        front_default: string;
        front_shiny: string;
    };
}