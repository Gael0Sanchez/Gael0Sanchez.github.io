

let indexEmpleadoSeleccionado;
let empleados = [];


fetch("gestiones/gestionEmpleados/data_empleados.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
        empleados = jsondata;
        console.log(empleados);
        cargarTabla();
    }
    );

export function cargarTabla() {
    let contenido = "";
    empleados.forEach(function (empleado) {
        let registro =
            '<tr class="clickableRow" onclick="gestionEmpleados.seleccionarEmpleado(' + empleados.indexOf(empleado) + ');">' +
            '<td>' + empleado.id + '</td>' +
            '<td>' + empleado.nombre + '</td>' +
            '<td>' + empleado.apellidoPaterno + '</td>' +
            '<td>' + empleado.apellidoMaterno + '</td>' +
            '<td>' + empleado.genero + '</td>' +
            '<td>' + empleado.rfc + '</td>' +
            '<td>' + empleado.telCasa + '</td>' +
            '<td>' + empleado.telMovil + '</td>' +
            '<td>' + empleado.correo + '</td>' +
            '<td>' + empleado.usuario + '</td>' +
            '<td>' + empleado.password + '</td>' +
            '<td>' + empleado.estatus + '</td></tr>';
        contenido += registro;
    });
    console.log(contenido);
    document.getElementById("tableBody_empleados").innerHTML = contenido;

}

export function seleccionarEmpleado(index) {
    document.getElementById("inputNombre").value = empleados[index].nombre;
    document.getElementById("inputApellidoPaterno").value = empleados[index].apellidoPaterno;
    document.getElementById("inputApellidoMaterno").value = empleados[index].apellidoMaterno;
    document.getElementById("inputGenero").value = empleados[index].genero;
    document.getElementById("inputRfc").value = empleados[index].rfc;
    document.getElementById("inputTelCasa").value = empleados[index].telCasa;
    document.getElementById("inputTelMovil").value = empleados[index].telMovil;
    document.getElementById("inputCorreo").value = empleados[index].correo;
    document.getElementById("inputUsuario").value = empleados[index].usuario;
    document.getElementById("inputPassword").value = empleados[index].password;
    indexEmpleadoSeleccionado = index;
    document.getElementById("btn-modificar").classList.remove("disabled");
    document.getElementById("btn-eliminar").classList.remove("disabled");
}

document.addEventListener("load", cargarTabla());

document.getElementById("cerrarFormulario").addEventListener("click", limpiarFormulario);
document.getElementById("limpiarFormulario").addEventListener("click", limpiarFormulario);

export function limpiarFormulario() {
    document.getElementById('formDatos').reset();
    indexEmpleadoSeleccionado = null;
}

document.getElementById("btn-agregar").addEventListener("click", agregarEmpleado);

document.getElementById("btn-modificar").addEventListener("click", modificarEmpleado);

export function agregarEmpleado() {
    var correcto = enviarFormulario();

    if (correcto) {
        let id, nombre, apellidoPaterno, apellidoMaterno, genero, rfc, telCasa, telMovil, correo,
        usuario, password, estatus;
        estatus = "Activo";

        nombre = document.getElementById("inputNombre").value;
        apellidoPaterno = document.getElementById("inputApellidoPaterno").value;
        apellidoMaterno = document.getElementById("inputApellidoMaterno").value;
        genero = document.getElementById("inputGenero").value;
        rfc = document.getElementById("inputRfc").value;
        telCasa = document.getElementById("inputTelCasa").value;
        telMovil = document.getElementById("inputTelMovil").value;
        correo = document.getElementById("inputCorreo").value;
        usuario = document.getElementById("inputUsuario").value;
        password = document.getElementById("inputPassword").value;

        id = (apellidoPaterno.substr(0, 2) + apellidoMaterno.substr(0, 1)).toUpperCase() +Date.now();

        var empleado = {
            "id": id,
            "nombre": nombre,
            "apellidoPaterno": apellidoPaterno,
            "apellidoMaterno": apellidoMaterno,
            "genero": genero,
            "rfc": rfc,
            "telCasa": telCasa,
            "telMovil": telMovil,
            "correo": correo,
            "usuario" : usuario,
            "password" : password,
            "estatus": estatus
        };

        empleados.push(empleado);
        limpiarFormulario();
        cargarTabla();
    }

}

