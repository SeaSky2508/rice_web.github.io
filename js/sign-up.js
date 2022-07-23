async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

$(window).on('load', () => {
    $('#registerbtn').on('click', async () => {
        var form = document.forms["sign-in"];
        var emailid = form["email"].value;
        var passid = form["pswd"].value;
        var repassid = form["psw_repeat"].value;
        const {data} = await axios.get("https://json-server-production-973b.up.railway.app/users")
        var user = null;
        data.forEach(element => {
            if (element["email_address"] === emailid) {
                user = element;
            }
        });
        if (user != null) {
            $("#alert").append(`
            <div class="alert alert-danger" role="alert">
            Email already in use
            </div>`)
            await sleep(1);
            $("#alert").empty();
        }
        else if (passid != repassid) {
            $("#alert").append(`
            <div class="alert alert-danger" role="alert">
            Passwords dont match
            </div>`)
            await sleep(1);
            $("#alert").empty();
        }
        else if (emailid == ''){
            $("#alert").append(`
            <div class="alert alert-danger" role="alert">
            Please fill the email field
            </div>`)
            await sleep(1);
            $("#alert").empty();
        }
        else if (passid == ''){
            $("#alert").append(`
            <div class="alert alert-danger" role="alert">
            Please fill the password field
            </div>`)
            await sleep(1);
            $("#alert").empty();
        }
        else {
            axios.post('https://json-server-production-973b.up.railway.app/users', {
                email_address: emailid,
                password: passid
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                window.location.href = "../index.html"
            }
    })
})
