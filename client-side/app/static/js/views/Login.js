import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml() {
        return `
            <h1>This is Login View</h1>
            <p>In this app view we will have a way for users to login or sign up for this service</p>
        `;
    }
}