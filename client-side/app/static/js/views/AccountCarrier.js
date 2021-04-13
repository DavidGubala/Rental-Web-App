import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }
    
    async getJS(){
        let viewingID = this.params.id
        var user = {}
        //Valid User Check
        //make sure this id actually exists
        // ajax call to find carrier with id
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:5040"
            },
            type: 'GET',
            url : "http://localhost:5050/carrier/" + viewingID,
            'success': function(res){
                if(res.status == 'notexist'){
                    $('#carrier-account').html(`
                        <div id = 'account-main'>
                            <h1 id = 'account-title'>Account Doesn't Exist</h1>
                        </div>
                    `)
                }else if (res.status == 'exist'){
                    user = res.carrier
                    console.log(user)

                    // Here we supposed to authenticate
                    RenderAccountView(user)
                }
            }
        })
    
        //Methods
        function RenderAccountSideNav(selectedSideLink){
            //this will have a switch statement for sleected side link, will id selected
            //console.log(selectedSideLink)
            switch(selectedSideLink){
                case 'settings':
                    $('#account-side-nav').html(`
                        <div class="side-link selected" id ='settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='license-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/license-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='accounting-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/accounting-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='rentals-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/rentals-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='loads-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/loads-icon.svg">
                            </a>
                        </div>
                    `)
                    break
                case 'license':
                    $('#account-side-nav').html(`
                        <div class="side-link" id = 'settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
                            </a>
                        </div>
                        <div class="side-link selected" id = 'license-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/license-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='accounting-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/accounting-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'rentals-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/rentals-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'loads-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/loads-icon.svg">
                            </a>
                        </div>
                    `)
                    break
                case 'rentals':
                    $('#account-side-nav').html(`
                        <div class="side-link" id = 'settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'license-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/license-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='accounting-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/accounting-icon.svg">
                            </a>
                        </div>
                        <div class="side-link selected" id = 'rentals-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/rentals-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id = 'loads-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/loads-icon.svg">
                            </a>
                        </div>
                    `)
                    break
                case 'loads':
                    $('#account-side-nav').html(`
                        <div class="side-link" id ='settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='license-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/license-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='accounting-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/accounting-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='rentals-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/rentals-icon.svg">
                            </a>
                        </div>
                        <div class="side-link selected" id ='loads-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/loads-icon.svg">
                            </a>
                        </div>
                    `)
                    break
                case 'accounting':
                    $('#account-side-nav').html(`
                        <div class="side-link" id ='settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='license-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/license-icon.svg">
                            </a>
                        </div>
                        <div class="side-link selected" id ='accounting-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/accounting-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='rentals-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/rentals-icon.svg">
                            </a>
                        </div>
                        <div class="side-link" id ='loads-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/loads-icon.svg">
                            </a>
                        </div>
                    `)
                    break
            }
        }
        
        function sideNavFunc(){
            $('#settings-side-nav').click(function(){
                RenderAccountSettings()
            })

            $('#license-side-nav').click(function(){
                RenderLicenseSettings()
            })

            $('#accounting-side-nav').click(function(){
                RenderAccountingSettings()
            })

            $('#rentals-side-nav').click(function(){
                RenderRentalsSettings()
            })

            $('#loads-side-nav').click(function(){
                RenderLoadsSettings()
            })
        }

        function RenderAccountSettings(user){
            //TODO FILL OUT WITH USER
            //html skeleton Fill out with the user
            $('#account-content').html(`
                <div id = 'settings-content'>
                    <h3>Account Settings</h3>
                    <p id='name'>Dummy User</p>
                    <p id='email'>spam@testingemail.com</p>
                    <p id='phone'>555-555-5555</p>
                    <p id='street'>1234 W. Loyola Ln.</p>
                    <p id='csz'>Chicago, IL 60656</p>
                    <div class='edit-btn'>Edit Account</div>
                    <div class='view-profile-btn'>View Profile</div>
                </div>
            `)

            $('.view-profile-btn').click(function(){
                RenderProfileView()
            })

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

            RenderAccountSideNav('settings')
            sideNavFunc()
        }

        function RenderLicenseSettings(user){
            let hasLicense = 'success'

            switch(hasLicense){
                case 'success':
                    $('#account-content').html(`
                        <div id = 'license-content'>
                            <h3 id = 'lic-s1'>License Settings</h3>
                            <p id='lic-s2'>CDL</p>
                            <p id='lic-s3'>G172-749HSNU18R81BF8</p>
                            <p id='lic-s4'>06-2024</p>
                            <div class='upload-btn'>ReUpload License</div>
                        </div>
                    `)
                    break
                case 'missing':
                    $('#account-content').html(`
                        <div id = 'license-content'>
                            <h3 id = 'lic-s1'>License Settings</h3>
                            <p id = 'lic-s2'>You have no license on record.</p>
                            <p id = 'lic-s3'>Usability will be limited</p>
                            <div class='upload-btn'>Upload License</div>
                        </div>
                    `)
                    break
                case 'uploaded':
                    $('#account-content').html(`
                        <div id = 'license-content'>
                            <h3 id = 'lic-s1'>License Settings</h3>
                            <p id = 'lic-s2'>You have a license uploaded.</p>
                            <p id = 'lic-s3'>License is under review.</p>
                            <div class='upload-btn'>ReUpload License</div>
                        </div>
                    `)
                    break
            }

            RenderAccountSideNav('license')
            sideNavFunc()
        }

        function RenderRentalsSettings(user){
            $('#account-content').html(`
                <div id = 'account-rentals-content'>
                    <h3>Account Rentals</h3>
                    <div id='account-rentals-list'>
                        <div id='current-rentals'><h6>Curret Rentals</h6></div>
                        <div id='past-rentals'><h6>Past Rentals</h6></div>
                    </div>
                </div>
            `)
            RenderAccountSideNav('rentals')
            sideNavFunc()
        }

        function RenderLoadsSettings(user){
            $('#account-content').html(`
                <div id = 'account-loads-content'>
                    <h3>Account Loads</h3>
                    <div id='account-loads-list'>
                        <div id='loads-in-progress'><h6>Loads in Progress</h6></div>
                        <div id='copmleted-loads'><h6>Completed Loads</h6></div>   
                    </div>
                </div>
            `)
            RenderAccountSideNav('loads')
            sideNavFunc()
        }

        function RenderAccountingSettings(user){
            $('#account-content').html(`
                <div id = 'account-accounting-content'>
                    <h3>Accounting</h3>
                </div>
            `)
            RenderAccountSideNav('accounting')
            sideNavFunc()
        }
        

        function RenderProfileView(user){
            //this will view if the button is clicked from account settings, 
            // or when token is not for userid
            
            if(authenticated){
                $('#carrier-account').html(`
                    <div id = 'account-view'>
                        <h1 id = 'profile-title'>Carrier Profile</h1>
                        <div id = 'profile-content'>
                            <div class='account-settings-btn'>Account Settings</div>
                        </div>
                    </div>
                `)

                $('.account-settings-btn').click(function(){
                    RenderAccountView(viewingID)
                })

            }else{
                $('#carrier-account').html(`
                    <div id = 'account-view'>
                        <h1 id = 'profile-title'>Carrier Profile</h1>
                        <div id = 'profile-content'></div>
                    </div>
                `)
            }

            
        }

        function RenderAccountView(user){
            //if token is for user ID, create nav and main divs
            $('#carrier-account').html(`
                <div id = 'account-main'>
                    <h1 id = 'account-title'>Your Account</h1>
                    <div id = 'account-side-nav'></div>
                    <div id = 'account-content'></div>
                </div>
            `)
            RenderAccountSettings(user)
            
        
        }
    }

    async getHtml() {
        return `
            <div id = 'carrier-account'>
            </div>
        `;
    }

    
}