

let indexClienteSeleccionado;
let clientes = [];


fetch("gestiones/gestionClientes/data_clientes.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
        clientes = jsondata;
        console.log(clientes);
        cargarTabla();
    }
    );

export function cargarTabla() {
    let contenido = "";
    clientes.forEach(function (cliente) {
        let registro =
            '<tr class="clickableRow" onclick="gestionClientes.seleccionarCliente(' + clientes.indexOf(cliente) + ');">' +
            '<td>' + cliente.id + '</td>' +
            '<td>' + cliente.nombre + '</td>' +
            '<td>' + cliente.apellidoPaterno + '</td>' +
            '<td>' + cliente.apellidoMaterno + '</td>' +
            '<td>' + cliente.genero + '</td>' +
            '<td>' + cliente.rfc + '</td>' +
            '<td>' + cliente.telCasa + '</td>' +
            '<td>' + cliente.telMovil + '</td>' +
            '<td>' + cliente.correo + '</td>' +
            '<td>' + cliente.estatus + '</td></tr>';
        contenido += registro;
    });
    console.log(contenido);
    document.getElementById("tableBody_clientes").innerHTML = contenido;

}

export function seleccionarCliente(index) {
    document.getElementById("inputNombre").value = clientes[index].nombre;
    document.getElementById("inputApellidoPaterno").value = clientes[index].apellidoPaterno;
    document.getElementById("inputApellidoMaterno").value = clientes[index].apellidoMaterno;
    document.getElementById("inputGenero").value = clientes[index].genero;
    document.getElementById("inputRfc").value = clientes[index].rfc;
    document.getElementById("inputTelCasa").value = clientes[index].telCasa;
    document.getElementById("inputTelMovil").value = clientes[index].telMovil;
    document.getElementById("inputCorreo").value = clientes[index].correo;
    indexClienteSeleccionado = index;
    document.getElementById("btn-modificar").classList.remove("disabled");
    document.getElementById("btn-eliminar").classList.remove("disabled");
}

document.addEventListener("load", cargarTabla());

document.getElementById("cerrarFormulario").addEventListener("click", limpiarFormulario);
document.getElementById("limpiarFormulario").addEventListener("click", limpiarFormulario);

export function limpiarFormulario() {
    document.getElementById('formDatos').reset();
    indexClienteSeleccionado = null;
}

document.getElementById("btn-agregar").addEventListener("click", agregarCliente);

document.getElementById("btn-modificar").addEventListener("click", modificarCliente);

export function agregarCliente() {
    var correcto = enviarFormulario();

    if (correcto) {
        let id, nombre, apellidoPaterno, apellidoMaterno, genero, rfc, telCasa, telMovil, correo, estatus;
        
        estatus = "Activo";

        nombre = document.getElementById("inputNombre").value;
        apellidoPaterno = document.getElementById("inputApellidoPaterno").value;
        apellidoMaterno = document.getElementById("inputApellidoMaterno").value;
        genero = document.getElementById("inputGenero").value;
        rfc = document.getElementById("inputRfc").value;
        telCasa = document.getElementById("inputTelCasa").value;
        telMovil = document.getElementById("inputTelMovil").value;
        correo = document.getElementById("inputCorreo").value;

        id = (apellidoPaterno.substr(0, 2) + apellidoMaterno.substr(0, 1)).toUpperCase() +Date.now();

        var solucion = {
            "id": id,
            "nombre": nombre,
            "apellidoPaterno": apellidoPaterno,
            "apellidoMaterno": apellidoMaterno,
            "genero": genero,
            "rfc": rfc,
            "telCasa": telCasa,
            "telMovil": telMovil,
            "correo": correo,
            "estatus": estatus
        };

        clientes.push(solucion);
        limpiarFormulario();
        cargarTabla();
    }

}

document.getElementById("confirmarEliminar").addEventListener("click", eliminarCliente);

export function eliminarCliente() {
    if (indexClienteSeleccionado != null) {
        clientes[indexClienteSeleccionado].estatus = "Inactivo";
        document.getElementById("btn-modificar").classList.add("disabled");
        document.getElementById("btn-eliminar").classList.add("disabled");
        limpiarFormulario();
        cargarTabla();

    }
}



export function modificarCliente() {
    if (indexClienteSeleccionado != null) {
        var correcto = enviarFormulario();

        if (correcto) {
            let id, nombre, apellidoPaterno, apellidoMaterno, genero, rfc, telCasa, telMovil, correo, estatus;
            id = clientes[indexClienteSeleccionado].id;
            estatus = "Activo";

            nombre = document.getElementById("inputNombre").value;
            apellidoPaterno = document.getElementById("inputApellidoPaterno").value;
            apellidoMaterno = document.getElementById("inputApellidoMaterno").value;
            genero = document.getElementById("inputGenero").value;
            rfc = document.getElementById("inputRfc").value;
            telCasa = document.getElementById("inputTelCasa").value;
            telMovil = document.getElementById("inputTelMovil").value;
            correo = document.getElementById("inputCorreo").value;

            var solucion = {
                "id": id,
                "nombre": nombre,
                "apellidoPaterno": apellidoPaterno,
                "apellidoMaterno": apellidoMaterno,
                "genero": genero,
                "rfc": rfc,
                "telCasa": telCasa,
                "telMovil": telMovil,
                "correo": correo,
                "estatus": estatus
            };

            clientes[indexClienteSeleccionado] = solucion;
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

    /*if (apellidoMaterno.value === null || apellidoMaterno.value === '') {
        alert("Dejaste vacío el campo del DESCRIPCION, asegúrate de llenarlo.");
        correcto = false;
    }
    */

    if (genero.value === null || genero.value === '') {
        alert("Dejaste vacío el campo de GENERO, asegúrate de llenarlo.");
        correcto = false;
    }

    if (rfc.value === null || rfc.value === '') {
        alert("Dejaste vacío el campo de RFC, asegúrate de llenarlo.");
        correcto = false;
    }

    if (telMovil.value === null || telMovil.value === '') {
        alert("Dejaste vacío el campo de EXISTENCIAS, asegúrate de llenarlo.");
        correcto = false;
    }

    if (correo.value === null || correo.value === '') {
        alert("Dejaste vacío el campo de CORREO, asegúrate de llenarlo.");
        correcto = false;
    }else if(!regexEmail.test(correo.value)){
        alert("Ingresa un correo válido");
        correcto = false;
    }

    if (correcto) {
        alert("Los datos se ingresaron de forma correcta");
    }
    return correcto;

}