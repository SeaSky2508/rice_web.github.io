$(window).on('load', async () => {
    const {data} = await axios.get("https://json-server-production-973b.up.railway.app/rice_data")
    const logged_user = await axios.get("https://json-server-production-973b.up.railway.app/logged_user")
    uid = logged_user.uid
    const shopping_cart = {products:[], user_id: uid};
    function create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    axios.get("https://json-server-production-973b.up.railway.app/rice_data")
    .then((response) => {
        load(0);
        $('#btn-load-next').click( function() { if (ID<(data.length-1))  { load(1)}  } );
        $('#btn-load-prev').click( function() { if (ID>0) { load(-1)} });
        $('#btn-more').click( function() { more_less_rice(1)} );
        $('#btn-less').click( function() { if (quantity_rice>1) { more_less_rice(-1) } });
        $('#btn-addtocart').click( function() { add_to_cart() } );
    });
    
    var ID = 0;
    //function for loading the next and the previous rice according to parameter 'sum'
    function load(sum) {
        ID = ID + sum;
        const rice = data[ID];
        quantity_rice = 1;
        $('#quantity').empty();
        $('#quantity').append(`${quantity_rice}`)
        $('#rice-frame').empty();
        $('#rice-frame').append(
            `<div class="row w-100 m-1 mb-0 px-1">
                ${rice.name}
            </div>
            <div class="row w-100 m-1 my-0 d-flex justify-content-center font-sm">
                <div class="row p-0 paper">
                    <div class="col m-1 p-0 d-flex justify-content-center"><img class ="product-img rounded card-img-top m-0 p-0" src=${rice.image}></div>
                    <div class="col rounded m-1 pb-2 d-flex align-items-end">${rice.desc}</div>
                </div>
                <div class="row p-0 pastel-yellow">
                    <div class="col transparent-white m-1 d-flex align-items-center">${rice.origin}</div>
                    <div class="col transparent-white m-1 d-flex align-items-center">${rice.price}$</div>
                    
                </div> 
            </div>`
        )
    };
    var quantity_rice = 1;
    function more_less_rice(sum) {
        quantity_rice += sum;
        $('#quantity').empty();
        $('#quantity').append(`${quantity_rice}`)
    }
    function calc_price(products){
        var sum=0;
        products.forEach(element => {
            sum = sum + (element.price*element.quantity);
        });
        return sum;
    }
    $('#cartbtn').on('click', () => {
        $("#cartdisplay").empty();
        const rice = data[ID];
        var counter = 0;
        shopping_cart.products.forEach(element => {
            if (rice.name === element.name){
                element.quantity += quantity_rice;
                counter ++;
            }})
        if (counter == 0) {
            const product = {name: rice.name, desc: rice.desc, origin: rice.origin, price: rice.price, quantity: quantity_rice}
            shopping_cart.products.push(product);
        }
        shopping_cart.products.forEach(element => {
            $("#cartdisplay").append(`${element.name} x${element.quantity} ................ ${element.price}$
                <br>`)

        })
    $("#cartdisplay").append(`Total: ${calc_price(shopping_cart.products)}$`)
    })
    $('#buybtn').on('click', () => {
        console.log(calc_price(shopping_cart.products))
        var to_spend = calc_price(shopping_cart.products)
        console.log(to_spend)
        axios.post('https://json-server-production-973b.up.railway.app/final_buy', {
            products: shopping_cart.products,
            user_id: shopping_cart.user_id,
            uuid: create_UUID(),
            total_price: to_spend
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    })
})
