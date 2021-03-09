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
                    <h1>Givings loads across the world</h1>
                    <p>Earn and grow with transparent logistics.</p>
                    <img src="/static/assets/landing-page/map.svg" alt="map svg">
            </div>
            <div id="ls2">
                <h1>Carriers</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in justo massa. Ut sollicitudin tortor at nibh interdum molestie. In vitae commodo nunc. </p>
                <img src="/static/assets/landing-page/truck.svg" alt="struck svg">
                <button class = 'lmc'><span class = 'lmc'>Learn More </span></button>
            </div>
            <div id="ls3">
                <h1>Shippers</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in justo massa. Ut sollicitudin tortor at nibh interdum molestie. In vitae commodo nunc. </p>
                <img src="/static/assets/landing-page/warehouse.svg" alt="warehouse svg">
                <button class = 'lms'><span class = 'lms'>Learn More </span></button>
            </div>
            <div id="ls4">
                <h1>Partners</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in justo massa. Ut sollicitudin tortor at nibh interdum molestie. In vitae commodo nunc. </p>
                <img src="/static/assets/landing-page/fleet.svg" alt="fleet svg">
                <button class = 'lmp'><span class = 'lmp'>Learn More </span></button>
            </div>
        </div>
        `;
    }

}