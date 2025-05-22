import axios from "axios";
import { PokemonFullData } from "./PokemonFullData";

export class TypeDamageRelations {
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

    constructor(data: Partial<TypeDamageRelations> = {}) {
        this.no_damage_from = data.no_damage_from || [];
        this.half_damage_from = data.half_damage_from || [];
        this.double_damage_from = data.double_damage_from || [];
        this.no_damage_to = data.no_damage_to || [];
        this.half_damage_to = data.half_damage_to || [];
        this.double_damage_to = data.double_damage_to || [];
    }

    static getDamageRelations = async(types: PokemonFullData["types"]) => {
        const typeData = await Promise.all(types.map(t => axios.get(t.type.url).then(res => res.data.damage_relations)));
        const getTypeNames = (arr: { name: string }[]) => arr.map(t => t.name);
        const combined = {
            double_from: typeData.flatMap(d => getTypeNames(d.double_damage_from)),
            half_from: typeData.flatMap(d => getTypeNames(d.half_damage_from)),
            no_from: typeData.flatMap(d => getTypeNames(d.no_damage_from)),
            double_to: typeData.flatMap(d => getTypeNames(d.double_damage_to)),
            half_to: typeData.flatMap(d => getTypeNames(d.half_damage_to)),
            no_to: typeData.flatMap(d => getTypeNames(d.no_damage_to)),
        };

        const filtered = {
            double_from: combined.double_from.filter(t => !combined.no_from.includes(t)),
            half_from: combined.half_from.filter(t => !combined.no_from.includes(t)),
            double_to: combined.double_to.filter(t => !combined.no_to.includes(t)),
            half_to: combined.half_to.filter(t => !combined.no_to.includes(t)),
        };

        const countTypes = (arr: string[]) => arr.reduce((acc, t) => ({ ...acc, [t]: (acc[t] || 0) + 1 }), {} as Record<string, number>);
        const doubleFromCount = countTypes(filtered.double_from);
        const halfFromCount = countTypes(filtered.half_from);
        const doubleToCount = countTypes(filtered.double_to);
        const halfToCount = countTypes(filtered.half_to);

        const cancelOpposing = (damage: Record<string, number>, resist: Record<string, number>) => {
            const result = { ...damage };
            for (const t in resist) {
                if (result[t]) {
                    const min = Math.min(result[t], resist[t]);
                    result[t] -= min;
                    if (result[t] === 0) delete result[t];
                }
            }
            return result;
        };

        const finalDoubleFrom = cancelOpposing(doubleFromCount, halfFromCount);
        const finalHalfFrom = cancelOpposing(halfFromCount, doubleFromCount);
        const finalDoubleTo = cancelOpposing(doubleToCount, halfToCount);
        const finalHalfTo = cancelOpposing(halfToCount, doubleToCount);

        const createDamageList = (types: Record<string, number>, baseMultiplier: string, enhancedMultiplier: string) => 
            Object.entries(types)
                .filter(([_, count]) => count > 0)
                .map(([name]) => ({
                    name,
                    multiplier: types[name] >= 2 ? enhancedMultiplier : baseMultiplier
                }));
        
        return new TypeDamageRelations({
            double_damage_from: createDamageList(finalDoubleFrom, 'x2', 'x4'),
            half_damage_from: createDamageList(finalHalfFrom, '×½', '×¼'),
            no_damage_from: [...new Set(combined.no_from)].map(name => ({ name, multiplier: 'x0' })),
            double_damage_to: createDamageList(finalDoubleTo, 'x2', 'x4'),
            half_damage_to: createDamageList(finalHalfTo, '×½', '×¼'),
            no_damage_to: [...new Set(combined.no_to)].map(name => ({ name, multiplier: 'x0' })),
        });
    }
}