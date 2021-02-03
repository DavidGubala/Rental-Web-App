import Home from "./views/Home.js";
import Partner from "./views/Partner.js";
import Carrier from "./views/Carrier.js";
import Rental from "./views/Rental.js";
import Order from "./views/Order.js";
import Login from "./views/Login.js";

const NavigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async() => {
    const routes = [
        { path: "/", view: Home },
        { path: "/partner", view: Partner},
        { path: "/carrier", view: Carrier},
        { path: "/rental", view: Rental},
        { path: "/order", view: Order},
        { path: "/login", view: Login},
    ];
 
    //Test each route for match

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };

    }

    const view = new match.route.view();

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