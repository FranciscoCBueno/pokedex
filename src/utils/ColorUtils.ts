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
    eggGroupColors = {
        monster: '#FFB6C1',
        water1: '#ADD8E6',
        water2: '#87CEFA',
        water3: '#4682B4',
        bug: '#98FB98',
        flying: '#FFD700',
        ground: '#FF6347',
        fairy: '#FF69B4',
        plant: '#32CD32',
        humanshape: '#FF4500',
        mineral: '#B0C4DE',
        amorphous: '#F0E68C',
        ditto: '#DDA0DD',
        dragon: '#8A2BE2',
        indeterminate: '#929292'
    }

    getTypeColor = (type: keyof typeof this.typeColors) => {
        return {backgroundColor: this.typeColors[type] || '#FFF'};
    }

    getStatColor = (stat: keyof typeof this.statColors) => {
        return {backgroundColor: this.statColors[stat] || '#FFF'};
    }

    getEggColor = (eggGroup: keyof typeof this.eggGroupColors) => {
        return {backgroundColor: this.eggGroupColors[eggGroup] || '#222'};
    }
}