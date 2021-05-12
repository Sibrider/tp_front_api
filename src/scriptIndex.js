$("#login").submit(function (e) {
    e.preventDefault();
    $.post("http://localhost:3000/user/login", $("#login").serialize())
        .done(function (data) {            
            localStorage.setItem('token', data.token);
            window.location.replace("list.html");
        })
        .fail(function (data) {
            console.log(data);
            alert(data.responseJSON.message);
        });
});

$("#register").submit(function (e) {
    e.preventDefault();
    $.post("http://localhost:3000/user/register", $("#register").serialize())
        .done(function (data) {
            alert(data.message);
            window.location.reload();
        })
        .fail(function (data) {
            console.log(data);
            alert(data.responseJSON.message);
        });
});