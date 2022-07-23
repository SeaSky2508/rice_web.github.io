$(window).on('load', async () => {
    const {data} = await axios.get("https://json-server-production-973b.up.railway.app/rice_data")
    
    axios.get("https://json-server-production-973b.up.railway.app/rice_data")
    .then((response) => {
        load(0);
        $('#btn-load-next').click( function() { if (ID<(data.length-1))  { load(1)}  } );
        $('#btn-load-prev').click( function() { if (ID>0) { load(-1)} });
        $('#btn-more').click( function() { more_less_rice(1)} );
        $('#btn-less').click( function() { if (quantity_rice>1) { more_less_rice(-1) } });
    });
    $('#signbtn').on('click', async () => {
        var form = document.forms["search-bar"];
        var inputVal = form["input"].value;
        var thing = ID
        ID = 0;
        const success = true;
        try {
            data.forEach(rice => {
                if (rice.name === inputVal) {  
                    thing = ID;
                    ID = 0;
                    load(thing);
                    success = null;
                }
                ID += 1
            });
        } catch (error) {
            ID=thing;
        }
        if (success) {
            ID=thing;
        } 
    })
    var ID = 0;
    //function for loading the next and the previous rice according to parameter 'sum'
    function load(sum) {
        ID = ID + sum;
        const rice = data[ID];
        quantity_rice = 1;
        $('#quantity').empty();
        $('#quantity').append(`${quantity_rice}`)
        $('#info').empty();
        $('#info').append(
            `<h2 class="w-100 m-1 mb-0 px-1">
                ${rice.name}
            </h2>
            <div class="m-1 px-3"><img class ="product-img rounded card-img-top m-0 p-0" style="height: 250px; width: 250px;" src=${rice.image}></div>
            <div class="rounded m-1 pb-2 d-flex align-items-end">${rice.wiki}</div>`
        )
    };

})
