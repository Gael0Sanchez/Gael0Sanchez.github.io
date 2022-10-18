

let indexAccesorioSeleccionado;
let accesorios = [];


fetch("gestiones/gestionAccesorios/data_accesorios.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
        accesorios = jsondata;
        console.log(accesorios);
        cargarTabla();
    }
    );

export function cargarTabla() {
    let contenido = "";
    accesorios.forEach(function (accesorio) {
        let registro =
            '<tr class="clickableRow" onclick="gestionAccesorios.seleccionarAccesorio(' + accesorios.indexOf(accesorio) + ');">' +
            '<td>' + accesorio.id + '</td>' +
            '<td>' + accesorio.nombre + '</td>' +
            '<td>' + accesorio.marca + '</td>' +
            '<td>' + accesorio.precio_compra + '</td>' +
            '<td>' + accesorio.precio_venta + '</td>' +
            '<td>' + accesorio.existencias + '</td>' +
            '<td>' + accesorio.estatus + '</td></tr>';
        contenido += registro;
    });
    console.log(contenido);
    document.getElementById("tableBody_accesorios").innerHTML = contenido;

}

export function seleccionarAccesorio(index) {  
    document.getElementById("inputNombre").value = accesorios[index].nombre;
    document.getElementById("inputMarca").value = accesorios[index].marca;
    document.getElementById("inputPrecioC").value = accesorios[index].precio_compra;
    document.getElementById("inputPrecioV").value = accesorios[index].precio_venta;
    document.getElementById("inputExistencias").value = accesorios[index].existencias;
    indexAccesorioSeleccionado = index;
    document.getElementById("btn-modificar").classList.remove("disabled");
    document.getElementById("btn-eliminar").classList.remove("disabled");
}

document.addEventListener("load", cargarTabla());

document.getElementById("cerrarFormulario").addEventListener("click", limpiarFormulario);
document.getElementById("limpiarFormulario").addEventListener("click", limpiarFormulario);

export function limpiarFormulario() {
    document.getElementById('formDatos').reset();
    indexAccesorioSeleccionado = null;
}

document.getElementById("btn-agregar").addEventListener("click", agregarAccesorio);

document.getElementById("btn-modificar").addEventListener("click", modificarAccesorio);

export function agregarAccesorio() {
    var correcto = enviarFormulario();

    if (correcto) {
        let id, estatus, nombre, marca, precioC, precioV, existencias;
        id = accesorios[accesorios.length - 1].id + 1;
        estatus = "Activo";

        nombre = document.getElementById("inputNombre").value;
        marca = document.getElementById("inputMarca").value;
        precioC = document.getElementById("inputPrecioC").value;
        precioV = document.getElementById("inputPrecioV").value;
        existencias = document.getElementById("inputExistencias").value;

        var accesorio = {
            "id": id,
            "nombre": nombre,
            "marca": marca,
            "precio_compra": precioC,
            "precio_venta": precioV,
            "existencias": existencias,
            "estatus": estatus
        };

        accesorios.push(accesorio);
        limpiarFormulario();
        cargarTabla();
    }

}

document.getElementById("confirmarEliminar").addEventListener("click", eliminarAccesorio);

export function eliminarAccesorio() {
    if (indexAccesorioSeleccionado != null) {
        accesorios[indexAccesorioSeleccionado].estatus = "Inactivo";
        document.getElementById("btn-modificar").classList.add("disabled");
        document.getElementById("btn-eliminar").classList.add("disabled");
        limpiarFormulario();
        cargarTabla();

    }
}



export function modificarAccesorio() {
    if (indexAccesorioSeleccionado != null) {
        var correcto = enviarFormulario();

        if (correcto) {
            let id, estatus, nombre, marca, precioC, precioV, existencias;
            id = accesorios[indexAccesorioSeleccionado].id;
            estatus = "Activo";

            nombre = document.getElementById("inputNombre").value;
            marca = document.getElementById("inputMarca").value;
            precioC = document.getElementById("inputPrecioC").value;
            precioV = document.getElementById("inputPrecioV").value;
            existencias = document.getElementById("inputExistencias").value;

            var accesorio = {
                "id": id,
                "nombre": nombre,
                "marca": marca,
                "precio_compra": precioC,
                "precio_venta": precioV,
                "existencias": existencias,
                "estatus": estatus
            };

            accesorios[indexAccesorioSeleccionado] = accesorio;
            limpiarFormulario();
            cargarTabla();
        }
    }
}

export function enviarFormulario() {
    var nombre = document.getElementById("inputNombre");
    var marca = document.getElementById("inputMarca");
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