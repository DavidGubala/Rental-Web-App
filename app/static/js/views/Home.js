import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Rental App");
    }

    async getHtml() {
        return `
            <h1>This is Home View</h1>
            <p>In this app view we will have a basic landing page with links to services.</p>
        `;
    }
}