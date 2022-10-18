

let indexArmazonSeleccionado;
let armazones = [];


fetch("gestiones/gestionArmazones/data_armazones.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
        armazones = jsondata;
        console.log(armazones);
        cargarTabla();
    }
    );

export function cargarTabla() {
    let contenido = "";
    armazones.forEach(function (armazon) {
        let registro =
            '<tr class="clickableRow" onclick="gestionArmazones.seleccionarArmazon(' + armazones.indexOf(armazon) + ');">' +
            '<td>' + armazon.id + '</td>' +
            '<td>' + armazon.nombre + '</td>' +
            '<td>' + armazon.marca + '</td>' +
            '<td>' + armazon.modelo + '</td>' +
            '<td>' + armazon.color + '</td>' +
            '<td>' + armazon.descripcion + '</td>' +
            '<td>' + armazon.dimensiones + '</td>' +
            '<td>' + armazon.precioCompra + '</td>' +
            '<td>' + armazon.precioVenta + '</td>' +
            '<td>' + armazon.existencias + '</td>' +
            '<td><img src="' + armazon.fotografia + '"height="50px" width="50px"</td>' +
            '<td>' + armazon.estatus + '</td></tr>';
        contenido += registro;
    });
    console.log(contenido);
    document.getElementById("tableBody_armazones").innerHTML = contenido;

}

export function seleccionarArmazon(index) {
    document.getElementById("inputNombre").value = armazones[index].nombre;
    document.getElementById("inputMarca").value = armazones[index].marca;
    document.getElementById("inputModelo").value = armazones[index].modelo;
    document.getElementById("inputColor").value = armazones[index].color;
    document.getElementById("inputDescripcion").value = armazones[index].descripcion;
    document.getElementById("inputDimensiones").value = armazones[index].dimensiones;
    document.getElementById("inputPrecioC").value = armazones[index].precioCompra;
    document.getElementById("inputPrecioV").value = armazones[index].precioVenta;
    document.getElementById("inputExistencias").value = armazones[index].existencias;
    document.getElementById("inputFotografia").value = armazones[index].fotografia;
    indexArmazonSeleccionado = index;
    document.getElementById("btn-modificar").classList.remove("disabled");
    document.getElementById("btn-eliminar").classList.remove("disabled");
}

document.addEventListener("load", cargarTabla());

document.getElementById("cerrarFormulario").addEventListener("click", limpiarFormulario);
document.getElementById("limpiarFormulario").addEventListener("click", limpiarFormulario);

export function limpiarFormulario() {
    document.getElementById('formDatos').reset();
    indexArmazonSeleccionado = null;
}

document.getElementById("btn-agregar").addEventListener("click", agregarArmazon);

document.getElementById("btn-modificar").addEventListener("click", modificarArmazon);

export function agregarArmazon() {
    var correcto = enviarFormulario();

    if (correcto) {
        let id, nombre, marca, modelo, color, descripcion, dimensiones, precioCompra, precioVenta,
            existencias, fotografia, estatus;
        
        estatus = "Activo";

        nombre = document.getElementById("inputNombre").value;
        marca = document.getElementById("inputMarca").value;
        modelo = document.getElementById("inputModelo").value;
        color = document.getElementById("inputColor").value;
        descripcion = document.getElementById("inputDescripcion").value;
        dimensiones = document.getElementById("inputDimensiones").value;
        precioCompra = document.getElementById("inputPrecioC").value;
        precioVenta = document.getElementById("inputPrecioV").value;
        existencias = document.getElementById("inputExistencias").value;
        fotografia = document.getElementById("inputFotografia").value;

        id = "OQ-" +Date.now();

        var armazon = {
            "id": id,
            "nombre": nombre,
            "marca": marca,
            "modelo": modelo,
            "color": color,
            "descripcion": descripcion,
            "dimensiones": dimensiones,
            "precioCompra": precioCompra,
            "precioVenta": precioVenta,
            "existencias": existencias,
            "fotografia": fotografia,
            "estatus": estatus
        };

        armazones.push(armazon);
        limpiarFormulario();
        cargarTabla();
    }

}

