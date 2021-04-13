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

        $( ".login-form" ).submit(function( event ) {
            //alert( "Handler for .submit() called." );
            event.preventDefault();
            //Declare all variables from form
            let ut = $('.userType').val()
            let em = $('#email').val()
            let p = $('#pass').val()
            var login ={
                loginType: ut,
                email: em,
                pass: p
            }
            let link = 'http://localhost:5050/login'

            //Ajax call to create the new user
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
                    window.location.href = typelink + res.uid
                    }
                }
            });
          });
    }

    async getHtml() {
        return `
            <div class="login">
                <form class="login-form">
                    <h1>Login</h1>
                    <select class="userType" name="userType">
                        <option value="" disabled selected>Select Account Type..</option>    
                        <option value="shipper">Shipper</option>
                        <option value="carrier">Carrier</option>
                        <option value="partner">Partner</option>
                    </select>
                    <input type="text" id="email" name="email" placeholder="Your email address..">
                    <input type="text" id="pass" name="pass" placeholder="Password..">
                    <input type="submit" value="Sign In">
                    <p>
                        Don't have an Account?  
                        <a href="/register" class="nav__link" data-link id = "register">Register Here</a>
                    </p>
                </form>
                <div class="graphic">
                </div>
            </div>
        `;
    }
}