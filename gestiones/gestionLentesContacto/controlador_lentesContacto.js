

let indexLenteContactoSeleccionado;
let lentesContacto = [];
//var graduaciones = [1,2,3,4,5,6,7,8,9,10];
//var presupuesto = [1,2];


fetch("gestiones/gestionLentesContacto/data_lentesContacto.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
        lentesContacto = jsondata;
        console.log(lentesContacto);
        cargarTabla();
    }
    );

export function cargarTabla() {
    let contenido = "";
    lentesContacto.forEach(function (lente) {
        let registro =
            '<tr class="clickableRow" onclick="gestionLentesContacto.seleccionarLenteContacto(' + lentesContacto.indexOf(lente) + ');">' +
            '<td>' + lente.id + '</td>' +
            '<td>' + lente.tipo + '</td>' +
            //'<td>' + lente.id_graduacion + '</td>' +
            //'<td>' + lente.id_presupuesto + '</td>' +
            '<td>' + lente.nombre + '</td>' +
            '<td>' + lente.marca + '</td>' +
            '<td>' + lente.color + '</td>' +
            '<td>' + lente.queratometria + '</td>' +
            '<td> <img src="' + lente.fotografia + '" height="50px" width="50px"></td>' +
            '<td>' + lente.estatus + '</td></tr>';
        contenido += registro;
    });
    console.log(contenido);
    document.getElementById("tableBody_lentesContacto").innerHTML = contenido;

}

export function seleccionarLenteContacto(index) {
    document.getElementById("inputTipo").value = lentesContacto[index].tipo;
    document.getElementById("inputNombre").value = lentesContacto[index].nombre;
    document.getElementById("inputMarca").value = lentesContacto[index].marca;
    document.getElementById("inputColor").value = lentesContacto[index].color;
    document.getElementById("inputQueratometria").value = lentesContacto[index].queratometria;
    document.getElementById("inputFotografia").value = lentesContacto[index].fotografia;
    indexLenteContactoSeleccionado = index;
    document.getElementById("btn-modificar").classList.remove("disabled");
    document.getElementById("btn-eliminar").classList.remove("disabled");
}

document.addEventListener("load", cargarTabla());

document.getElementById("cerrarFormulario").addEventListener("click", limpiarFormulario);
document.getElementById("limpiarFormulario").addEventListener("click", limpiarFormulario);

export function limpiarFormulario() {
    document.getElementById('formDatos').reset();
    indexLenteContactoSeleccionado = null;
}

document.getElementById("btn-agregar").addEventListener("click", agregarLenteContacto);

document.getElementById("btn-modificar").addEventListener("click", modificarLenteContacto);

export function agregarLenteContacto() {
    var correcto = enviarFormulario();

    if (correcto) {
        let id, tipo, nombre, marca, color, queratometria, fotografia, estatus;
        id = lentesContacto[lentesContacto.length - 1].id + 1;
        estatus = "Activo";

        tipo = document.getElementById("inputTipo").value;
        nombre = document.getElementById("inputNombre").value;
        marca = document.getElementById("inputMarca").value;
        color = document.getElementById("inputColor").value;
        queratometria = document.getElementById("inputQueratometria").value;
        fotografia = document.getElementById("inputFotografia").value;
        /*if(tipo == "Estetico"){
            id_graduacion = "-";
            id_presupuesto = "-";
        }
        else if(tipo == "Graduacion"){
            id_graduacion = Math.floor(Math.random(1,10)*10+1);
            presupuesto.push(presupuesto.length+1)
            id_presupuesto = presupuesto[presupuesto.length-1];
        }*/

        var lente = {
            "id": id,
            "tipo": tipo,
            //"id_graduacion": id_graduacion,
            //"id_presupuesto": id_presupuesto,
            "nombre": nombre,
            "marca": marca,
            "color": color,
            "queratometria": queratometria,
            "fotografia": fotografia,
            "estatus": estatus
        };

        lentesContacto.push(lente);
        limpiarFormulario();
        cargarTabla();
    }

}

document.getElementById("confirmarEliminar").addEventListener("click", eliminarLenteContacto);

export function eliminarLenteContacto() {
    if (indexLenteContactoSeleccionado != null) {
        lentesContacto[indexLenteContactoSeleccionado].estatus = "Inactivo";
        document.getElementById("btn-modificar").classList.add("disabled");
        document.getElementById("btn-eliminar").classList.add("disabled");
        limpiarFormulario();
        cargarTabla();

    }
}



export function modificarLenteContacto() {
    if (indexLenteContactoSeleccionado != null) {
        var correcto = enviarFormulario();

        if (correcto) {
            let id, tipo, nombre, marca, color, queratometria, fotografia, estatus;
            id = lentesContacto[indexLenteContactoSeleccionado].id;
            estatus = "Activo";

            tipo = document.getElementById("inputTipo").value;
            nombre = document.getElementById("inputNombre").value;
            marca = document.getElementById("inputMarca").value;
            color = document.getElementById("inputColor").value;
            queratometria = document.getElementById("inputQueratometria").value;
            fotografia = document.getElementById("inputFotografia").value;

            var lente = {
                "id": id,
                "tipo": tipo,
                //"id_graduacion": id_graduacion,
                //"id_presupuesto": id_presupuesto,
                "nombre": nombre,
                "marca": marca,
                "color": color,
                "queratometria": queratometria,
                "fotografia": fotografia,
                "estatus": estatus
            };

            lentesContacto[indexLenteContactoSeleccionado] = lente;
            limpiarFormulario();
            cargarTabla();
        }
    }
}

export function enviarFormulario() {
    var tipo = document.getElementById("inputTipo");
    var nombre = document.getElementById("inputNombre");
    var marca = document.getElementById("inputMarca");
    var color = document.getElementById("inputColor");
    var queratometria = document.getElementById("inputQueratometria");
    var fotografia = document.getElementById("inputFotografia");

    var correcto = true;
    if (tipo.value === null || tipo.value === '') {
        alert("Dejaste vacío el campo de TIPO, asegúrate de llenarlo.");
        correcto = false;
    }

    if (nombre.value === null || nombre.value === '') {
        alert("Dejaste vacío el campo del NOMBRE, asegúrate de llenarlo.");
        correcto = false;
    }

    if (marca.value === null || marca.value === '') {
        alert("Dejaste vacío el campo de MARCA, asegúrate de llenarlo.");
        correcto = false;
    }

    if (color.value === null || color.value === '') {
        alert("Dejaste vacío el campo de COLOR, asegúrate de llenarlo.");
        correcto = false;
    }

    if (queratometria.value === null || queratometria.value === '') {
        alert("Dejaste vacío el campo de QUERATOMETRIA, asegúrate de llenarlo.");
        correcto = false;
    }

    if (fotografia.value === null || fotografia.value === '') {
        alert("Dejaste vacío el campo de FOTOGRAFIA, asegúrate de llenarlo.");
        correcto = false;
    }

    if (correcto) {
        alert("Los datos se ingresaron de forma correcta");
    }
    return correcto;

}