document.getElementById("confirmarEliminar").addEventListener("click", eliminarArmazon);

export function eliminarArmazon() {
    if (indexArmazonSeleccionado != null) {
        armazones[indexArmazonSeleccionado].estatus = "Inactivo";
        document.getElementById("btn-modificar").classList.add("disabled");
        document.getElementById("btn-eliminar").classList.add("disabled");
        limpiarFormulario();
        cargarTabla();

    }
}



export function modificarArmazon() {
    if (indexArmazonSeleccionado != null) {
        var correcto = enviarFormulario();

        if (correcto) {
            let id, nombre, marca, modelo, color, descripcion, dimensiones, precioCompra, precioVenta,
                existencias, fotografia, estatus;
            id = armazones[indexArmazonSeleccionado].id;
            estatus = "Activo";

            nombre = document.getElementById("inputNombre").value;
            marca = document.getElementById("inputMarca").value;
            modelo = document.getElementById("inputModelo").value;
            color = document.getElementById("inputColor").value;
            descripcion = document.getElementById("inputDescripcion").value;
            dimensiones = document.getElementById("inputDimensiones").value;
            precioCompra = document.getElementById("inputPrecioC").value;
            precioVenta = document.getElementById("inputPrecioV").value;
            existencias = document.getElementById("inputExistencias").value;
            fotografia = document.getElementById("inputFotografia").value;

            var armazon = {
                "id": id,
                "nombre": nombre,
                "marca": marca,
                "modelo": modelo,
                "color": color,
                "descripcion": descripcion,
                "dimensiones": dimensiones,
                "precioCompra": precioCompra,
                "precioVenta": precioVenta,
                "existencias": existencias,
                "fotografia": fotografia,
                "estatus": estatus
            };

            armazones[indexArmazonSeleccionado] = armazon;
            limpiarFormulario();
            cargarTabla();
        }
    }
}

export function enviarFormulario() {
    var nombre = document.getElementById("inputNombre");
    var marca = document.getElementById("inputMarca");
    var modelo = document.getElementById("inputModelo");
    var color = document.getElementById("inputColor");
    var descripcion = document.getElementById("inputDescripcion");
    var dimensiones = document.getElementById("inputDimensiones");
    var precioCompra = document.getElementById("inputPrecioC");
    var precioVenta = document.getElementById("inputPrecioV");
    var existencias = document.getElementById("inputExistencias");
    var fotografia = document.getElementById("inputFotografia");

    var correcto = true;
    if (nombre.value === null || nombre.value === '') {
        alert("Dejaste vacío el campo del NOMBRE, asegúrate de llenarlo.");
        correcto = false;
    }

    if (marca.value === null || marca.value === '') {
        alert("Dejaste vacío el campo de MARCA, asegúrate de llenarlo.");
        correcto = false;
    }

    if (modelo.value === null || modelo.value === '') {
        alert("Dejaste vacío el campo de MODELO, asegúrate de llenarlo.");
        correcto = false;
    }

    if (color.value === null || color.value === '') {
        alert("Dejaste vacío el campo de COLOR, asegúrate de llenarlo.");
        correcto = false;
    }

    if (descripcion.value === null || descripcion.value === '') {
        alert("Dejaste vacío el campo de DESCRIPCION, asegúrate de llenarlo.");
        correcto = false;
    }

    if (dimensiones.value === null || dimensiones.value === '') {
        alert("Dejaste vacío el campo de DIMENSIONES, asegúrate de llenarlo.");
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

    if (fotografia.value === null || fotografia.value === '') {
        alert("Dejaste vacío el campo de FOTOGRAFIA, asegúrate de llenarlo.");
        correcto = false;
    }

    if (correcto) {
        alert("Los datos se ingresaron de forma correcta");
    }
    return correcto;

}