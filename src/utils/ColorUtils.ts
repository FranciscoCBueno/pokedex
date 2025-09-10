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
    gameColors = {
        red: '#FF4444',
        blue: '#4444FF',
        yellow: '#FFFF44',
        green: '#008000',
        silver: '#C0C0C0',
        gold: '#FFD700',
        crystal: '#22EEEE',
        ruby: '#FF2200',
        sapphire: '#1E90FF',
        emerald: '#50C878',
        firered: '#FF4500',
        leafgreen: '#228B22',
        diamond: '#07d0c9',
        pearl: '#E5E4E2',
        platinum: '#D3D3D3',
        heartgold: '#FFB500',
        soulsilver: '#C0C0D1',
        black: '#000000',
        white: '#FFFFFF',
        'black-2': '#000000',
        'white-2': '#FFFFFF',
        'omega-ruby': '#FF2255',
        'alpha-sapphire': '#1EB0FF',
        x : '#5500FF',
        y : '#990000',
        sun: '#FFA500',
        moon: '#8A2BE2',
        'ultra-sun': '#FF8500',
        'ultra-moon': '#8A2BA0',
        sword: '#C0C0C0',
        shield: '#707070',
        scarlet: '#FF6347',
        violet: '#8A2BE2',
        legends: '#00FF00',
        arceus: '#FF4500'
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

    getGameColor = (game: keyof typeof this.gameColors) => {
        if (this.gameColors[game] === "#000000") {
            return {backgroundColor: this.gameColors[game], color: '#FFF'};
        }
        if (this.gameColors[game] === "#FFFFFF") {
            return {backgroundColor: this.gameColors[game], border: '2px solid black'};
        }
        return {backgroundColor: this.gameColors[game] || '#FFF'};
    }
}