
if (localStorage.getItem("token") !== null) {
    var postDiv = document.getElementById('posts');

    let data = "";

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this);
            let response = JSON.parse(this.responseText)

            response.forEach((post) => {
                postDiv.innerHTML += `
                    <div class="card logged-out" >
                        <div class="card-header"> ${post.title} </div>
                            <div class="card-body">
                            <p class="card-text">${post.content} </p>
                        </div>
                    </div>
                    <br>
                `;
            });
        }
    });

    xhr.open("GET", "http://localhost:3000/posts");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));

    xhr.send(data);



    document.querySelectorAll('.logged-out').forEach((el) => {
        el.classList.add('d-none');
    });
    document.querySelectorAll('.logged-in').forEach((el) => {
        el.classList.remove('d-none');
    });

    function disconnectFunction() {
        localStorage.removeItem('token');
        location.replace("http://localhost");
    }

    var postModal = document.getElementById('createPost')
    postModal.addEventListener('shown.bs.modal', function (e) {
        e.preventDefault();
        $("#addPost").submit(function (e) {
            e.preventDefault();
            $.ajax({
                url: 'http://localhost:3000/posts',
                type: 'post',
                data: $("#addPost").serialize(),                
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            })
            .done(function (data) {
                alert("Post ajouté");
                window.location.reload();
            })
            .fail(function (data) {
                console.log(data);
                alert(data.responseJSON.message);
                window.location.reload();
            });
        });
    })
}
