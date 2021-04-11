import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getJS(token){
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
            //Declare all variables from form
            let ut = $('.userType').val()
            let fn = $('#fname').val()
            let ln = $('#lname').val()
            let em = $('#email').val()
            let p = $('#pass').val()
            // Here we can have checks
            // for now, ill just assume user types in things correctly
            // after checks, send a request to the backend.
            // create json data for creating a new user based on user type and creating a login
            var newUser = {
                "fname": fn,
                "lname": ln,
                "email": em
            }
            var newLogin ={}
            var login ={}
            console.log(newUser)
            let link = ''
            switch(ut){
                case 'shipper':
                    link = 'http://localhost:5050/shipper'
                    break
                case 'carrier':
                    link = 'http://localhost:5050/carrier'
                    break
                case 'partner':
                    link = 'http://localhost:5050/partner'
                    break
            }

            //Ajax call to create the new user
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://localhost:5040"
                },
                type: 'POST',
                url : link,
                data: JSON.stringify(newUser),
                'success': function(res){
                    console.log(res)
                    let newUserId = res._id
                    newLogin = {
                        'uid': newUserId,
                        'pass': $('#pass').val()
                    }
                    //Ajax call to register the new user (add userid and pass to db)
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "http://localhost:5040"
                        },
                        type: 'POST',
                        url : 'http://localhost:5050/login/register',
                        data: JSON.stringify(newLogin),
                        'success': function(res){
                            console.log(res)
                            login = {
                                'loginType': ut,
                                'email': em,
                                'pass':  p
                            }
                            console.log(login)
                            //Ajax call to login the user once they have registered
                            $.ajax({
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    "Access-Control-Allow-Origin": "http://localhost:5040"
                                },
                                type: 'POST',
                                url : 'http://localhost:5050/login',
                                data: JSON.stringify(login),
                                'success': function(res){
                                    if(res.status == 'ok'){
                                        localStorage.setItem('token', res.data)
                                        let typelink = ''
                                        switch(ut){
                                            case 'shipper':
                                                typelink = '/shipper/'
                                                break
                                            case 'carrier':
                                                typelink = '/carrier/'
                                                break
                                            case 'partner':
                                                typelink = '/partner/'
                                                break
                                        }
                                        window.location.href = typelink + newUserId
                                    }
                                }
                            });
                        }
                    });
                }
            });
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