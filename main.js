const NUM_OF_FRIENDS = 6
const LOAD_PAGE_FROM_STORAGE_STR = "load_page_from_atorage"
const MAIN_USER_STR = "main_user"
const ABOUT_STR = "about"
const FAVORITE_QUOTE_DATA_STR = "favorite_quote_data"
const POKEMON_DATA_STR = "pokemon_data"
const FRIENDS_STR = "friends"

const apiManager = new APIManager()
const renderer = new Renderer()

class PageData{
    constructor(){
        this.mainUser = {}
        this.about = ""
        this.favoriteQuoteData = {}
        this.pokemonData = {}
        this.friends = []
    }
    
    loadNewPage(){
        getMainUser().then(mainUser => {
            this.mainUser = mainUser
            renderer.renderMainUser(mainUser)
        })
        getAbout().then(about => {
            this.about = renderer.renderAbout(about)
            renderer.renderAbout(about)
        })
        getFavoriteQuoteData().then(favoriteQuoteData => {
            this.favoriteQuoteData = favoriteQuoteData
            renderer.renderFavoriteQuoteData(favoriteQuoteData)
        })
        getPokemonData().then(pokemonData => {
            this.pokemonData = pokemonData
            renderer.renderPokemonData(pokemonData)
        })
        for(let i = 0; i < NUM_OF_FRIENDS; i++){
            getFriend().then(friend => {
                this.friends.push(friend)
                if(this.friends.length === NUM_OF_FRIENDS){
                    renderer.renderFriends(this.friends)
                }
            })
        }
    }

    loadPageDataFromStorage(){
        const mainUser = JSON.parse(localStorage.getItem(MAIN_USER_STR))
        renderer.renderMainUser(mainUser)
    
        const about = localStorage.getItem(ABOUT_STR)
        renderer.renderAbout(about)
    
        const favoriteQuoteData = JSON.parse(localStorage.getItem(FAVORITE_QUOTE_DATA_STR))
        renderer.renderFavoriteQuoteData(favoriteQuoteData)
    
        const pokemonData = JSON.parse(localStorage.getItem(POKEMON_DATA_STR))
        renderer.renderPokemonData(pokemonData)
    
        const friends = JSON.parse(localStorage.getItem(FRIENDS_STR))
        renderer.renderFriends(friends)
    }

    savePageDataToStorage(){
        localStorage.setItem(MAIN_USER_STR, JSON.stringify(this.mainUser))
        localStorage.setItem(ABOUT_STR, this.about)
        localStorage.setItem(FAVORITE_QUOTE_DATA_STR, JSON.stringify(this.favoriteQuoteData))
        localStorage.setItem(POKEMON_DATA_STR, JSON.stringify(this.pokemonData))
        localStorage.setItem(FRIENDS_STR, JSON.stringify(this.friends))
    }
}

const pageData = new PageData()

const loadPageFromStorage = JSON.parse(localStorage.getItem(LOAD_PAGE_FROM_STORAGE_STR))
loadPageFromStorage ? pageData.loadPageDataFromStorage() : pageData.loadNewPage()



function reloadPage(){
    location.reload();
}

function savePageData(){
    pageData.savePageDataToStorage()
}

function uploadPageData(){
    localStorage.setItem(LOAD_PAGE_FROM_STORAGE_STR, JSON.stringify(true))
    reloadPage()
}

function clearLocalStorage(){
    localStorage.clear()
}


/*
$(".some-thing").on("click", function () {
    let newDataPromise = apiManager.fetch()
    renderer.render(newDataPromise)
})
*/