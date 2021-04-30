export default class{
    constructor(params) {
        this.params = params;
        //console.log(params);
    }

    setTitle(title) {
        document.title = "Shipper"
    }

    async getHtml(){
        return ``
    }

    async getJS(){
        return ''
    }

    authenticate = async() => {
        var token = localStorage.getItem('token')
        var reftoken = localStorage.getItem('reftoken')
        if(token == undefined || reftoken == undefined){
            return null
        }else{
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
                    if(res.status == '403'){
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
                                            if(res.status == '403'){
                                                localStorage.removeItem('token')
                                                localStorage.removeItem('reftoken')
                                            }
                                        }
                                    })
                                }else if(res.status == '403'){
                                    localStorage.removeItem('token')
                                    localStorage.removeItem('reftoken')
                                }
                                
                            }
                        })
                    }
                }
            })
        }
    }

    async getNavJS(){
        if(!(localStorage.getItem('token') == undefined)){
            console.log('adding funcs')
            $('.sign-out-btn').click(function(){
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "http://localhost:5040"
                    },
                    type: 'delete',
                    url : "http://localhost:5050/login/token",
                    data: JSON.stringify({reftok : localStorage.getItem('reftoken')}),
                    'success': function(res){
                        localStorage.removeItem('token')
                        localStorage.removeItem('reftoken')
                        window.location.href = '/'
                    }
                })
            })
        }
    }

    async getNav(){
        // eventually I'll use the backend to check if the usser is logged in and change this from having Login/Signup
        let content = ''
        if(localStorage.getItem('token') == undefined){
            content =  `
            <a href="/" class="nav__link" data-link id = "logo"><img class="logo" src="/static/assets/nav-bar/logo.svg" alt="site logo"></a>
            <a href="/shipper" class="nav__link" data-link id = "shipper">Shipper</a>
            <a href="/carrier" class="nav__link" data-link id = "carrier">Carrier</a>
            <a href="/partner" class="nav__link" data-link id = "partner">Partner</a>
            <a href="/about" class="nav__link" data-link id = "about">About</a>
            <div id = "services">
                <a>Services<img id = "service-icon" src="/static/assets/nav-bar/icons/services-icon.svg"></a>
                <ul class = "sub-menu">
                    <li><a href="/rental" class="nav__link" data-link id = 'rentals'>Rentals</a></li>
                    <li><a href="/load" class="nav__link" data-link id = 'loads'>Loads</a></li>
                </ul>
            </div>
            
            <a href="/login" class="nav__link" data-link id = "login">Login<img id="login-icon" src="/static/assets/nav-bar/icons/account-icon.svg"></a>
            <a href="/register" class="nav__link btn" data-link id = "signup">Sign Up</a>
            `
        }else{
            content = `
            <a href="/" class="nav__link" data-link id = "logo"><img class="logo" src="/static/assets/nav-bar/logo.svg" alt="site logo"></a>
            <a href="/shipper" class="nav__link" data-link id = "shipper">Shipper</a>
            <a href="/carrier" class="nav__link" data-link id = "carrier">Carrier</a>
            <a href="/partner" class="nav__link" data-link id = "partner">Partner</a>
            <a href="/about" class="nav__link" data-link id = "about">About</a>
            <div id = "services">
                <a>Services<img id = "service-icon" src="/static/assets/nav-bar/icons/services-icon.svg"></a>
                <ul class = "sub-menu">
                    <li><a href="/rental" class="nav__link" data-link id = 'rentals'>Rentals</a></li>
                    <li><a href="/load" class="nav__link" data-link id = 'loads'>Loads</a></li>
                </ul>
            </div>
            
            <a class="nav__link account-nav-btn" id = "login">Account<img id="account-icon" src="/static/assets/nav-bar/icons/account-icon.svg"></a>
            <a class="nav__link sign-out-btn btn" id = "signup">Sign Out</a>
            `
        }

        return content
    }
    async getFooter(){
        return `
        <div class="cont">
            <a href="/" class="foot__link" data-link id = "logo"><img class="logo" src="/static/assets/footer-logo.svg" alt="site logo"></a>
            <div class="cprght">
                <p>&copy; Copyright 2021 Shipper L.L.C.</p>
            </div>
            <div class="people">
                <h3>People</h3>
                <a href="/shipper" class="foot__link" data-link id = "shipper">Shipper</a>
                <a href="/carrier" class="foot__link" data-link id = "carrier">Carrier</a>
                <a href="/partner" class="foot__link" data-link id = "partner">Partner</a>
            </div>
            <div class="company">
                <h3>Company</h3>
                <a href="/about" class="foot__link" data-link id = "about">About</a>
                <a href="/careers" class="foot__link" data-link id = "carreers">Careers</a>
            </div>
            <div class="services">
                <h3>Services</h3>
                <a href="/rental" class="foot__link" data-link id = "rentals">Rentals</a>
                <a href="/load" class="foot__link" data-link id = "loads">Loads</a>
            </div>
        </div>
        `;
    }
}