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
            url : 'http://localhost:5050/rental/inventory',
            'success': function(res){
                console.log(res)
                let currentRentals = ``
                let rentedRentals = ``
                // fill out rental
                $.each(res ,function(rentalType) {
                    $.each(res[rentalType] ,function(rental) {
                        //console.log(res[rentalType][rental])
                        let rentalContent = ''
                        
                        console.log(rentalType)
                        switch(rentalType){
                            case 'trucks':
                                rentalContent = `
                                <div id = 'rental-list-item'>
                                    <div id = rental-slideshow><p>` + rentalType + ` photo</p></div>
                                    <p>Trailer Type: ` + res[rentalType][rental]['truckType'] + `</p>
                                    <p>Make : ` + res[rentalType][rental]['make'] + `</p>
                                    <p>Model: ` + res[rentalType][rental]['model'] + `</p>
                                    <p>Year: ` + res[rentalType][rental]['year'] + `</p>
                                    <p>Odometer: ` + res[rentalType][rental]['odometer'] + `</p>
                                    <p>Price: ` + res[rentalType][rental]['price'] + `</p>
                                    <div class='view-rental-btn' id='`+ res[rentalType][rental]['_id'] + `'>View Rental</div>
                                </div>
                                `
                                break
                            case 'trailers':
                                rentalContent = `
                                <div id = 'rental-list-item'>
                                    <div id = rental-slideshow><p>` + rentalType + ` photo</p></div>
                                    <p>Truck Type: ` + res[rentalType][rental]['trailerType'] + `</p>
                                    <p>Manufacturer : ` + res[rentalType][rental]['manuf'] + `</p>
                                    <p>Model: ` + res[rentalType][rental]['model'] + `</p>
                                    <p>Year: ` + res[rentalType][rental]['year'] + `</p>
                                    <p>Price: ` + res[rentalType][rental]['price'] + `</p>
                                    <div class='view-rental-btn' id='`+ res[rentalType][rental]['_id'] + `'>View Rental</div>
                                </div>
                                `
                                break
                        }
                        
                        if((res[rentalType][rental]['renterId']) == 'available'){
                            currentRentals += rentalContent
                        }else{
                            rentedRentals += rentalContent
                        }
                    })
                })

                if(currentRentals==''){
                    $('#rentals-service').html(`
                        <div id="construction">
                            <h2>No Available Rentals</h2>
                            <img src="/static/assets/rentals/empty.svg" alt="empty svg">
                            <button class = 'gbh'><span class = 'gbh'>Go Back Home</span></button>
                        </div>
                    `)
                }else{
                    $('#rentals-service').html(currentRentals)
                }
            }
        })
    }

    async getHtml() {
        return `
        <div id = 'rentals-service' class='lor'>
        </div>
        `;
    }
}