document.getElementById("confirmarEliminar").addEventListener("click", eliminarEmpleado);

export function eliminarEmpleado() {
    if (indexEmpleadoSeleccionado != null) {
        empleados[indexEmpleadoSeleccionado].estatus = "Inactivo";
        document.getElementById("btn-modificar").classList.add("disabled");
        document.getElementById("btn-eliminar").classList.add("disabled");
        limpiarFormulario();
        cargarTabla();

    }
}



export function modificarEmpleado() {
    if (indexEmpleadoSeleccionado != null) {
        var correcto = enviarFormulario();

        if (correcto) {
            let id, nombre, apellidoPaterno, apellidoMaterno, genero, rfc, telCasa, telMovil, correo, usuario, password, estatus;
            id = empleados[indexEmpleadoSeleccionado].id;
            estatus = "Activo";

            nombre = document.getElementById("inputNombre").value;
            apellidoPaterno = document.getElementById("inputApellidoPaterno").value;
            apellidoMaterno = document.getElementById("inputApellidoMaterno").value;
            genero = document.getElementById("inputGenero").value;
            rfc = document.getElementById("inputRfc").value;
            telCasa = document.getElementById("inputTelCasa").value;
            telMovil = document.getElementById("inputTelMovil").value;
            usuario = document.getElementById("inputUsuario").value;
            password = document.getElementById("inputPassword").value;
            correo = document.getElementById("inputCorreo").value;

            var empleado = {
                "id": id,
                "nombre": nombre,
                "apellidoPaterno": apellidoPaterno,
                "apellidoMaterno": apellidoMaterno,
                "genero": genero,
                "rfc": rfc,
                "telCasa": telCasa,
                "telMovil": telMovil,
                "correo": correo,
                "usuario" : usuario,
                "password" : password,
                "estatus": estatus
            };

            empleados[indexEmpleadoSeleccionado] = empleado;
            limpiarFormulario();
            cargarTabla();
        }
    }
}

export function enviarFormulario() {
    var nombre = document.getElementById("inputNombre");
    var apellidoPaterno = document.getElementById("inputApellidoPaterno");
    var genero = document.getElementById("inputGenero");
    var rfc = document.getElementById("inputRfc");
    var telMovil = document.getElementById("inputTelMovil");
    var correo = document.getElementById("inputCorreo");
    var usuario = document.getElementById("inputUsuario");
    var password = document.getElementById("inputPassword");
    let regexEmail = /\S+@\S+\.\S+/

    var correcto = true;
    if (nombre.value === null || nombre.value === '') {
        alert("Dejaste vacío el campo del NOMBRE, asegúrate de llenarlo.");
        correcto = false;
    }

    if (apellidoPaterno.value === null || apellidoPaterno.value === '') {
        alert("Dejaste vacío el campo de APELLIDO PATERNO, asegúrate de llenarlo.");
        correcto = false;
    }

    if (genero.value === null || genero.value === '') {
        alert("Dejaste vacío el campo de GENERO, asegúrate de llenarlo.");
        correcto = false;
    }

    if (rfc.value === null || rfc.value === '') {
        alert("Dejaste vacío el campo de RFC, asegúrate de llenarlo.");
        correcto = false;
    }

    if (telMovil.value === null || telMovil.value === '') {
        alert("Dejaste vacío el campo de TELEFONO MOVIL, asegúrate de llenarlo.");
        correcto = false;
    }else if (telMovil.value.length != 10) {
        alert("Por favor ingresa un número móvil de teléfono con 10 dígitos.")
        correcto = false;
    } 

    if (correo.value === null || correo.value === '') {
        alert("Dejaste vacío el campo de CORREO, asegúrate de llenarlo.");
        correcto = false;
    }else if(!regexEmail.test(correo.value)){
        alert("Ingresa un correo válido");
        correcto = false;
    }

    if (usuario.value === null || usuario.value === '') {
        alert("Dejaste vacío el campo de USUARIO, asegúrate de llenarlo.");
        correcto = false;
    }
    if (password.value === null || password.value === '') {
        alert("Dejaste vacío el campo de CONTRASEÑA, asegúrate de llenarlo.");
        correcto = false;
    }

    if (correcto) {
        alert("Los datos se ingresaron de forma correcta");
    }
    return correcto;

}