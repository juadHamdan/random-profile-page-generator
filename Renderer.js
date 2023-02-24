class Renderer {
    handleBarHelper(sourceSelectorName, templateObject, selectorNameToAppend){
        const source = $(sourceSelectorName).html();
        const template = Handlebars.compile(source);
        let newHTML = template(templateObject);
        $(selectorNameToAppend).append(newHTML); 
    }

    renderEmail(email) {
        this.handleBarHelper('#email-template', email, '.email')
    }
    renderAbout(about) {
        this.handleBarHelper('#about-template', about, '.about')
    }
    renderMainUser(user) {
        this.handleBarHelper('#main-user-template', user, '.profile')
        this.renderEmail({email: user.email})
    }
    renderFriendsData(friendsData) {
        this.handleBarHelper('#friends-template', friendsData, '.friends')
    }
    hideFriends(){
        $('.friends-active').empty()

    }
    showFriends(){
        $('.friends-passive').empty()
    }
    renderFavoriteQuoteData(favoriteQuoteData){
        this.handleBarHelper('#quote-template', favoriteQuoteData, '.quote')
    }
    renderPokemonData(pokemonData){
        this.handleBarHelper('#pokemon-template', pokemonData, '.pokemon')
    }
}