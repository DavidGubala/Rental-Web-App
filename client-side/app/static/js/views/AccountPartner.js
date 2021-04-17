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
        // ajax call to find partner with id
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:5040"
            },
            type: 'GET',
            url : "http://localhost:5050/partner/" + viewingID,
            'success': function(res){
                if(res.status == 'notexist'){
                    $('#partner-account').html(`
                        <div id = 'account-main'>
                            <h1 id = 'account-title'>Account Doesn't Exist</h1>
                        </div>
                    `)
                }else if (res.status == 'exist'){
                    user = res.partner
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
            console.log(selectedSideLink)
            switch(selectedSideLink){
                case 'settings':
                    $('#account-side-nav').html(`
                        <div class="side-link selected" id ='settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
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
                    `)
                    break
                case 'rentals':
                    $('#account-side-nav').html(`
                        <div class="side-link" id = 'settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
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
                    `)
                    break
                case 'accounting':
                    $('#account-side-nav').html(`
                        <div class="side-link" id ='settings-side-nav'>
                            <a>
                                <img id="-icon" src="/static/assets/account-pages/icons/settings-icon.svg">
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
                    `)
                    break
            }


        }
        
        function sideNavFunc(user) {
            $('#settings-side-nav').click(function(){
                RenderAccountSettings(user)
            })

            $('#accounting-side-nav').click(function(){
                RenderAccountingSettings(user)
            })

            $('#rentals-side-nav').click(function(){
                RenderRentalsSettings(user)
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
                    url : "http://localhost:5050/partner/" + viewingID + "/address",
                    'success': function(res){
                        if(res.status == 'notexist'){
                            $('#street').html(`No address on file`)
                        }else if (res.status == 'exist'){
                            userAddress = res.partnerAddress
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

        function RenderRentalsSettings(user){
            $('#account-content').html(`
                <div id = 'account-rentals-content'>
                    <h3>Account Rentals</h3>
                    <div id='account-rentals-list'>
                        <h6>Currently Listed</h6>
                        <div id='current-listed' class='lor'>
                        </div>
                        <h6>Currently Rented</h6>
                        <div id='current-rented' class='lor'>
                        </div>
                        <h6>Past Rentals</h6>
                        <div id='past-rentals' class='lor'>
                        </div>
                    </div>
                    <div class='add-rental-btn'>Add New Rental</div>
                </div>
            `)
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://localhost:5040"
                },
                type: 'GET',
                url : 'http://localhost:5050/partner/' + user._id + '/inventory',
                'success': function(res){
                    console.log(res)
                    let currentRentals = ``
                    let rentedRentals = ``
                    let pastRentals = ``
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
                                        <div class='edit-rental-btn'>Edit Rental</div>
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
                                        <div class='edit-rental-btn'>Edit Rental</div>
                                    </div>
                                    `
                                    break
                            }

                            
                            //console.log((res[rentalType][rental]['renterId']))
                            currentRentals += rentalContent
                        })
                    })
                    if(currentRentals==''){currentRentals = 'None'}
                    if(rentedRentals==''){rentedRentals = 'None'}
                    if(pastRentals==''){pastRentals = 'None'}
                    $('#current-listed').html(currentRentals)
                    $('#current-rented').html(rentedRentals)
                    $('#past-rentals').html(pastRentals)

                }
            })
            
            RenderAccountSideNav('rentals')
            sideNavFunc(user)

            $('.add-rental-btn').click(function(){
                RenderAddRentalForm(user)
            })
        }

        function RenderAddRentalForm(user){
            switch($('.rentalType').val()){
                case 'trailer':
                    $('#account-content').html(`
                        <div id = 'account-rentals-content'>
                            <h3>Add A Rental</h3>
                            <form class="rental-form">
                                <label for="rentalType">Rental Type:</label>
                                <select class="rentalType" name="rentalType">
                                    <option value="" disabled>Select Rental Vehicle Type..</option>    
                                    <option value="trailer" selected>Trailer</option>
                                    <option value="truck">Truck</option>
                                </select>
                                
                                <label for="trailerType">Trailer Type:</label>
                                <input type="text" id="trailerType" name="trailerType" placeholder="">

                                <label for="bodyLength"> Trailer Length:</label>
                                <input type="text" id="bodyLength" name="bodyLength" placeholder="">

                                <label for="manuf">Manufacturer:</label>
                                <input type="text" id="manuf" name="manuf" placeholder="">

                                <label for="year">Trailer Year:</label>
                                <input type="text" id="year" name="year" placeholder="">

                                <label for="odometer">Odometer:</label>
                                <input type="text" id="odometer" name="odometer" placeholder="">

                                <p id = 'fs3'>Pick-Up Location</p>
                                <br>
                                <label for="street">Street:</label>
                                <input type="text" id="street" name="street" placeholder="">

                                <label for="city">City:</label>
                                <input type="text" id="city" name="city" placeholder="">

                                <label for="state">State:</label>
                                <input type="text" id="state" name="state" placeholder="">

                                <label for="country">Country:</label>
                                <input type="text" id="country" name="state" placeholder="">

                                <label for="postalcode">Postal Code:</label>
                                <input type="text" id="postalcode" name="postalcode" placeholder="">

                                
                                <label for="price">Price:</label>
                                <input type="text" id="price" name="price" placeholder="">
                                
                                <label for="pricingType">Pricing Type:</label>
                                <select class="pricingType" name="pricingType">
                                    <option value="" disabled selected>Select Rental Length..</option>    
                                    <option value="shipper">Per Day</option>
                                    <option value="partner">Per Week</option>
                                    <option value="partner">Per Month</option>
                                </select>
                                
                                <div class='save-rental-btn'>Save New Rental</div>
                            </form>
                        </div>
                    `)
                    break
                case 'truck':
                    $('#account-content').html(`
                        <div id = 'account-rentals-content'>
                            <h3>Add A Rental</h3>
                            <form class="rental-form">
                                <label for="rentalType">Rental Type:</label>
                                <select class="rentalType" name="rentalType">
                                    <option value="" disabled>Select Rental Vehicle Type..</option>    
                                    <option value="trailer">Trailer</option>
                                    <option value="truck" selected>Truck</option>
                                </select>
                                
                                <label for="truckType">Truck Type:</label>
                                <input type="text" id="truckType" name="truckType" placeholder="">

                                <label for="vin">Vin:</label>
                                <input type="text" id="vin" name="vin" placeholder="">

                                <label for="make">Make:</label>
                                <input type="text" id="make" name="make" placeholder="">

                                <label for="model">Model:</label>
                                <input type="text" id="model" name="model" placeholder="">
                                
                                <label for="year">Yaer:</label>
                                <input type="text" id="year" name="year" placeholder="">

                                <label for="odometer">Odometer:</label>
                                <input type="text" id="odometer" name="odometer" placeholder="">

                                <p id = 'fs3'>Pick-Up Location</p>
                                <br>
                                <label for="street">Street:</label>
                                <input type="text" id="street" name="street" placeholder="">

                                <label for="city">City:</label>
                                <input type="text" id="city" name="city" placeholder="">

                                <label for="state">State:</label>
                                <input type="text" id="state" name="state" placeholder="">

                                <label for="country">Country:</label>
                                <input type="text" id="country" name="state" placeholder="">

                                <label for="postalcode">Postal Code:</label>
                                <input type="text" id="postalcode" name="postalcode" placeholder="">

                                
                                <label for="price">Price:</label>
                                <input type="text" id="price" name="price" placeholder="">
                                
                                <label for="pricingType">Pricing Type:</label>
                                <select class="pricingType" name="pricingType">
                                    <option value="" disabled selected>Select Rental Length..</option>    
                                    <option value="shipper">Per Day</option>
                                    <option value="partner">Per Week</option>
                                    <option value="partner">Per Month</option>
                                </select>
                                
                                <div class='save-rental-btn'>Save New Rental</div>
                            </form>
                        </div>
                    `)
                    break
                default:
                    $('#account-content').html(`
                        <div id = 'account-rentals-content'>
                            <h3>Add A Rental</h3>
                            <form class="rental-form">
                                <label for="rentalType">Rental Type:</label>
                                <select class="rentalType" name="rentalType">
                                    <option value="" disabled selected>Select Rental Vehicle Type..</option>    
                                    <option value="trailer">Trailer</option>
                                    <option value="truck">Truck</option>
                                </select>
                            </form>
                        </div>
                    `)
            }
            $('.rentalType').change(function(){
                RenderAddRentalForm(user)
            })

            $('.save-rental-btn').click(function(){
                //check filled out correctly
                let rt = $('.rentalType').val()
                let price = undefined
                let year = undefined
                let rental = undefined
                let odometer = undefined
                let pricingType = undefined
                switch(rt){
                    case 'truck':
                        let truckType = $('#truckType').val()
                        let vin = $('#vin').val()
                        let make = $('#make').val()
                        let model = $('#model').val()
                        year = $('#year').val()
                        odometer = $('#odometer').val()

                        price = $('#price').val()
                        pricingType = $('#pricingType').val()
                        rental = {
                            truckType : truckType,
                            vin: vin,
                            make: make,
                            model: model,
                            year: year,
                            odometer: odometer,
                            price: price,
                            ownerId: user._id,
                        }
                        break
                    case 'trailer':
                        let trailerType = $('#trailerType').val()
                        let bodyLength = $('#bodyLength').val()
                        let manuf = $('#manuf').val()
                        year = $('#year').val()
                        odometer = $('#odometer').val()
                        
                        price = $('#price').val()
                        pricingType = $('#pricingType').val()
                        rental = {
                            trailerType : trailerType,
                            bodyLength: bodyLength,
                            manuf: manuf,
                            year: year,
                            odometer: odometer,
                            price: price,
                            ownerId: user._id,
                        }
                        break
                }
                console.log(rt);
                console.log(rental);
                //send ajax post /truck or /trailer based on type
                let link = 'http://localhost:5050/rental/' + rt
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "http://localhost:5040"
                    },
                    type: 'POST',
                    url : link,
                    data: JSON.stringify(rental),
                    'success': function(res){
                        console.log('sent');
                        console.log(res);
                        window.location.href = '/rental/' + res._id
                    }
                })
            })
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
                $('#partner-account').html(`
                    <div id = 'account-view'>
                        <h1 id = 'profile-title'>partner Profile</h1>
                        <div id = 'profile-content'>
                            <div class='account-settings-btn'>Account Settings</div>
                        </div>
                    </div>
                `)

                $('.account-settings-btn').click(function(){
                    RenderAccountView(user)
                })

            }else{
                $('#partner-account').html(`
                    <div id = 'account-view'>
                        <h1 id = 'profile-title'>partner Profile</h1>
                        <div id = 'profile-content'></div>
                    </div>
                `)
            }

            
        }

        function RenderAccountView(user){
            //if token is for user ID, create nav and main divs
            $('#partner-account').html(`
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
        console.log(this.params.id)
        return `
        <div id = 'partner-account'>
        </div>
        `;
    }
}