import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }
    
    async getJS(){
        let viewingID = this.params.id
        var user = {}
        var userAddress= {}
        var authenticated = false
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

                    var token = localStorage.getItem('token')
                    let authReq = {
                        token : token
                    }
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "http://localhost:5040"
                        },
                        type: 'post',
                        url : "http://localhost:5050/login/auth",
                        data: JSON.stringify(authReq),
                        'success': function(res){
                            if(res.utype== undefined){
                                var reftoken = localStorage.getItem('reftoken')
                                authReq = {
                                    reftoken: reftoken
                                }
                                $.ajax({
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        "Access-Control-Allow-Origin": "http://localhost:5040"
                                    },
                                    type: 'post',
                                    url : "http://localhost:5050/login/token",
                                    data: JSON.stringify(authReq),
                                    'success': function(res){
                                        if(res.status == 'ok'){
                                            localStorage.setItem('token', res.token)
                                            authReq = {
                                                token : res.token
                                            }
                                            $.ajax({
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json',
                                                    "Access-Control-Allow-Origin": "http://localhost:5040"
                                                },
                                                type: 'post',
                                                url : "http://localhost:5050/login/auth",
                                                data: JSON.stringify(authReq),
                                                'success': function(res){
                                                    if(res.status = 'ok'){
                                                        if(res.uid == viewingID){
                                                            RenderAccountView(user)
                                                            authenticated = true
                                                        }else{
                                                            RenderProfileView(user)
                                                        }
                                                    }
                                                    if(res.status == '403'){
                                                        RenderProfileView(user)
                                                    }
                                                }
                                            })
                                        }else if(res.status == '403'){
                                            RenderProfileView(user)
                                        }
                                        
                                    }
                                })
                            }else{
                                if(res.uid == viewingID){
                                    RenderAccountView(user)
                                    authenticated = true
                                }else{
                                    RenderProfileView(user)
                                }
                            }
                        }
                    })
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
        
        function sideNavFunc(user){
            $('#settings-side-nav').click(function(){
                RenderAccountSettings(user)
            })

            $('#license-side-nav').click(function(){
                RenderLicenseSettings(user)
            })

            $('#accounting-side-nav').click(function(){
                RenderAccountingSettings(user)
            })

            $('#rentals-side-nav').click(function(){
                RenderRentalsSettings(user)
            })

            $('#loads-side-nav').click(function(){
                RenderLoadsSettings(user)
            })
        }

        function RenderAccountSettings(user){
            $('#account-content').html(`
                <div id = 'settings-content'>
                    <h3>Account Settings</h3>
                    <p id='name'>` + user.fname + ` ` + user.lname + `</p>
                    <p id='email'>` +  user.email + `</p>
                    <p id='phone'></p>
                    <p id='street'></p>
                    <p id='csz'></p>
                    <div class='edit-btn'>Edit Account</div>
                    <div class='view-profile-btn'>View Profile</div>
                </div>
            `)

            if(user.phoneNumber == "none"){
                $('#phone').html(`No phone number on file`)
            }else{
                $('#phone').html(user.phoneNumber)
            }

            if(user.addressId == "none"){
                $('#street').html(`No address on file`)
            }else{
                //ajax call to get address
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "http://localhost:5040"
                    },
                    type: 'GET',
                    url : "http://localhost:5050/carrier/" + viewingID + "/address",
                    'success': function(res){
                        if(res.status == 'notexist'){
                            $('#street').html(`No address on file`)
                        }else if (res.status == 'exist'){
                            userAddress = res.carrierAddress
                            console.log(userAddress)
                            $('#street').html(userAddress.streetAddress)
                            $('#csz').html(userAddress.city + ` ` + userAddress.state + ' ' + userAddress.postalCode)
                        }
                    }
                })
            }



            $('.view-profile-btn').click(function(){
                RenderProfileView(user)
            })

            $('.edit-btn').click(function(){
                console.log('edit')
                $('#account-content').html(`
                    <div id = 'edit-account-content'>
                        <h3>Account Settings</h3>
                        <form class="account-form">
                            <p id = 'fs1'>Contact Info.</p>
                            <input type="text" id="fname" name="firstname" placeholder="`+ user.fname +`">
                            <input type="text" id="lname" name="lastname" placeholder="`+ user.lname +`">

                            <input type="text" id="email" name="email" placeholder="`+ user.email +`">
                            <input type="text" id="phone" name="phone" placeholder="`+ user.phoneNumber +`">
                            
                            <p id = 'fs2'>Password</p>
                            <input type="text" id="pass" name="pass" placeholder="Password..">
                            <input type="text" id="cpass" name="conf-pass" placeholder="Confirm Password..">
                            
                            <p id = 'fs3'>Address</p>
                            <input type="text" id="street" name="street" placeholder="`+ userAddress.streetAddress +`">
                            <input type="text" id="city" name="city" placeholder="`+ userAddress.city +`">
                            <input type="text" id="state" name="state" placeholder="`+ userAddress.state +`">
                            <input type="text" id="country" name="state" placeholder="`+ userAddress.country +`">
                            <input type="text" id="postalcode" name="postalcode" placeholder="`+ userAddress.postalCode +`">

                            <div class='save-edit-btn'>Save Edit</div>
                            <div class='cancel-edit-btn'>Cancel Edit</div>
                        </form>
                    </div>
                `)

                if(user.phoneNumber == "none"){
                    $('#phone').attr('placeholder','Phone Number')
                }

                if(user.addressId == "none"){
                    $('#street').attr('placeholder','Street Address')
                    $('#city').attr('placeholder','City')
                    $('#state').attr('placeholder','State')
                    $('#country').attr('placeholder','Country')
                    $('#postalcode').attr('placeholder','Postal Code')
                }

                $('.save-edit-btn').click(function(){
                    let editsPresent = false
                    //If edits are made, then save them
                    if(editsPresent){
                        //ajax call to save the edits
                    }
                    RenderAccountSettings(user)
                })

                $('.cancel-edit-btn').click(function(){
                    RenderAccountSettings(user)
                })

            })

            RenderAccountSideNav('settings')
            sideNavFunc(user)
        }

        function RenderLicenseSettings(user){
            if(user.licenseId == "none"){
                let hasLicense = 'missing'
            }else{
                //ajax
                let uploaded = 'true'
                if(uploaded == true){
                    
                }else{

                }
            }

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
            sideNavFunc(user)
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
            sideNavFunc(user)
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
            sideNavFunc(user)
        }

        function RenderAccountingSettings(user){
            $('#account-content').html(`
                <div id = 'account-accounting-content'>
                    <h3>Accounting</h3>
                </div>
            `)
            RenderAccountSideNav('accounting')
            sideNavFunc(user)
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
                    RenderAccountView(user)
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