import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getJS(){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:5040"
            },
            type: 'GET',
            url : 'http://localhost:5050/rental/' + this.params.id,
            'success': function(res){
                console.log(res)
            }
        })
    }

    async getHtml() {
        return `

        `;
    }
}