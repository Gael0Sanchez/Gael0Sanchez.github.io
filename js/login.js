
let usuarios = [];

fetch("../json/login.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
        usuarios = jsondata;
        console.log(usuarios);
    }
    );

function verificarDatos() {
    var user = document.getElementById("inputUsuario");
    var pwd = document.getElementById("inputPassword");


    if (user.value != "" && pwd.value != "") {
        let i = 0;
        var correcto = false;
        do {
            if (usuarios[i].usuario === user.value && usuarios[i].password === pwd.value) {
                window.location = "inicio.html";
                alert("acceso concedido");
                correcto = true;
                break;
            }
            i++;

        } while (i < usuarios.length);
        if(correcto == false){
            alert("Acceso denegado");
        }

    }
    
    if (user.value === "") {
        alert("No deje vacio el campo del USUARIO");
    }
    if (pwd.value === "") {
        alert("No deje vacio el campo del PASSWORD");
    }

}

document.getElementById("submit_login").addEventListener("click", verificarDatos);
document.getElementById("verPassword").addEventListener("click", myFuction);

function myFuction() {
    var x = document.getElementById("inputPassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

