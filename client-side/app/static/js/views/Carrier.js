import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml() {
        return `
        <div id="carrier-info">
            <div id="ci1">
                    <h1>Carriers</h1>
                    <p>
                        With upfront pricing, instant booking, quick pay, and quality rentals, 
                        Shipper puts you in the driver's seat. It's the one app for every haul.
                    </p>
                    <button class = 'su'><span class = 'su'>Sign Up</span></button>
            </div>
            <div id="ci2">
                <div id="t1">
                    <img src="/static/assets/carrier-info-page/check.svg" alt="fleet svg">
                    <h4>Hassle-Free Booking</h4>
                    <p>It's time to end the confucion. Book the loads you want, 24/7/365.</p>
                </div>
                <div id="t2">
                    <img src="/static/assets/carrier-info-page/money.svg" alt="fleet svg">
                    <h4>Quick Pay</h4>
                    <p>Don't get payed at the end of the week. Get payed when you submit your POD.</p>
                </div>
                <div id="t3">
                    <img src="/static/assets/carrier-info-page/question.svg" alt="fleet svg">
                    <h4>Know Before You Go</h4>
                    <p>Upfront facility details and return load booking all available on mobile or web.</p>
                </div>
            </div>
            <div id="ci3">
                <p>seciton 3</p>
            </div>
        </div>
        `;
    }
}