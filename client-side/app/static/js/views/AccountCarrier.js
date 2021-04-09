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
                    <div id = 'settings-content'>
                        <h3>Account Settings</h3>
                        <p id='name'>Dummy User</p>
                        <p id='email'>spam@testingemail.com</p>
                        <p id='phone'>555-555-5555</p>
                        <p id='street'>1234 W. Loyola Ln.</p>
                        <p id='csz'>Chicago, IL 60656</p>
                        <div class='edit-btn'>Edit Account</div>
                    </div>
                `)

                $('.edit-btn').click(function(){
                    console.log('edit')
                    $('#account-content').html(`
                        <div id = 'edit-account-content'>
                            <h3>Account Settings</h3>
                            <form class="account-form">
                                <p id = 'fs1'>Contact Info.</p>
                                <input type="text" id="fname" name="firstname" placeholder="Dummy">
                                <input type="text" id="lname" name="lastname" placeholder="User">

                                <input type="text" id="email" name="email" placeholder="spam@testingemail.com">
                                <input type="text" id="phone" name="phone" placeholder="555-555-5555">
                                
                                <p id = 'fs2'>Password</p>
                                <input type="text" id="pass" name="pass" placeholder="Password..">
                                <input type="text" id="cpass" name="conf-pass" placeholder="Confirm Password..">
                                
                                <p id = 'fs3'>Address</p>
                                <input type="text" id="street" name="street" placeholder="1234 W. Loyola Ln.">
                                <input type="text" id="city" name="city" placeholder="Chicago">
                                <input type="text" id="state" name="state" placeholder="Illinois">
                                <input type="text" id="country" name="state" placeholder="United States">
                                <input type="text" id="postalcode" name="postalcode" placeholder="60656">

                                <div class='save-edit-btn'>Save Edit</div>
                                <div class='cancel-edit-btn'>Cancel Edit</div>
                            </form>
                        </div>
                    `)
                    
                    $('.save-edit-btn').click(function(){
                        let editsPresent = false
                        //If edits are made, then save them
                        if(editsPresent){
                            //ajax call to save the edits
                        }
                        RenderAccountSettings()
                    })

                    $('.cancel-edit-btn').click(function(){
                        RenderAccountSettings()
                    })

                })

                RenderAccountSideNav(viewingID, 'settings')
                sideNavFunc()
            }

            function RenderLicenseSettings(viewingID){
                let hasLicense = true;
                if(hasLicense){
                    $('#account-content').html(`
                        <div id = 'license-content'>
                            <h3>License Settings</h3>
                            <p id='type'>CDL</p>
                            <p id='licnumber'>G172-749HSNU18R81BF8</p>
                            <p id='expiration'>06-2024</p>
                            <div class='upload-btn'>ReUpload License</div>
                        </div>
                    `)
                }else{
                    $('#account-content').html(`
                        <div id = 'license-content'>
                            <h3>License Settings</h3>
                            <p>You have no license on record.</p>
                            <p>Usability will be limited</p>
                            <div class='upload-btn'>Upload License</div>
                        </div>
                    `)
                }

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