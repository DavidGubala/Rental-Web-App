import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getJS(token){
        $('.userType').change(function() {
            switch($('.userType').val()){
                case 'shipper':
                    $('.register-graphic').html('<img src="/static/assets/landing-page/warehouse.svg" alt="warehouse svg">')
                    break
                case 'carrier':
                    $('.register-graphic').html('<img src="/static/assets/landing-page/truck.svg" alt="struck svg">')
                    break
                case 'partner':
                    $('.register-graphic').html('<img src="/static/assets/landing-page/fleet.svg" alt="fleet svg">')
                    break
            }
        });
        
        var passwordsMatch = false;
        
        var checkEmptyPass = () => {
            if($('#pass').val() == '' && $('#cpass').val() == ''){
                $('.register-form>#err').html('')
            }
            if($('#pass').val() == '' || $('#cpass').val() == ''){
                return false
            }
            return true
        }

        $('#cpass').change(function() {
            //Used to Error check and make sure the passwords match 
            if(checkEmptyPass()){
                if($('#pass').val() == $('#cpass').val()){
                    $('.register-form>#err').html('')
                    passwordsMatch = true;
                }else{
                    $('.register-form>#err').html('<p>Passwords do not match</p>')
                    passwordsMatch = false;
                }
            }
        });

        $('#pass').change(function() {
            //Used to Error check and make sure the passwords match
            if(checkEmptyPass()){
                if($('#pass').val() == $('#cpass').val()){
                    $('.register-form>#err').html('')
                    passwordsMatch = true;
                }else{
                    $('.register-form>#err').html('<p>Passwords do not match</p>')
                    passwordsMatch = false;
                }
            }
        });

        $( ".register-form" ).submit(function( event ) {
            event.preventDefault();
            //Declare all variables from form
            if(passwordsMatch){
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
                                            localStorage.setItem('token', res.token)
                                            localStorage.setItem('reftoken', res.reftoken)
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
                                        }else{
                                            //Here we can send messages like 'wrong password'
                                            // or 'email not registered'
                                            //for not generate err message 
                                            $('.register-form>#err').html('<p>Something went wrong</p>')
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }else{
                alert('Passwords do not match')
            }
          });
    }

    async getHtml() {
        return `
            <div class="register">
                <form class="register-form">
                    <h1>Register Here</h1>
                    <div id='err'></div>
                    <select class="userType" name="userType" required>
                        <option value="" disabled selected>Select Account Type..</option>    
                        <option value="shipper">Shipper</option>
                        <option value="carrier">Carrier</option>
                        <option value="partner">Partner</option>
                    </select>
                    <input type="text" id="fname" name="firstname" placeholder="First Name.." required>
                    <input type="text" id="lname" name="lastname" placeholder="Last Name.." required>
                    <input type="text" id="email" name="email" placeholder="Your email address.." required>
                    <input type="password" id="pass" name="pass" placeholder="Password.." required>
                    <input type="password" id="cpass" name="cpass" placeholder="Confirm Password.." required>
                    <input type="submit" value="Sign Up">
                    <p>
                        Already have an Account?\n  
                        <a href="/login" class="nav__link" data-link id = "login">Login Here</a>
                    </p>
                </form>
                <div class="register-graphic">
                </div>
            </div>
        `;
    }
}