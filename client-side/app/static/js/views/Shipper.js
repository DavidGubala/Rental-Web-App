import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml() {
        return `
        <div id="shipper-info">
        <div id="si1">
                <h1>Shippers</h1>
                <p>
                    With instant quotes, real-time tracking, and 24/7 access to trusted carriers, 
                    Shipper helps streamline your operations.
                </p>
                <button class = 'su'><span class = 'su'>Sign Up</span></button>
        </div>
        <div id="si2">
            <div id="t1">
                <img src="/static/assets/carrier-info-page/check.svg" alt="fleet svg">
                <h4>Hassle-Free Load Fulfilment</h4>
                <p>
                    Throw out the paperwork and let our automation do your work
                </p>
            </div>
            <div id="t2">
                <img src="/static/assets/carrier-info-page/money.svg" alt="fleet svg">
                <h4>Streamline your supply chain</h4>
                <p>
                    Management software along with load fulfilment brings your warehouse 
                    to the next level.
                </p>
            </div>
            <div id="t3">
                <img src="/static/assets/carrier-info-page/question.svg" alt="fleet svg">
                <h4>The More you Know...</h4>
                <p>
                    Guarenteed trusted carriers, hual details, payment management and delivery confirmation.
                </p>
            </div>
        </div>
        <div id="si3">
            <p>seciton 3</p>
        </div>
    </div>
        `;
    }
}