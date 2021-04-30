import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
    }

    async getJS(){
        //render rental info
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
                let rental = res.rental
                let rentalType = res.message
                switch(rentalType){
                    case 'notexist':
                        $('#rental-view').html(`
                            <h1 id = 'rental-title'>No Such Rental</h1>
                            <div id='info'></div>
                        `)
                        break
                    case 'truck':
                        $('#rental-view').html(`
                            <h1 id = 'rental-title'>Truck Rental</h1>
                            <div id='info'>
                                <p id='t-t'>Type:</p>
                                <p id='t-o'>`+ rental.truckType +`</p>

                                <p id='ma-t'>Make:</p>
                                <p id='ma-o'>`+ rental.make +`</p>

                                <p id='mo-t'>Model:</p>
                                <p id='mo-o'>`+ rental.model +`</p>

                                <p id='y-t'>Year:</p>
                                <p id='y-o'>`+ rental.year +`</p>

                                <p id='od-t'>Odometer:</p>
                                <p id='od-o'>`+ rental.odometer +`</p>

                                <p id='p-t'>Price:</p>
                                <p id='p-o'>`+ rental.price +`</p>
                            </div>
                            <div id='rbtns'>
                            </div>
                        `)
                        break
                    case 'trailer':
                        $('#rental-view').html(`
                            <h1 id = 'rental-title'>Trailer Rental</h1>
                            <div id='info'>
                                <p id='t-t'>Type:</p>
                                <p id='t-o'>`+ rental.trailerType +`</p>

                                <p id='ma-t'>Make:</p>
                                <p id='ma-o'>`+ rental.manuf +`</p>

                                <p id='mo-t'>Body Length:</p>
                                <p id='mo-o'>`+ rental.bodyLength +`</p>

                                <p id='y-t'>Year:</p>
                                <p id='y-o'>`+ rental.year +`</p>

                                <p id='od-t'>Odometer:</p>
                                <p id='od-o'>`+ rental.odometer +`</p>

                                <p id='p-t'>Price:</p>
                                <p id='p-o'>`+ rental.price +`</p>
                            </div>
                            <div id='rbtns'>
                            </div>
                        `)
                        break
                }
                if(rental.renterId == 'available'){
                    var token = localStorage.getItem('token')
                    let authReq = {
                        token : token
                    }
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "http://localhost:5040"
                        },
                        type: 'post',
                        url : "http://localhost:5050/login/auth",
                        data: JSON.stringify(authReq),
                        'success': function(res){
                            if(res.utype == undefined){
                                var reftoken = localStorage.getItem('reftoken')
                                authReq = {
                                    reftoken: reftoken
                                }
                                $.ajax({
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        "Access-Control-Allow-Origin": "http://localhost:5040"
                                    },
                                    type: 'post',
                                    url : "http://localhost:5050/login/token",
                                    data: JSON.stringify(authReq),
                                    'success': function(res){
                                        if(res.status == 'ok'){
                                            localStorage.setItem('token', res.token)
                                            authReq = {
                                                token : res.token
                                            }
                                            $.ajax({
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json',
                                                    "Access-Control-Allow-Origin": "http://localhost:5040"
                                                },
                                                type: 'post',
                                                url : "http://localhost:5050/login/auth",
                                                data: JSON.stringify(authReq),
                                                'success': function(res){
                                                    if(res.status = 'ok'){
                                                        if(res.uid == rental.ownerId){
                                                            $('#rbtns').html(`
                                                                <div class='edit'>
                                                                    <p>Edit Rental<p>
                                                                </div>
                                                            `)
                                                        }else if(res.utype == 'carrier'){
                                                            $('#rbtns').html(`
                                                                <div class='rent'>
                                                                    <p>Rent Rental<p>
                                                                </div>
                                                            `)
                                                        }
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }else{
                                if(res.uid == rental.ownerId){
                                    $('#rbtns').html(`
                                        <div class='edit'>
                                            <p>Edit Rental<p>
                                        </div>
                                    `)
                                }else if(res.utype == 'carrier'){
                                    $('#rbtns').html(`
                                        <div class='rent'>
                                            <p>Rent Rental<p>
                                        </div>
                                    `)
                                }
                            }
                            

                            $('#rbtns>.rent').click(function(){
                                //Update truck renter id
                                let did = res.uid
                                $.ajax({
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        "Access-Control-Allow-Origin": "http://localhost:5040"
                                    },
                                    type: 'PUT',
                                    url : 'http://localhost:5050/rental/'+ rentalType + '/' + rental._id,
                                    data: JSON.stringify({renterId: did}),
                                    'success': function(res){
                                        window.location.href = '/carrier/' + did
                                    }
                                })
                            })
                        }
                    })
                }
            }
        })
    }

    async getHtml() {
        return `
            <div id = 'rental-view'>
            </div>
        `;
    }
}