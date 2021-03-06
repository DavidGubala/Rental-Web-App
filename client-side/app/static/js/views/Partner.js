import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml() {
        return `
        <div id="partner-info">
        <div id="pi1">
                <h1>Partners</h1>
                <p>
                    With automatic rental management options. 
                    and Shipper is helping give control to Partners 
                </p>
                <button class = 'su'><span class = 'su'>Sign Up</span></button>
        </div>
        <div id="pi2">
            <div id="t1">
                <img src="/static/assets/carrier-info-page/check.svg" alt="fleet svg">
                <h4>Hassle-Free Renting</h4>
                <p>Throw out the paperwork and let our automation do your work</p>
            </div>
            <div id="t2">
                <img src="/static/assets/carrier-info-page/money.svg" alt="fleet svg">
                <h4>Quick Pay</h4>
                <p>Get on-time guaranteed payments for your assets. </p>
            </div>
            <div id="t3">
                <img src="/static/assets/carrier-info-page/question.svg" alt="fleet svg">
                <h4>The More you Know...</h4>
                <p>Upfront renter details, payment management and asset return policy. </p>
            </div>
        </div>
        <div id="pi3">
            <p>seciton 3</p>
        </div>
    </div>
        `;
    }
}