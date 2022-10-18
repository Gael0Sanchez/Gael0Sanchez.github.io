

let indexSolucionSeleccionada;
let soluciones = [];


fetch("gestiones/gestionSoluciones/data_soluciones.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
        soluciones = jsondata;
        console.log(soluciones);
        cargarTabla();
    }
    );

export function cargarTabla() {
    let contenido = "";
    soluciones.forEach(function (solucion) {
        let registro =
            '<tr class="clickableRow" onclick="gestionSoluciones.seleccionarSolucion(' + soluciones.indexOf(solucion) + ');">' +
            '<td>' + solucion.id + '</td>' +
            '<td>' + solucion.nombre + '</td>' +
            '<td>' + solucion.marca + '</td>' +
            '<td>' + solucion.descripcion + '</td>' +
            '<td>' + solucion.precio_compra + '</td>' +
            '<td>' + solucion.precio_venta + '</td>' +
            '<td>' + solucion.existencias + '</td>' +
            '<td>' + solucion.estatus + '</td></tr>';
        contenido += registro;
    });
    console.log(contenido);
    document.getElementById("tableBody_soluciones").innerHTML = contenido;

}

export function seleccionarSolucion(index) {
    document.getElementById("inputNombre").value = soluciones[index].nombre;
    document.getElementById("inputMarca").value = soluciones[index].marca;
    document.getElementById("inputDescripcion").value = soluciones[index].descripcion;
    document.getElementById("inputPrecioC").value = soluciones[index].precio_compra;
    document.getElementById("inputPrecioV").value = soluciones[index].precio_venta;
    document.getElementById("inputExistencias").value = soluciones[index].existencias;
    indexSolucionSeleccionada = index;
    document.getElementById("btn-modificar").classList.remove("disabled");
    document.getElementById("btn-eliminar").classList.remove("disabled");
}

document.addEventListener("load", cargarTabla());

document.getElementById("cerrarFormulario").addEventListener("click", limpiarFormulario);
document.getElementById("limpiarFormulario").addEventListener("click", limpiarFormulario);

export function limpiarFormulario() {
    document.getElementById('formDatos').reset();
    indexSolucionSeleccionada = null;
}

document.getElementById("btn-agregar").addEventListener("click", agregarSolucion);

document.getElementById("btn-modificar").addEventListener("click", modificarSolucion);

export function agregarSolucion() {
    var correcto = enviarFormulario();

    if (correcto) {
        let id, estatus, nombre, marca, descripcion, precioC, precioV, existencias;
        id = soluciones[soluciones.length - 1].id + 1;
        estatus = "Activo";

        nombre = document.getElementById("inputNombre").value;
        marca = document.getElementById("inputMarca").value;
        descripcion = document.getElementById("inputDescripcion").value;
        precioC = document.getElementById("inputPrecioC").value;
        precioV = document.getElementById("inputPrecioV").value;
        existencias = document.getElementById("inputExistencias").value;

        var solucion = {
            "id": id,
            "nombre": nombre,
            "marca": marca,
            "descripcion": descripcion,
            "precio_compra": precioC,
            "precio_venta": precioV,
            "existencias": existencias,
            "estatus": estatus
        };

        soluciones.push(solucion);
        limpiarFormulario();
        cargarTabla();
    }

}

document.getElementById("confirmarEliminar").addEventListener("click", eliminarSolucion);

export function eliminarSolucion() {
    if (indexSolucionSeleccionada != null) {
        soluciones[indexSolucionSeleccionada].estatus = "Inactivo";
        document.getElementById("btn-modificar").classList.add("disabled");
        document.getElementById("btn-eliminar").classList.add("disabled");
        limpiarFormulario();
        cargarTabla();

    }
}



export function modificarSolucion() {
    if (indexSolucionSeleccionada != null) {
        var correcto = enviarFormulario();

        if (correcto) {
            let id, estatus, nombre, marca, descripcion, precioC, precioV, existencias;
            id = soluciones[indexSolucionSeleccionada].id;
            estatus = "Activo";

            nombre = document.getElementById("inputNombre").value;
            marca = document.getElementById("inputMarca").value;
            descripcion = document.getElementById("inputDescripcion").value;
            precioC = document.getElementById("inputPrecioC").value;
            precioV = document.getElementById("inputPrecioV").value;
            existencias = document.getElementById("inputExistencias").value;

            var solucion = {
                "id": id,
                "nombre": nombre,
                "marca": marca,
                "descripcion": descripcion,
                "precio_compra": precioC,
                "precio_venta": precioV,
                "existencias": existencias,
                "estatus": estatus
            };

            soluciones[indexSolucionSeleccionada] = solucion;
            limpiarFormulario();
            cargarTabla();
        }
    }
}

export function enviarFormulario() {
    var nombre = document.getElementById("inputNombre");
    var marca = document.getElementById("inputMarca");
    var descripcion = document.getElementById("inputDescripcion");
    var precioCompra = document.getElementById("inputPrecioC");
    var precioVenta = document.getElementById("inputPrecioV");
    var existencias = document.getElementById("inputExistencias");

      var correcto = true;
       if (nombre.value === null || nombre.value === '') {
           alert("Dejaste vacío el campo del NOMBRE, asegúrate de llenarlo.");
           correcto = false;
       }
   
       if (marca.value === null || marca.value === '') {
           alert("Dejaste vacío el campo de MARCA, asegúrate de llenarlo.");
           correcto = false;
       }
   
       if (descripcion.value === null || descripcion.value === '') {
           alert("Dejaste vacío el campo del DESCRIPCION, asegúrate de llenarlo.");
           correcto = false;
       }
   
       if (precioCompra.value === null || precioCompra.value === '') {
           alert("Dejaste vacío el campo de PRECIO DE COMPRA, asegúrate de llenarlo.");
           correcto = false;
       }
   
       if (precioVenta.value === null || precioVenta.value === '') {
           alert("Dejaste vacío el campo de PRECIO DE VENTA, asegúrate de llenarlo.");
           correcto = false;
       }
   
       if (existencias.value === null || existencias.value === '') {
           alert("Dejaste vacío el campo de EXISTENCIAS, asegúrate de llenarlo.");
           correcto = false;
       }
       if (correcto) {
           alert("Los datos se ingresaron de forma correcta");
       }
       return correcto;

}