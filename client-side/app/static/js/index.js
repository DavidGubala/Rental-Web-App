import Home from "./views/Home.js";
import About from "./views/About.js";
import Partner from "./views/Partner.js";
import PartnerView from "./views/AccountPartner.js";
import Carrier from "./views/Carrier.js";
import CarrierView from "./views/AccountCarrier.js";
import Shipper from "./views/Shipper.js";
import ShipperView from "./views/AccountShipper.js";
import Rental from "./views/Rental.js";
import RentalView from "./views/RentalView.js";
import OrderView from "./views/OrderView.js";
import Login from "./views/Login.js";
import Register from "./views/Register.js";
import Construction from "./views/ConstructionView.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key,i) => {
        return [key, values[i]];
    }));

};

export const NavigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async() => {
    const routes = [
        { path: "/", view: Home },
        { path: "/partner", view: Partner},
        { path: "/partner/:id", view: PartnerView},
        { path: "/carrier", view: Carrier},
        { path: "/carrier/:id", view: CarrierView},
        { path: "/load", view: Construction},
        { path: "/load/:id", view: Construction},
        { path: "/rental", view: Rental},
        { path: "/rental/:id", view: RentalView},
        { path: "/order/:id", view: OrderView},
        { path: "/login", view: Login},
        { path: "/register", view: Register},
        { path: "/shipper", view: Shipper},
        { path: "/shipper/:id", view: ShipperView},
        { path: "/about", view: About},
        { path: "/careers", view: Construction}
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
    match = {
        route: routes[0],
        result: [location.pathname]
    };
    }

    const view = new match.route.view(getParams(match));
    document.body.scrollTop = 0;
    await view.authenticate();
    $('.app>#app').html(await view.getHtml());
    $('.app>header>#navbar').html(await view.getNav());
    $('.app>#footer').html(await view.getFooter());

    
    await view.getNavJS();
    await view.getJS();
    //document.querySelector('.app>#app').innerHTML = await view.getHtml();
    //document.querySelector('.app>header>#navbar').innerHTML = await view.getNav();
    //document.querySelector('.app>#footer').innerHTML = await view.getFooter();
};

window.addEventListener("popstate", router);

document.body.addEventListener("click", e => {
    console.log(e.target)
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        NavigateTo(e.target.href);
    }
    if (e.target.matches(".logo")) {
        e.preventDefault();
        NavigateTo("/");
    }
    if (e.target.matches(".lmc")){
        NavigateTo("/carrier");
    }
    if (e.target.matches(".lmp")){
        NavigateTo("/partner");
    }
    if (e.target.matches(".lms")){
        NavigateTo("/shipper");
    }
    if (e.target.matches(".su")){
        if(localStorage.getItem('token')==undefined){
            NavigateTo("/register");
        }else{
            e.preventDefault();
        }
    }
    if (e.target.matches(".gbh")){
        NavigateTo("/");
    }
    if (e.target.matches("#login-icon")){
        e.preventDefault();
        NavigateTo("/login");
    }
    if (e.target.matches(".account-nav-btn")){
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
                                            NavigateTo(`/` + res.utype + `/` + res.uid)
                                        }
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
                }else{
                    NavigateTo(`/` + res.utype + `/` + res.uid)
                }
            }
        })
    }
    if (e.target.matches("#account-icon")){
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
                                            NavigateTo(`/` + res.utype + `/` + res.uid)
                                        }
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
                }else{
                    NavigateTo(`/` + res.utype + `/` + res.uid)
                }
            }
        })
    }
    if (e.target.matches("#sl" || e.target.matches("#cl") || e.target.matches("#pl"))) {
        e.preventDefault();
        document.body.scrollTop = (e.target.href);
    }
});
router();