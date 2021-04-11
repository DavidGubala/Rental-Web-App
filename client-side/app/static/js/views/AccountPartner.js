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
            
            function sideNavFunc() {
                $('#settings-side-nav').click(function(){
                    RenderAccountSettings(viewingID)
                })

                $('#accounting-side-nav').click(function(){
                    RenderAccountingSettings(viewingID)
                })

                $('#rentals-side-nav').click(function(){
                    RenderRentalsSettings(viewingID)
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

                RenderAccountSideNav(viewingID, 'settings')
                sideNavFunc()
            }

            function RenderRentalsSettings(viewingID){
                $('#account-content').html(`
                    <div id = 'account-rentals-content'>
                        <h3>Account Rentals</h3>
                        <div id='account-rentals-list'>
                            <div id='current-rented'>
                                <h6>Currently Rented</h6>
                            </div>
                            <div id='current-listed'>
                                <h6>Currently Listed</h6>
                            </div>
                            <div id='past-rentals'>
                                <h6>Past Rentals</h6>
                            </div>
                        </div>
                        <div class='add-rental-btn'>Add New Rental</div>
                    </div>
                `)
                RenderAccountSideNav(viewingID, 'rentals')
                sideNavFunc()

                $('.add-rental-btn').click(function(){
                    RenderAddRentalForm(viewingID)
                })
            }

            function RenderAddRentalForm(viewingID){
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
                                        <option value="carrier">Per Week</option>
                                        <option value="carrier">Per Month</option>
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
                                        <option value="carrier">Per Week</option>
                                        <option value="carrier">Per Month</option>
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
                    RenderAddRentalForm(viewingID)
                })
            }

            function RenderAccountingSettings(viewingID){
                $('#account-content').html(`
                    <div id = 'account-accounting-content'>
                        <h3>Accounting</h3>
                    </div>
                `)
                RenderAccountSideNav(viewingID, 'accounting')
                sideNavFunc()
            }
            

            function RenderProfileView(viewingID){
                //this will view if the button is clicked from account settings, 
                // or when token is not for userid
                
                if(authenticated){
                    $('#partner-account').html(`
                        <div id = 'account-view'>
                            <h1 id = 'profile-title'>Partner Profile</h1>
                            <div id = 'profile-content'>
                                <div class='account-settings-btn'>Account Settings</div>
                            </div>
                        </div>
                    `)

                    $('.account-settings-btn').click(function(){
                        RenderAccountView(viewingID)
                    })

                }else{
                    $('#partner-account').html(`
                        <div id = 'account-view'>
                            <h1 id = 'profile-title'>Partner Profile</h1>
                            <div id = 'profile-content'></div>
                        </div>
                    `)
                }

                
            }

            function RenderAccountView(viewingID){
                //if token is for user ID, create nav and main divs
                $('#partner-account').html(`
                    <div id = 'account-main'>
                        <h1 id = 'account-title'>Your Account</h1>
                        <div id = 'account-side-nav'></div>
                        <div id = 'account-content'></div>
                    </div>
                `)
                RenderAccountSettings(viewingID)
                
            
            }
        }else{
            $('#partner-account').html(`
                <div id = 'account-main'>
                    <h1 id = 'account-title'>Account Doesn't Exist</h1>
                </div>
            `)
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