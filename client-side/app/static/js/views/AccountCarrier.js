import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }
    
    async getJS(token){
        let viewingID = this.params.id
        let authenticated = true
        let verified = true
        console.log(token)
        //Valid User Check
        //make sure this id actually exists
        if(verified){
            //Authenticate User
            // if jwt is for this user id, render account settings, side nav and stuff
            // else just view profile

            if(authenticated){
                RenderAccountView(this.params.id)
            }else{
                RenderProfileView(this.params.id)
            }

            //Methods
            function RenderAccountSideNav(viewingID, selectedSideLink){
                //this will have a switch statement for sleected side link, will id selected
                console.log(selectedSideLink)
                switch(selectedSideLink){
                    case 'settings':
                        $('#account-side-nav').html(`
                            <div class="side-link selected" id ='settings-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/settings-icon.svg">
                                </a>
                            </div>
                            <div class="side-link" id ='license-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/license-icon.svg">
                                </a>
                            </div>
                            <div class="side-link" id ='rentals-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/rentals-icon.svg">
                                </a>
                            </div>
                            <div class="side-link" id ='loads-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/loads-icon.svg">
                                </a>
                            </div>
                        `)
                        break
                    case 'license':
                        $('#account-side-nav').html(`
                            <div class="side-link" id = 'settings-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/settings-icon.svg">
                                </a>
                            </div>
                            <div class="side-link selected" id = 'license-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/license-icon.svg">
                                </a>
                            </div>
                            <div class="side-link" id = 'rentals-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/rentals-icon.svg">
                                </a>
                            </div>
                            <div class="side-link" id = 'loads-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/loads-icon.svg">
                                </a>
                            </div>
                        `)
                        break
                    case 'rentals':
                        $('#account-side-nav').html(`
                            <div class="side-link" id = 'settings-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/settings-icon.svg">
                                </a>
                            </div>
                            <div class="side-link" id = 'license-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/license-icon.svg">
                                </a>
                            </div>
                            <div class="side-link selected" id = 'rentals-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/rentals-icon.svg">
                                </a>
                            </div>
                            <div class="side-link" id = 'loads-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/loads-icon.svg">
                                </a>
                            </div>
                        `)
                        break
                    case 'loads':
                        $('#account-side-nav').html(`
                            <div class="side-link" id ='settings-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/settings-icon.svg">
                                </a>
                            </div>
                            <div class="side-link" id ='license-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/license-icon.svg">
                                </a>
                            </div>
                            <div class="side-link" id ='rentals-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/rentals-icon.svg">
                                </a>
                            </div>
                            <div class="side-link selected" id ='loads-side-nav'>
                                <a>
                                    <img id="-icon" src="/static/assets/account-carrier/icons/loads-icon.svg">
                                </a>
                            </div>
                        `)
                        break
                }


            }
            
            function sideNavFunc() {
                $('#settings-side-nav').click(function(){
                    console.log('y')
                    RenderAccountSettings(viewingID)
                })

                $('#license-side-nav').click(function(){
                    console.log('y')
                    RenderLicenseSettings(viewingID)
                })

                $('#rentals-side-nav').click(function(){
                    console.log('y')
                    RenderRentalsSettings(viewingID)
                })

                $('#loads-side-nav').click(function(){
                    console.log('y')
                    RenderLoadsSettings(viewingID)
                })
            }

            function RenderAccountSettings(viewingID){
                $('#account-content').html(`
                    <h3>Account Settings</h3>
                    <form class="account-form">
                        <input type="text" id="fname" name="firstname" placeholder="First Name..">
                        <input type="text" id="lname" name="lastname" placeholder="Last Name..">
                        <input type="text" id="email" name="email" placeholder="Your email address..">
                        <input type="text" id="pass" name="pass" placeholder="Password..">
                        <input type="submit" value="Edit Account">
                    </form>
                `)
                RenderAccountSideNav(viewingID, 'settings')
                sideNavFunc()
            }

            function RenderLicenseSettings(viewingID){
                $('#account-content').html(`
                    <h3>License Settings</h3>
                `)
                RenderAccountSideNav(viewingID, 'license')
                sideNavFunc()
            }

            function RenderRentalsSettings(viewingID){
                $('#account-content').html(`
                    <h3>Rental Settings</h3>
                `)
                RenderAccountSideNav(viewingID, 'rentals')
                sideNavFunc()
            }

            function RenderLoadsSettings(viewingID){
                $('#account-content').html(`
                    <h3>Load Settings</h3>
                `)
                RenderAccountSideNav(viewingID, 'loads')
                sideNavFunc()
            }

            function RenderProfileView(viewingID){
                //this will view if the button is clicked from account settings, 
                // or when token is not for userid
                $('#carrier-account').html(`
                    <div id = 'account-view'>
                        <h1 id = 'profile-title'>Carrier Profile</h1>
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
                RenderAccountSettings(viewingID)
                
            
            }
        }else{
            $('#carrier-account').html(`
                <div id = 'account-main'>
                    <h1 id = 'account-title'>Account Doesn't Exist</h1>
                </div>
            `)
        }
        
    }

    async getHtml() {
        return `
            <div id = 'carrier-account'>
               
            </div>
        `;
    }

    
}