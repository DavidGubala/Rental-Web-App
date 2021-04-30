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
                            <p>Account Settings</p>
                        </div>
                        <div class="side-link" id ='license-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/license-icon.svg">
                            </a>
                            <p>License Settings</p>
                        </div>
                        <div class="side-link" id ='accounting-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/accounting-icon.svg">
                            </a>
                            <p>Accounting</p>
                        </div>
                        <div class="side-link" id ='rentals-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/rentals-icon.svg">
                            </a>
                            <p>Account Rentals</p>
                        </div>
                        <div class="side-link" id ='loads-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/loads-icon.svg">
                            </a>
                            <p>Account Loads</p>
                        </div>
                    `)
                    break
                case 'license':
                    $('#account-side-nav').html(`
                        <div class="side-link" id = 'settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
                            </a>
                            <p>Account Settings</p>
                        </div>
                        <div class="side-link selected" id = 'license-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/license-icon.svg">
                            </a>
                            <p>License Settings</p>
                        </div>
                        <div class="side-link" id ='accounting-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/accounting-icon.svg">
                            </a>
                            <p>Accounting</p>
                        </div>
                        <div class="side-link" id = 'rentals-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/rentals-icon.svg">
                            </a>
                            <p>Account Rentals</p>
                        </div>
                        <div class="side-link" id = 'loads-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/loads-icon.svg">
                            </a>
                            <p>Account Loads</p>
                        </div>
                    `)
                    break
                case 'rentals':
                    $('#account-side-nav').html(`
                        <div class="side-link" id = 'settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
                            </a>
                            <p>Account Settings</p>
                        </div>
                        <div class="side-link" id = 'license-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/license-icon.svg">
                            </a>
                            <p>License Settings</p>
                        </div>
                        <div class="side-link" id ='accounting-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/accounting-icon.svg">
                            </a>
                            <p>Accounting</p>
                        </div>
                        <div class="side-link selected" id = 'rentals-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/rentals-icon.svg">
                            </a>
                            <p>Account Rentals</p>
                        </div>
                        <div class="side-link" id = 'loads-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/loads-icon.svg">
                            </a>
                            <p>Account Loads</p>
                        </div>
                    `)
                    break
                case 'loads':
                    $('#account-side-nav').html(`
                        <div class="side-link" id ='settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
                            </a>
                            <p>Account Settings</p>
                        </div>
                        <div class="side-link" id ='license-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/license-icon.svg">
                            </a>
                            <p>License Settings</p>
                        </div>
                        <div class="side-link" id ='accounting-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/accounting-icon.svg">
                            </a>
                            <p>Accounting</p>
                        </div>
                        <div class="side-link" id ='rentals-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/rentals-icon.svg">
                            </a>
                            <p>Account Rentals</p>
                        </div>
                        <div class="side-link selected" id ='loads-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/loads-icon.svg">
                            </a>
                            <p>Account Loads</p>
                        </div>
                    `)
                    break
                case 'accounting':
                    $('#account-side-nav').html(`
                        <div class="side-link" id ='settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
                            </a>
                            <p>Account Settings</p>
                        </div>
                        <div class="side-link" id ='license-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/license-icon.svg">
                            </a>
                            <p>License Settings</p>
                        </div>
                        <div class="side-link selected" id ='accounting-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/accounting-icon.svg">
                            </a>
                            <p>Accounting</p>
                        </div>
                        <div class="side-link" id ='rentals-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/rentals-icon.svg">
                            </a>
                            <p>Account Rentals</p>
                        </div>
                        <div class="side-link" id ='loads-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/loads-icon.svg">
                            </a>
                            <p>Account Loads</p>
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
                            <input type="password" id="pass" name="pass" placeholder="Password..">
                            <input type="password" id="cpass" name="conf-pass" placeholder="Confirm Password..">
                            
                            <p id = 'fs3'>Address</p>
                            <input type="text" id="street" name="street" placeholder="`+ userAddress.streetAddress +`">
                            <input type="text" id="city" name="city" placeholder="`+ userAddress.city +`">
                            <input type="text" id="state" name="state" placeholder="`+ userAddress.state +`">
                            <input type="text" id="country" name="country" placeholder="`+ userAddress.country +`">
                            <input type="text" id="postalcode" name="postalcode" placeholder="`+ userAddress.postalCode +`">

                            <div class='save-edit-btn'>Save Edit</div>
                            <div class='cancel-edit-btn'>Cancel Edit</div>
                        </form>
                        <div class='account-form-confirm'>
                        </div>
                        <div class='account-form-error'>
                        </div>
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
                    // Error checking with js
                    //if error then return else cont
                    let passEdit = false
                    let userEdits = false
                    let addressEdits = false
                    let passMatch = false
                    let validEdits = true
                    let editscounter = 0

                    let edits = {
                        fname: $('#fname').val(),
                        lname: $('#lname').val(),
                        email: $('#email').val(),
                        phone: $('#phone').val(),
                        pass: $('#pass').val(),
                        cpass: $('#cpass').val(),
                        street: $('#street').val(),
                        city: $('#city').val(),
                        state: $('#state').val(),
                        country: $('#country').val(),
                        postalcode: $('#postalcode').val()
                    }

                    let contactUpdates = {
                    }

                    let addressUpdates = {
                    }

                    let loginUpdates = {
                        uid: user._id
                    }

                    for (const [key, value] of Object.entries(edits)) {
                        if (!(value == '')){
                            editscounter++
                            switch(key){
                                case 'fname':
                                    userEdits = true
                                    contactUpdates['fname'] = value
                                    break
                                case 'lname':
                                    userEdits = true
                                    contactUpdates['lname'] = value
                                    break
                                case 'email':
                                    userEdits = true
                                    contactUpdates['email'] = value
                                    break
                                case 'phone':
                                    userEdits = true
                                    contactUpdates['phoneNumber'] = value
                                    break
                                case 'pass':
                                    // check pass and cpass
                                    if(edits['pass']== ''){
                                        break
                                    }else{
                                        if(edits['pass'] == edits['cpass']){
                                            passMatch = true
                                            loginUpdates['pass'] = value
                                        }else{
                                            passMatch = false
                                        }
                                        passEdit = true
                                    }
                                    break
                                case 'street':
                                    addressEdits = true
                                    addressUpdates['streetAddress'] = value
                                    break
                                case 'city':
                                    addressEdits = true
                                    addressUpdates['city'] = value
                                    break
                                case 'state':
                                    addressEdits = true
                                    addressUpdates['state'] = value
                                    break
                                case 'country':
                                    addressEdits = true
                                    addressUpdates['country'] = value
                                    break
                                case 'postalcode':
                                    addressEdits = true
                                    addressUpdates['postalCode'] = value
                                    break
                            }
                        }
                    }

                    console.log('there are ' + editscounter + ' edits requested by ueser')
                    console.log(edits)

                    //If edits are made, then save them
                    if(editscounter>0){
                    /* console.log(pass)
                        console.log(cpass)
                        console.log(passEdit)
                        console.log(passMatch) */
                        if(passEdit){
                            if(passMatch){
                                editscounter -= 2
                                $('.account-form-confirm').html(`
                                    <p id = 'opass-label'>Password change detected, please provide previous password.</p>
                                    <form id="opass">
                                        <input type="password" name="opass">
                                    </form>
                                    <div class='conf-btn'>Confirm Password Change</div>
                                    <div id='err'></div>
                                `)
                                $('.account-form-error').html(``)

                                $('#opass').submit(function( event ) {
                                    event.preventDefault();
                                    $('.conf-btn').click()
                                })

                                $('.conf-btn').click(function(){
                                    // authenticate the old password and check new ones as valid edits
                                    var login ={
                                        uid: user._id,
                                        pass: $('#opass>input').val()
                                    }
                                    let link = 'http://localhost:5050/login/pass'
                                    $.ajax({
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            "Access-Control-Allow-Origin": "http://localhost:5040"
                                        },
                                        type: 'POST',
                                        url : link,
                                        data: JSON.stringify(login),
                                        'success': function(res){
                                            console.log(res)
                                            if(res.status == 'ok'){
                                                // here we know the password was fine so we can go ahead and confirm all the changes
                                                // and send the put ajax calls for address user info and login updates
                                                //render confirmation,
                                                $('.account-form-confirm').html(`
                                                    <p id = 'message'>` + editscounter + ` edits and a password change requested</p>
                                                    <p id='ct'>Contact:</p>
                                                    <p id='fname'></p>
                                                    <p id='lname'></p>
                                                    <p id='email'></p>
                                                    <p id='phone'></p>

                                                    <p id='ad'>Address:</p>
                                                    <p id='street'></p>
                                                    <p id='city'></p>
                                                    <p id='state'></p>
                                                    <p id='country'></p>
                                                    <p id='zip'></p>
                                                    <div class='conf-btn'>Confirm Changes</div>
                                                `)
                                                $('.account-form-error').html(``)
                    
                                                $('.account-form-confirm>#fname').html(edits['fname'])
                                                $('.account-form-confirm>#lname').html(edits['lname'])
                                                $('.account-form-confirm>#email').html(edits['email'])
                                                $('.account-form-confirm>#phone').html(edits['phone'])
                                                $('.account-form-confirm>#street').html(edits['street'])
                                                $('.account-form-confirm>#city').html(edits['city'])
                                                $('.account-form-confirm>#state').html(edits['state'])
                                                $('.account-form-confirm>#country').html(edits['country'])
                                                $('.account-form-confirm>#zip').html(edits['postalcode'])
                    
                                                $('.conf-btn').click(function(){
                                                    //ajax call to save the edits
                                                    // one for account infos
                                                    if(userEdits){
                                                        console.log(contactUpdates)
                                                        let link = 'http://localhost:5050/carrier/' + user._id
                                                        $.ajax({
                                                            headers: {
                                                                'Accept': 'application/json',
                                                                'Content-Type': 'application/json',
                                                                "Access-Control-Allow-Origin": "http://localhost:5040"
                                                            },
                                                            type: 'PUT',
                                                            url : link,
                                                            data: JSON.stringify(contactUpdates),
                                                            'success': function(res){
                                                                console.log(res.body)
                                                            }
                                                        })
                                                    }
                                                    if(addressEdits){
                                                        console.log(addressUpdates)
                                                        let link = 'http://localhost:5050/carrier/' + user._id + '/address'
                                                        //check if location exists
                                                        if(user.addressId == 'none'){
                                                            $.ajax({
                                                                headers: {
                                                                    'Accept': 'application/json',
                                                                    'Content-Type': 'application/json',
                                                                    "Access-Control-Allow-Origin": "http://localhost:5040"
                                                                },
                                                                type: 'POST',
                                                                url : link,
                                                                data: JSON.stringify(addressUpdates),
                                                                'success': function(res){
                                                                    console.log(res.body)
                                                                }
                                                            })
                                                        }else{
                                                            $.ajax({
                                                                headers: {
                                                                    'Accept': 'application/json',
                                                                    'Content-Type': 'application/json',
                                                                    "Access-Control-Allow-Origin": "http://localhost:5040"
                                                                },
                                                                type: 'PUT',
                                                                url : link,
                                                                data: JSON.stringify(addressUpdates),
                                                                'success': function(res){
                                                                    console.log(res.body)
                                                                }
                                                            })
                                                        }
                                                    }
                                                    if(passEdit){
                                                        console.log(loginUpdates)
                                                        let link = 'http://localhost:5050/login/'
                                                        $.ajax({
                                                            headers: {
                                                                'Accept': 'application/json',
                                                                'Content-Type': 'application/json',
                                                                "Access-Control-Allow-Origin": "http://localhost:5040"
                                                            },
                                                            type: 'PUT',
                                                            url : link,
                                                            data: JSON.stringify(loginUpdates),
                                                            'success': function(res){
                                                                console.log(res.body)
                                                            }
                                                        })
                                                    }
                                                    //after saving edits go back to account seetings
                                                    window.location.href = '/carrier/' + user._id
                                                })
                                            }else{
                                                // respond with an error
                                                switch(res.status){
                                                    case 'bad_pass':
                                                        $('.account-form-confirm>#err').html('<p>Previous account password was incorrect.</p>')
                                                        break
                                                }
                                            }
                                        }
                                    });
                                })
                            }else{
                                // paswords dont match error message
                                validEdits = false
                                $('.account-form-confirm').html(``)
                                $('.account-form-error').html(`
                                    <p id = 'message'>Your new passwords do not match.</p>
                                `)
                            }
                        }else{
                            //render confirmation,
                            $('.account-form-confirm').html(`
                                <p id = 'message'>There are ` + editscounter + ` edits requested.</p>
                                <p id='ct'>Contact:</p>
                                <p id='fname'></p>
                                <p id='lname'></p>
                                <p id='email'></p>
                                <p id='phone'></p>

                                <p id='ad'>Address:</p>
                                <p id='street'></p>
                                <p id='city'></p>
                                <p id='state'></p>
                                <p id='country'></p>
                                <p id='zip'></p>
                                <div class='conf-btn'>Confirm Changes</div>
                            `)
                            $('.account-form-error').html(``)

                            $('.account-form-confirm>#fname').html(edits['fname'])
                            $('.account-form-confirm>#lname').html(edits['lname'])
                            $('.account-form-confirm>#email').html(edits['email'])
                            $('.account-form-confirm>#phone').html(edits['phone'])
                            $('.account-form-confirm>#passch').html(edits['pass'])
                            $('.account-form-confirm>#street').html(edits['street'])
                            $('.account-form-confirm>#city').html(edits['i'])
                            $('.account-form-confirm>#state').html(edits['state'])
                            $('.account-form-confirm>#country').html(edits['country'])
                            $('.account-form-confirm>#zip').html(edits['postalcode'])

                            $('.conf-btn').click(function(){
                                //ajax call to save the edits
                                // one for account info
                                if(userEdits){
                                    console.log(contactUpdates)
                                    let link = 'http://localhost:5050/carrier/' + user._id
                                    $.ajax({
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            "Access-Control-Allow-Origin": "http://localhost:5040"
                                        },
                                        type: 'PUT',
                                        url : link,
                                        data: JSON.stringify(contactUpdates),
                                        'success': function(res){
                                            console.log(res.body)
                                        }
                                    })
                                }
                                if(addressEdits){
                                    console.log(addressUpdates)
                                    let link = 'http://localhost:5050/carrier/' + user._id + '/address'
                                    //check if location exists
                                    if(user.addressId == 'none'){
                                        $.ajax({
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                "Access-Control-Allow-Origin": "http://localhost:5040"
                                            },
                                            type: 'POST',
                                            url : link,
                                            data: JSON.stringify(addressUpdates),
                                            'success': function(res){
                                                console.log(res.body)
                                            }
                                        })
                                    }else{
                                        $.ajax({
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                "Access-Control-Allow-Origin": "http://localhost:5040"
                                            },
                                            type: 'PUT',
                                            url : link,
                                            data: JSON.stringify(addressUpdates),
                                            'success': function(res){
                                                console.log(res.body)
                                            }
                                        })
                                    }
                                }
                                //after saving edits go back to account seetings
                                window.location.href = '/carrier/' + user._id
                            })
                        }
                    }else{
                        RenderAccountSettings(user)
                    }
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
                var hasLicense = 'missing'
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
                        <div id='current-rentals' class='lor'><h6>Curret Rentals</h6></div>
                    </div>
                </div>
            `)

            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://localhost:5040"
                },
                type: 'GET',
                url : 'http://localhost:5050/rental/inventory',
                'success': function(res){
                    console.log(res)
                    let currentRentals = ``
                    // fill out rental
                    $.each(res ,function(rentalType) {
                        $.each(res[rentalType] ,function(rental) {
                            //console.log(res[rentalType][rental])
                            let rentalContent = ''
                            
                            console.log(rentalType)
                            switch(rentalType){
                                case 'trucks':
                                    rentalContent = `
                                    <div id = 'rental-list-item'>
                                        <div id = rental-slideshow><p>` + rentalType + ` photo</p></div>
                                        <p>Trailer Type: ` + res[rentalType][rental]['truckType'] + `</p>
                                        <p>Make : ` + res[rentalType][rental]['make'] + `</p>
                                        <p>Model: ` + res[rentalType][rental]['model'] + `</p>
                                        <p>Year: ` + res[rentalType][rental]['year'] + `</p>
                                        <p>Odometer: ` + res[rentalType][rental]['odometer'] + `</p>
                                        <p>Price: ` + res[rentalType][rental]['price'] + `</p>
                                        <div class='view-rental-btn' id='`+ res[rentalType][rental]['_id'] + `'>View Rental</div>
                                    </div>
                                    `
                                    break
                                case 'trailers':
                                    rentalContent = `
                                    <div id = 'rental-list-item'>
                                        <div id = rental-slideshow><p>` + rentalType + ` photo</p></div>
                                        <p>Truck Type: ` + res[rentalType][rental]['trailerType'] + `</p>
                                        <p>Manufacturer : ` + res[rentalType][rental]['manuf'] + `</p>
                                        <p>Model: ` + res[rentalType][rental]['model'] + `</p>
                                        <p>Year: ` + res[rentalType][rental]['year'] + `</p>
                                        <p>Price: ` + res[rentalType][rental]['price'] + `</p>
                                        <div class='view-rental-btn' id='`+ res[rentalType][rental]['_id'] + `'>View Rental</div>
                                    </div>
                                    `
                                    break
                            }
                            
                            if((res[rentalType][rental]['renterId']) == user._id){
                                currentRentals += rentalContent
                            }
                        })
                    })
    
                    if(currentRentals==''){
                        $('#current-rentals').html(`<p>None</p>`)
                    }else{
                        $('#current-rentals').html(currentRentals)
                    }
                }
            })

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
                            <p id='contact'>Contact Info:</p>
                            <p id='name'>` + user.fname + ` ` + user.lname + `</p>
                            <p id='email'>` +  user.email + `</p>
                            <p id='phone'></p>
                            <p id='rating'>Rating:</p>
                            <p id='rate'>9.7</p>
                        </div>
                        <div id='profile-btns'>
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
                        <div id = 'profile-content'>
                            <p id='contact'>Contact Info:</p>
                            <p id='name'>` + user.fname + ` ` + user.lname + `</p>
                            <p id='email'>` +  user.email + `</p>
                            <p id='phone'></p>
                            <p id='rating'>Rating:</p>
                            <p id='rate'>9.7</p>
                        </div>
                    </div>
                `)
            }

            if(user.phoneNumber == "none"){
                $('#phone').html(`No phone number on file`)
            }else{
                $('#phone').html(user.phoneNumber)
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