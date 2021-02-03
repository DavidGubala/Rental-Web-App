import Home from "./views/Home.js";
import Partner from "./views/Partner.js";
import PartnerView from "./views/PartnerView.js";
import Carrier from "./views/Carrier.js";
import CarrierView from "./views/CarrierView.js";
import Rental from "./views/Rental.js";
import RentalView from "./views/RentalView.js";
import Order from "./views/Order.js";
import OrderView from "./views/OrderView.js";
import Login from "./views/Login.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    //console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)));

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
        { path: "/rental", view: Rental},
        { path: "/rental/:id", view: RentalView},
        { path: "/order", view: Order},
        { path: "/order/:id", view: OrderView},
        { path: "/login", view: Login},
    ];
 
    //Test each route for match

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

    document.querySelector('#app').innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")){
            e.preventDefault();
            NavigateTo(e.target.href);
        }
    });
    router();
});