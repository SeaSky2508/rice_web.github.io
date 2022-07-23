async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

$(window).on('load', () => {
    $('#signbtn').on('click', async () => {
        var form = document.forms["sign-in"];
        var emailid = form["email"].value;
        var passid = form["pswd"].value;
    if (emailid != '' && passid != '') {
        const {data} = await axios.get("https://json-server-production-973b.up.railway.app/users")
       var user = null;
        data.forEach(element => {
            if (element["email_address"] === emailid) {
                user = element;
            }
        });
        if (user === null) {
        $("#alert").append(`
        <div class="alert alert-danger" role="alert">
        email not found
        </div>`)
        await sleep(1);
        $("#alert").empty();
        }
        else {
            if (user["password"] === passid) {
                axios.post('https://json-server-production-973b.up.railway.app/logged_user', {
                    uid: user["id"]
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                $("#alert").append(`<div class="alert alert-success" role="alert">
                Login Success!
              </div>`)
                await sleep(1);
                $("#alert").empty();
                window.location.href = "html/ecommerce.html"
                
            }
            else{
                $("#alert").append(`
                <div class="alert alert-danger" role="alert">
                Wrong password
                </div>`)
                await sleep(2);
                $("#alert").empty();
            }
        }
    }
    else {
        $("#alert").append(`
        <div class="alert alert-danger" role="alert">
        Please fill the input fields
        </div>`)
        await sleep(2);
        $("#alert").empty();
    }
})
})