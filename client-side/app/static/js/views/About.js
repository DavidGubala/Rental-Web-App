import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml() {
        return `
        <div class="about-page">
            <div id="as1">
                <h1>Our Vision</h1>
                <p>
                    At Shipper, we focus our effort in challening the status quo and thinking differently.
                    Our products help envision a world in which everyone is given opportunity through an open 
                    logistics platform with a seamless user experience built on the most 
                    sophisticated technology.
                </p>
                <img src="/static/assets/about-page/about-s1.png" alt="trucks">
            </div>
            <div id="as2">
                <h2>All Bases Covered</h2>
                <img id ='i1' src="/static/assets/about-page/coffee.png" alt="coffee">
                <img id ='i2' src="/static/assets/about-page/trucks.png" alt="trucks">
                <img id ='i3' src="/static/assets/about-page/forklift.png" alt="forklift">
            </div>
            <div id="as3">
                <h1>Benefits</h1>
                <br>
                <p>Access our services through all devices</p>
                <div id = 'shipperb'>
                    <h3 id = 'btitle'>Shipper</h3>
                    <div id = "b1">
                        <img src="/static/assets/about-page/benefits/sb1.svg" alt="coffee">
                        <p>benefit 1</p>
                    </div>
                    <div id = "b2">
                        <img src="/static/assets/about-page/benefits/sb2.svg" alt="coffee">
                        <p>benefit 2</p>
                    </div>
                </div>
                <div id = 'carrierb'>
                    <h3 id = 'btitle'>Carrier</h3>
                    <div id = "b1">
                        <img src="/static/assets/about-page/benefits/cb1.svg" alt="coffee">
                        <p>benefit 3</p>
                    </div>
                    <div id = "b2">
                        <img src="/static/assets/about-page/benefits/cb2.svg" alt="coffee">
                        <p>benefit 4</p>
                    </div>
                </div>
                <div id = 'partnerb'>
                    <h3 id = 'btitle'>Partner</h3>
                    <div id = "b1">
                        <img src="/static/assets/about-page/benefits/pb1.svg" alt="coffee">
                        <p>benefit 5</p>
                    </div>
                    <div id = "b2">
                        <img src="/static/assets/about-page/benefits/pb2.svg" alt="coffee">
                        <p>benefit 6</p>
                    </div>
                </div>
            </div>
            <div id="as4">
                <h1>Values</h1>
                <p>
                    We value you. All of our Shippers, Carrier, and Partners play an 
                    important role in success of the worlds logistics. We could not 
                    be more proud of our relationship and look forward to the future.
                </p>
                <img src="/static/assets/about-page/employee.png" alt="coffee">
            </div>
        </div>
        `;
    }
}