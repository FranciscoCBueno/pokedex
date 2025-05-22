export class ColorUtils {
    typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    }
    statColors = {
        hp: 'rgba(255, 0, 0, 0.5)',
        attack: 'rgba(0, 0, 255, 0.5)',
        defense: 'rgba(0, 128, 0, 0.5)',
        'special-attack': 'rgba(255, 165, 0, 0.5)',
        'special-defense': 'rgba(128, 0, 128, 0.5)',
        speed: 'rgba(255, 255, 0, 0.5)'
    }

    getTypeColor = (type: keyof typeof this.typeColors) => {
        return {backgroundColor: this.typeColors[type] || '#FFF'};
    }

    getStatColor = (stat: keyof typeof this.statColors) => {
        return {backgroundColor: this.statColors[stat] || '#FFF'};
    }
}