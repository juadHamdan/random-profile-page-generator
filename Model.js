class MainUserDetails{
    constructor(imageUrl, firstName, lastName, state, country, age, email){
        this.imageUrl = imageUrl
        this.firstName = firstName
        this.lastName = lastName
        this.state = state
        this.country = country
        this.age = age
        this.email = email
    }
}
class Friend{
    constructor(firstName, lastName){
        this.firstName = firstName
        this.lastName = lastName
    }
}

class FavoriteQuote{
    constructor(quote = "", author = "Kanye West"){
        this.author = author
        this.quote = quote
    }
}

class PokemonData{
    constructor(imageUrl = "", name = ""){
        this.imageUrl = imageUrl
        this.name = name
    }
}

class About{
    constructor(about){
        this.about = about
    }
}




function getAbout(){
    return apiManager.fetchAbout().then(data => {
        return new About(data[0])
    })
}

function getPokemonData(){
    return apiManager.fetchPokemonData().then(data => {
        return new PokemonData(data.sprites.front_default, apiManager.currentPokemonName)
    })
}

function getFavoriteQuoteData(){
    return apiManager.fetchKanyeQuote().then(data => {
        return new FavoriteQuote(data.quote)
    })
}

function getMainUserDetails(){    
    return apiManager.fetchUserData().then(data => {
        const userData = data.results[0]
        const imageUrl = userData.picture.large
        const firstName = userData.name.first
        const lastName = userData.name.last
        const state = userData.location.state
        const country = userData.location.country
        const age = userData.dob.age
        const email = userData.email
        return new MainUserDetails(imageUrl, firstName, lastName, state, country, age, email)
    })
}

function getFriend(){
    return apiManager.fetchUserData().then(data => {
        const userData = data.results[0]
        return new Friend(userData.name.first, userData.name.last)
    })
}
