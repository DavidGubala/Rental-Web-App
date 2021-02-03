import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Rental App");
    }

    async getHtml() {
        return `
            <h1>Welcome to Rentals Web App</h1>
            <p>This is a Web App where you can sign up as a Carrier or a Partner</p>
        `;
    }

}