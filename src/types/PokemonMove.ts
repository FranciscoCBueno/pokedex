export interface PokemonMove {
    accuracy: number | null;
    contest_combos: {
        normal: {
            use_after: string[];
            use_before: string[];
        } | null;
        super: {
            use_after: string[];
            use_before: string[];
        } | null;
    } | null;
    contest_effect: {
        url: string;
    } | null;
    contest_type: {
        name: string;
        url: string;
    } | null;
    damage_class: {
        name: string;
        url: string;
    } | null;
    effect_chance: number | null;
    effect_changes: {
        effect_entries: {
            effect: string;
            language: {
                name: string;
                url: string;
            } | null;
        }[];
        version_group: {
            name: string;
            url: string;
        };
    }[];
    effect_entries: {
        effect: string;
        language: {
            name: string;
            url: string;
        } | null;
        short_effect: string;
    }[];
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
            url: string;
        } | null;
        version: {
            name: string;
            url: string;
        } | null;
    }[];
    generation: {
        name: string;
        url: string;
    };
    id: number;
    learned_by_pokemon: {
        name: string;
        url: string;
    }[];
    machines: {
        machine: {
            url: string;
        };
        version_group: {
            name: string;
            url: string;
        };
    }[];
    meta: {
        ailment: {
            name: string;
            url: string;
        };
        category: {
            name: string;
            url: string;
        };
        min_hits: number | null;
        max_hits: number | null;
        min_turns: number | null;
        max_turns: number | null;
        drain: number | null;
        healing: number | null;
        crit_rate: number;
        ailment_chance: number | null;
        flinch_chance: number | null;
        stat_chance: number | null;
    };
    name: string;
    names: {
        name: string;
        language: {
            name: string;
            url: string;
        } | null;
    }[];
    past_values: {
        accuracy: number | null;
        effect_chance: number | null;
        power: number | null;
        pp: number | null;
        type: {
            name: string;
            url: string;
        };
        version_group: {
            name: string;
            url: string;
        };
    }[];
    power: number | null;
    pp: number;
    priority: number;
    stat_changes: {
        change: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    super_contest_effect: {
        url: string;
    } | null;
    target: {
        name: string;
        url: string;
    };
    type: {
        name: string;
        url: string;
    };
}