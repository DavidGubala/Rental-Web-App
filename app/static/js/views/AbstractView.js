export default class{
    constructor(params) {
        this.params = params;
        //console.log(params);
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml(){
        return ``;
    }

    async getNav(){ // eventually I'll use the backend to check if the user is logged in and change this from having Login/Signup
        return `
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
        <a href="/signup" class="nav__link btn" data-link id = "signup">Sign Up</a>
        `;
    }
    async getFooter(){
        return `
        <div class="cont">
            <a href="/" class="foot__link" data-link id = "logo"><img class="logo" src="/static/assets/footer-logo.svg" alt="site logo"></a>
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