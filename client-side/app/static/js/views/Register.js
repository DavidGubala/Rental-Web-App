import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getJS(){
        $('.userType').change(function() {
            switch($('.userType').val()){
                case 'shipper':
                    $('.graphic').html('<img src="/static/assets/landing-page/warehouse.svg" alt="warehouse svg">')
                    break
                case 'carrier':
                    $('.graphic').html('<img src="/static/assets/landing-page/truck.svg" alt="struck svg">')
                    break
                case 'partner':
                    $('.graphic').html('<img src="/static/assets/landing-page/fleet.svg" alt="fleet svg">')
                    break
            }
        });

        $( ".register-form" ).submit(function( event ) {
            //alert( "Handler for .submit() called." );
            event.preventDefault();
            // Here we can have checks
            // then after checks, send a request to the backend.

          });

    }

    async getHtml() {
        return `
            <div class="register">
                <form class="register-form">
                    <h1>Register Here</h1>
                    <select class="userType" name="userType">
                        <option value="" disabled selected>Select Account Type..</option>    
                        <option value="shipper">Shipper</option>
                        <option value="carrier">Carrier</option>
                        <option value="partner">Partner</option>
                    </select>
                    <input type="text" id="fname" name="firstname" placeholder="First Name..">
                    <input type="text" id="lname" name="lastname" placeholder="Last Name..">
                    <input type="text" id="email" name="email" placeholder="Your email address..">
                    <input type="text" id="pass" name="pass" placeholder="Password..">
                    <input type="submit" value="Sign Up">
                    <p>
                        Already have an Account?  
                        <a href="/login" class="nav__link" data-link id = "login">Login Here</a>
                    </p>
                    
                </form>
                <div class="graphic">
                </div>
            </div>
        `;
    }
}