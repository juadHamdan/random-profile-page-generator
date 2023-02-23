class APIManager {
    constructor(){
        this.nextPokemonDataUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1"
        this.currentPokemonName = ""
    }

    fetchUserData() {
        return $.get('https://randomuser.me/api/')
    }
    fetchKanyeQuote() {
        return $.get('https://api.kanye.rest')
    }

    fetchPokemonData() {
        const nextPokemonDataUrl = localStorage["next_pokemon_data_url"] || this.nextPokemonDataUrl
        return $.get(nextPokemonDataUrl)
        .then(data => {
            localStorage.setItem('next_pokemon_data_url', data.next);
            const pokemonName = data.results[0].name
            this.currentPokemonName = pokemonName

            const pokemonImageUrl = data.results[0].url
            return $.get(pokemonImageUrl)
        })
    }
    fetchAbout() {
        return $.get('https://baconipsum.com/api/?type=all-meat&paras=1')
    }
}