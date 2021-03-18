import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getHtml() {
        return `
        <div id="construction">
            <h2>Under Construction</h2>
            <img src="/static/assets/construction/wrench.svg" alt="struck svg">
            <button class = 'gbh'><span class = 'gbh'>Go Back Home</span></button>
        </div>
        `;
    }
}