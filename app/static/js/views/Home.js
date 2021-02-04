import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Rental App");
    }

    async getHtml() {
        return `
        <section class="featured">
            <h2 class="section-title">Featured Rentals</h2>
            <div class="split">
                <a href="#" class="featured-rental">
                    <img src="/static/assets/home/featured/cooltruck.jpg" alt="" class="featured-img">
                    <h5 class="featured-details">Cool Truck</h5>
                    <h6 class="featured-price">$1500/month</h6>
                </a>
                <a href="#" class="featured-rental">
                    <img src="/static/assets/home/featured/trailer.jpg" alt="" class="featured-img">
                    <h5 class="featured-details">Fridge Trailer</h5>
                    <h6 class="featured-price">$1650/month</h6>
                </a>
                <a href="#" class="featured-rental">
                    <img src="/static/assets/home/featured/oldtruck.jpg" alt="" class="featured-img">
                    <h5 class="featured-details">Old Reliable Truck</h5>
                    <h6 class="featured-price">$930/month</h6>
                </a>
            </div>
        </section>
        <br>
        <section class="services">
            <h2 class="section-title">Our Services</h2>
            <article class="service">
                <img src="/static/assets/home/services/fleet.jpg" alt="" class="service-img">
                <h4 class="service">Rentals</h3>
                <p class="service-details">
                    Find the best Trucks and Trailers for rent nearby.
                </p>
                <a href="" class="sbtn nav__link">View More</a>
            </article>
            <article class="service">
                <img src="/static/assets/home/services/trucker.jpg" alt="" class="service-img">
                <h4 class="service">Carriers</h3>
                <p class="service-details">
                    Streamline your transportation rental needs to get your business operating at 
                    full speed. Keep track of your rental expenses with our online rental 
                    tracking services. Easily upgrade, expand, and further grow your business with Rental Web App.
                </p>
                <a href="" class="sbtn nav__link">View More</a>
            </article>
            <article class="service">
                <img src="/static/assets/home/services/trucksonroad.jpg" alt="" class="service-img">
                <h4 class="service">Partners</h3>
                <p class="service-details">
                    Make your Truck and Trailers work for you. Earn through leasing out your fleet 
                    and help freight move.
                </p>
                <a href="" class="sbtn nav__link">View More</a>
            </article>
        </section>
        `;
    }

}