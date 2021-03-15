import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Rental App");
    }

    async getHtml() {
        return `
        <div id="landing">
            <div id="ls1">
                    <h1>Giving loads across the globe</h1>
                    <p>Earn and grow with transparent logistics.</p>
                    <img src="/static/assets/landing-page/map1.svg" alt="map svg">
                    <div id = 'cl'>
                        <a href = '#ls2' >Carrier</a>
                        <img id = 'la1' src="/static/assets/landing-page/arrow-down.svg" alt="arrow">
                    </div>
                    <div id = 'pl'>
                        <a href = '#ls4'>Partner</a>
                        <img id = 'la2' src="/static/assets/landing-page/arrow-down.svg" alt="arrow">
                    </div>
                    <div id = 'sl'>
                        <a href = '#ls3'>Shipper</a>
                        <img id = 'la3' src="/static/assets/landing-page/arrow-down.svg" alt="arrow">
                    </div>
                    
            </div>
            <div id="ls2">
                <h1>Carriers</h1>
                <p>
                    Sign up as a Carrier and start earning with Load and Rental programs.
                </p>
                <img src="/static/assets/landing-page/truck.svg" alt="struck svg">
                <button class = 'lmc'><span class = 'lmc'>Learn More </span></button>
            </div>
            <div id="ls3">
                <h1>Shippers</h1>
                <p>
                    Sign up your warehouse and get those loads moving with our organized, safe, and time-saving platform.
                </p>
                <img src="/static/assets/landing-page/warehouse.svg" alt="warehouse svg">
                <button class = 'lms'><span class = 'lms'>Learn More </span></button>
            </div>
            <div id="ls4">
                <h1>Partners</h1>
                <p>
                    Sign up and manage your fleet of assets through our sophisticated renting platform.
                </p>
                <img src="/static/assets/landing-page/fleet.svg" alt="fleet svg">
                <button class = 'lmp'><span class = 'lmp'>Learn More </span></button>
            </div>
        </div>
        `;
    }

}