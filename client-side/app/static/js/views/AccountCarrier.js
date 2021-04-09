import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }
    
    async getJS(token){
        let viewingID = this.params.id
        console.log(token)

        //Authenticate User
        // if jwt is for this user id, render account settings, side nav and stuff
        // else just view profile
        
        RenderAccountView(this.params.id)
        //RenderProfileView(this.params.id)

        //Methods
        function RenderAccountSideNav(viewingID, selectedSideLink){
            //this will have a switch statement for sleected side link, will id selected
            switch(selectedSideLink){
                case 'settings':
                    $('#account-side-nav').html(`
                        <div class="side-link selected" id = 'settings'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/settings-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'license'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/license-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'rentals'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/rentals-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'loads'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/loads-icon.svg">
                            </a>
                        </div>
                    `)
                    break
                case 'license':
                    $('#account-side-nav').html(`
                        <div class="side-link" id = 'settings'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/settings-icon.svg">
                            </a>
                        </div>
                        <div class="side-link selected" id = 'license'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/license-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'rentals'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/rentals-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'loads'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/loads-icon.svg">
                            </a>
                        </div>
                    `)
                    break
                case 'rentals':
                    $('#account-side-nav').html(`
                        <div class="side-link" id = 'settings'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/settings-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'license'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/license-icon.svg">
                            </a>
                        </div>
                        <div class="side-link selected" id = 'rentals'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/rentals-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'loads'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/loads-icon.svg">
                            </a>
                        </div>
                    `)
                    break
                case 'loads':
                    $('#account-side-nav').html(`
                        <div class="side-link" id = 'settings'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/settings-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'license'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/license-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'rentals'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/rentals-icon.svg">
                            </a>
                        </div>
                        <div class="side-link selected" id = 'loads'>
                            <a>
                                <img id="-icon" src="/static/assets/account-carrier/icons/loads-icon.svg">
                            </a>
                        </div>
                    `)
                    break
            }
            
        }
        function RenderAccountSettings(viewingID){

        }
        function RenderLicenseSettings(viewingID){

        }
        function RenderRentalsSettings(viewingID){

        }
        function RenderLoadsSettings(viewingID){

        }
        function RenderProfileView(viewingID){
            //this will view if the button is clicked from account settings, 
            // or when token is not for userid
            $('#carrier-account').html(`
                <div id = 'account-view'>
                    <h1 id = 'profile-title'>Carrier</h1>
                    <div id = 'profile-content'></div>
                </div>
            `)
        }
        function RenderAccountView(viewingID){
            //if token is for user ID, create nav and main divs
            $('#carrier-account').html(`
                <div id = 'account-main'>
                    <h1 id = 'account-title'>Your Account</h1>
                    <div id = 'account-side-nav'></div>
                    <div id = 'account-content'></div>
                </div>
            `)
            RenderAccountSideNav(viewingID, 'settings')
        }
    }

    async getHtml() {
        return `
            <div id = 'carrier-account'>
               
            </div>
        `;
    }

    
}