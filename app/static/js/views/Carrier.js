import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle("Rental App");
    }

    async getHtml() {
        return `
            <h1>This is Carrier View</h1>
            <p>In this app view we will have Carrier information</p>
        `;
    }
}