import Home from "./views/Home.js";
import About from "./views/About.js";
import Partner from "./views/Partner.js";
import PartnerView from "./views/PartnerView.js";
import Carrier from "./views/Carrier.js";
import CarrierView from "./views/CarrierView.js";
import Shipper from "./views/Shipper.js";
import ShipperView from "./views/ShipperView.js";
import Rental from "./views/Rental.js";
import RentalView from "./views/RentalView.js";
import Order from "./views/Order.js";
import OrderView from "./views/OrderView.js";
import Login from "./views/Login.js";
import Construction from "./views/ConstructionView.js";

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
        { path: "/rental", view: Construction},
        { path: "/rental/:id", view: Construction},
        { path: "/order", view: Order},
        { path: "/order/:id", view: OrderView},
        { path: "/login", view: Login},
        { path: "/shipper", view: Shipper},
        { path: "/shipper/:id", view: ShipperView},
        { path: "/about", view: About},
        { path: "/careers", view: Construction},
        { path: "/signup", view: Construction},
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
    document.querySelector('.app>#app').innerHTML = await view.getHtml();
    document.querySelector('.app>header>#navbar').innerHTML = await view.getNav();
    document.querySelector('.app>#footer').innerHTML = await view.getFooter();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        console.log('debugging: ', e)
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            console.log(e.target.href)
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