let gestionSoluciones;
let gestionAccesorios;
let gestionClientes;
let gestionEmpleados;
let gestionArmazones;
let gestionLentesContacto;

function cargarGestionSoluciones() {
    fetch("gestiones/gestionSoluciones/vista_soluciones.html")
        .then(
            function (response) {
                return response.text();
            }
        )
        .then(
            function (html) {
                document.getElementById("contenido_seccion").innerHTML = html;
                import("../gestiones/gestionSoluciones/controlador_soluciones.js").then(
                    function (controller) {
                        gestionSoluciones = controller;
                    }
                );
            }

        );
}

function cargarGestionAccesorios() {
    fetch("gestiones/gestionAccesorios/vista_accesorios.html")
        .then(
            function (response) {
                return response.text();
            }
        )
        .then(
            function (html) {
                document.getElementById("contenido_seccion").innerHTML = html;
                import("../gestiones/gestionAccesorios/controlador_accesorios.js").then(
                    function (controller) {
                        gestionAccesorios = controller;
                    }
                );
            }

        );
}

function cargarGestionClientes() {
    fetch("gestiones/gestionClientes/vista_clientes.html")
        .then(
            function (response) {
                return response.text();
            }
        )
        .then(
            function (html) {
                document.getElementById("contenido_seccion").innerHTML = html;
                import("../gestiones/gestionClientes/controlador_clientes.js").then(
                    function (controller) {
                        gestionClientes = controller;
                    }
                );
            }

        );
}

function cargarGestionEmpleados() {
    fetch("gestiones/gestionEmpleados/vista_empleados.html")
        .then(
            function (response) {
                return response.text();
            }
        )
        .then(
            function (html) {
                document.getElementById("contenido_seccion").innerHTML = html;
                import("../gestiones/gestionEmpleados/controlador_empleados.js").then(
                    function (controller) {
                        gestionEmpleados = controller;
                    }
                );
            }

        );
}

function cargarGestionArmazones() {
    fetch("gestiones/gestionArmazones/vista_armazones.html")
        .then(
            function (response) {
                return response.text();
            }
        )
        .then(
            function (html) {
                document.getElementById("contenido_seccion").innerHTML = html;
                import("../gestiones/gestionArmazones/controlador_armazones.js").then(
                    function (controller) {
                        gestionArmazones = controller;
                    }
                );
            }

        );
}

function cargarGestionLentesContacto() {
    fetch("gestiones/gestionLentesContacto/vista_lentesContacto.html")
        .then(
            function (response) {
                return response.text();
            }
        )
        .then(
            function (html) {
                document.getElementById("contenido_seccion").innerHTML = html;
                import("../gestiones/gestionLentesContacto/controlador_lentesContacto.js").then(
                    function (controller) {
                        gestionLentesContacto = controller;
                    }
                );
            }

        );
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚabcdefghijklmnñopqrstuvwxyzáéíóú";

    especiales = [8, 13, 32];
    tecla_especial = false;
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        alert("Solo debes ingresar letras");
        return false;
    }
}

function soloNumeros(evt) {
    if (window.event) {
        keynum = evt.keyCode;
    } else {
        keynum = evt.which;
    }

    if ((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13) {
        return true;
    } else {
        alert("Ingresa solo números.");
        return false;
    }
}

function soloDimensiones(evt) {
    if (window.event) {
        keynum = evt.keyCode;
    } else {
        keynum = evt.which;
    }

    if ((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13 || keynum == 120 || keynum == 88
        || keynum == 32) {
        return true;
    } else {
        alert("Ingresa solo números y letra 'x' minúscula o mayúscula.");
        return false;
    }
}

function enConstruccion() {
    alert("Esta gestion esta en construccion");
}