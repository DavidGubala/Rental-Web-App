import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }
    
    async getJS(token){
        //Within Here we will first check the token against the user ID
        // That will let us know what permissions this current user has when viewing the page, like
        // editing, deleting.
        //Then we will get the user via url parameter and fill out the nececarry html spaces.
    }

    async getHtml() {
        console.log(this.params.id)
        return `
            <div id = 'carrier-account'>
            
            </div>
            <h1>Now Viewing a specific carrier</h1>
            <p>In this app view we will show information about a specific carrier</p>
            // Here I still need to construct the account page view.
        `;
    }

    
}