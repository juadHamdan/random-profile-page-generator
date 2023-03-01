const NUM_OF_FRIENDS = 6
const LOAD_PAGE_FROM_STORAGE_STR = "load_page_from_atorage"
const MAIN_USER_STR = "main_user"
const ABOUT_STR = "about"
const FAVORITE_QUOTE_DATA_STR = "favorite_quote_data"
const POKEMON_DATA_STR = "pokemon_data"
const FRIENDS_STR = "friends"

const downloadPopupJqueryObject = $(".download-btn > .popup")
const uploadPopupJqueryObject = $(".upload-btn > .popup")
const clearPopupJqueryObject = $(".clear-btn > .popup")


const apiManager = new APIManager()
const renderer = new Renderer()

class Profile{
    constructor(){
        this.mainUserDetails = {}
        this.about = ""
        this.favoriteQuoteData = {}
        this.pokemonData = {}
        this.friendsData = {friends: [], showFriends: false}
    }
    
    loadNewPage(){
        getMainUserDetails().then(mainUserDetails => {
            this.mainUserDetails = mainUserDetails
            renderer.renderMainUserDetails(mainUserDetails)
        })
        getAbout().then(about => {
            this.about = about
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
                const friends = this.friendsData.friends
                friends.push(friend)
                if(friends.length === NUM_OF_FRIENDS){
                    renderer.renderFriendsData(this.friendsData)
                }
            })
        }
    }

    hideFriends(){
        renderer.hideFriends()
        renderer.renderFriendsData({friends: [], showFriends: false})
    }

    showFriends(){
        renderer.showFriends()
        renderer.renderFriendsData({friends: this.friendsData.friends, showFriends: true})
    }

    loadPageDataFromStorage(){
        const mainUser = JSON.parse(localStorage.getItem(MAIN_USER_STR))
        renderer.renderMainUser(mainUser)
    
        const about = JSON.parse(localStorage.getItem(ABOUT_STR))
        renderer.renderAbout(about)
    
        const favoriteQuoteData = JSON.parse(localStorage.getItem(FAVORITE_QUOTE_DATA_STR))
        renderer.renderFavoriteQuoteData(favoriteQuoteData)
    
        const pokemonData = JSON.parse(localStorage.getItem(POKEMON_DATA_STR))
        renderer.renderPokemonData(pokemonData)
    
        const friendsData = JSON.parse(localStorage.getItem(FRIENDS_STR))
        renderer.renderFriends(friendsData)
    }

    savePageDataToStorage(){
        localStorage.setItem(MAIN_USER_STR, JSON.stringify(this.mainUserDetails))
        localStorage.setItem(ABOUT_STR, JSON.stringify(this.about))
        localStorage.setItem(FAVORITE_QUOTE_DATA_STR, JSON.stringify(this.favoriteQuoteData))
        localStorage.setItem(POKEMON_DATA_STR, JSON.stringify(this.pokemonData))
        localStorage.setItem(FRIENDS_STR, JSON.stringify(this.friendsData))
    }
}

const pageData = new Profile()

const loadPageFromStorage = JSON.parse(localStorage.getItem(LOAD_PAGE_FROM_STORAGE_STR))
loadPageFromStorage ? pageData.loadPageDataFromStorage() : pageData.loadNewPage()



function loadNewPageData(){
    localStorage.setItem(LOAD_PAGE_FROM_STORAGE_STR, JSON.stringify(false))
    location.reload();
}

function showTimedPopup(jqueryObject, timer){
    jqueryObject.css('visibility', 'visible')

    setTimeout(() => {
        jqueryObject.css('visibility', 'hidden')
    }, timer)
}

function savePageDataToStorage(){
    pageData.savePageDataToStorage()
    localStorage.setItem("page-data-saved", JSON.stringify(true))

    showTimedMessage("Profile Page Saved", 2000)
}

function loadPageDataFromStorage(){
    if(!JSON.parse(localStorage.getItem("page-data-saved"))){
        showTimedMessage("Please Save Profile First", 3000)
        return
    }

    localStorage.setItem(LOAD_PAGE_FROM_STORAGE_STR, JSON.stringify(true))
    location.reload();
}

function clearLocalStorage(){
    localStorage.clear()
    showTimedMessage("Profile Page Deleted", 2000)
    localStorage.setItem("page-data-saved", JSON.stringify(false))
}


function hideFriends(){
    pageData.hideFriends()
}

function showFriends(){
    pageData.showFriends()
}





const alertJqueryObject = $('.alert-container')
const alertMessageJqueryObject = $('.alert')

const showTimedMessage = (message, timer) => {
    alertJqueryObject.css('visibility', 'visible')
    alertMessageJqueryObject.text(message)

    setTimeout(() => {
        alertJqueryObject.css('visibility', 'hidden')
    }, timer)
}
