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

localStorage.setItem('token', 0)

$(function() {
    const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

    const getParams = match => {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
        return Object.fromEntries(keys.map((key,i) => {
            return [key, values[i]];
        }));

    };

    const NavigateTo = url => {
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
        
		$('.app>#app').html(await view.getHtml());
		$('.app>header>#navbar').html(await view.getNav(localStorage.getItem('token')));
		$('.app>#footer').html(await view.getFooter());
        await view.getJS();

        //document.querySelector('.app>#app').innerHTML = await view.getHtml();
        //document.querySelector('.app>header>#navbar').innerHTML = await view.getNav();
        //document.querySelector('.app>#footer').innerHTML = await view.getFooter();
    };
    
    window.addEventListener("popstate", router);

    document.body.addEventListener("click", e => {
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
            NavigateTo("/register");
        }
        if (e.target.matches(".gbh")){
            NavigateTo("/");
        }
        if (e.target.matches("#login-icon")){
            e.preventDefault();
            NavigateTo("/login");
        }
        if (e.target.matches("#sl" || e.target.matches("#cl") || e.target.matches("#pl"))) {
            e.preventDefault();
            document.body.scrollTop = (e.target.href);
        }
    });
    router();
});