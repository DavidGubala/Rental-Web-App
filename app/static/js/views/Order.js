import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle("Rental App");
    }

    async getHtml() {
        return `
            <h1>This is Orders View</h1>
            <p>In this app view we will show order details (who rented what? when? for how much? from/to who?)</p>
        `;
    }
}