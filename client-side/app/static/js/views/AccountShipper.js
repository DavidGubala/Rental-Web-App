import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml() {
        console.log(this.params.id)
        return `
            <h1>Now Viewing a specific shipper</h1>
            <p>In this app view we will show information about a specific shipper</p>
        `;
    }
}