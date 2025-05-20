export interface TypeDamageRelations {
    no_damage_from: {
        name: string;
        url?: string;
        multiplier: string;
    }[];
    half_damage_from: {
        name: string;
        url?: string;
        multiplier: string;
    }[];
    double_damage_from: {
        name: string;
        url?: string;
        multiplier: string;
    }[];
    no_damage_to: {
        name: string;
        url?: string;
        multiplier: string;
    }[];
    half_damage_to: {
        name: string;
        url?: string;
        multiplier: string;
    }[];
    double_damage_to: {
        name: string;
        url?: string;
        multiplier: string;
    }[];
}