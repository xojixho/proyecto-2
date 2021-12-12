$("#close").on("click", function () {
    $("#prodModal").modal("hide");
});

/**
 * validar formulario de registro
 * @returns {void}
 */
function validateForm() {
    $("#tituloProducto").text("");
    $("#prodModal").modal("hide");

    if (checkFields()) {
        crearProducto();
    } /* else {
        $('#tituloProducto').text(`error en los campos`);
        $('#prodModal').modal('show');
    } */
}

/**
 * registrar nuevo usuario
 * @returns {void}
 */
 function crearProducto() {

    $("#tituloProducto").text("");
    $("#prodModal").modal("hide");

    var data = {
        id: $("#id").val(),
        description: $("#descripcion").val(),
        brand: $("#marca").val(),
        model: $("#modelo").val(),
        os: $("#so").val(),
        procesor: $("#procesador").val(),
        memory: $("#memoria").val(),
        hardDrive: $("#disco").val(),
        quantity: $("#cantidad").val(),
        photography: $("#imagen").val(),
        price: $("#precio").val()
        
    };

    $.ajax({
        url: "http://localhost:8080/api/laptop/new",
        async: true,
        type: "POST",
        dataType: "JSON",
        contentType: "application/JSON; charset=utf-8",
        data: JSON.stringify(data),

        success: function (json) {
            limpiarCampos();
            $('#tituloProducto').text('Producto creado de forma correcta');
            $('#prodModal').modal('show');
        },
        error: function (error) {
            $('#tituloRegistro').text(`No fue posible crear el producto`);
            $('#prodModal').modal('show');
        }
    });
}

/**
 * Metodo para limpiar campos luego de registrar
 * @returns {void}
 */
 function limpiarCampos() {
    $("#id").val("");
    $("#descripcion").val("");
    $("#marca").val("Elegir");
    $("#modelo").val("");
    $("#so").val("Elegir");
    $("#procesador").val("");
    $("#memoria").val("Elegir");
    $("#disco").val("");
    $("#cantidad").val("");
    $("#imagen").val("");
    $("#precio").val("");
}

/**
 * validar string vacia
 * @param {type} field
 * @returns {Boolean}
 */
 function isEmpty(field) {
    return field === "";
}

/**
 * Validar campos vacios
 * @returns {Boolean}
 */
function checkFields() {
    let id = $("#id").val();
    let descripcion = $("#descripcion").val();
    let marca = $("#marca").val();
    let modelo = $("#modelo").val();
    let so = $("so").val();
    let procesador = $("#procesador").val();
    let memoria = $("#memoria").val();
    let disco = $("#disco").val();
    let cantidad = $("#cantidad").val();
    let imagen = $("#imagen").val();
    let precio = $("#precio").val();


    $("#tituloProducto").text("");
    $("#prodModal").modal("hide");
    if (isEmpty(id)) {
        $("#tituloProducto").text("Ingresar id");
        $("#prodModal").modal("show");
        console.log('hola');
        return false;
    } else if (isEmpty(descripcion)) {
        $("#tituloProducto").text("Ingresar descripcion");
        $("#prodModal").modal("show");
        return false;
    } else if (marca == "Not selected") {
        $("#tituloProducto").text("Ingresar marca");
        $("#prodModal").modal("show");
        return false;
    } else if (isEmpty(modelo)) {
        $("#tituloProducto").text("Ingresar modelo");
        $("#prodModal").modal("show");
        return false;
    } else if (so == "Not selected") {
        $("#tituloProducto").text("Ingresar sistema operativo");
        $("#prodModal").modal("show");
        return false;
    } else if (isEmpty(procesador)) {
        $("#tituloProducto").text("Ingresar procesador");
        $("#prodModal").modal("show");
        return false;
    } else if (memoria == "Not selected") {
        $("#tituloProducto").text("Ingresar memoria");
        $("#prodModal").modal("show");
        return false;
    } else if (isEmpty(disco)) {
        $("#tituloProducto").text("Ingresar disco");
        $("#prodModal").modal("show");
        return false;
    } else if (isEmpty(cantidad)) {
        $("#tituloProducto").text("Ingresar cantidad");
        $("#prodModal").modal("show");
        return false;
    }else if (isEmpty(imagen)) {
        $("#tituloProducto").text("Ingresar imagen");
        $("#prodModal").modal("show");
        return false;
    }else if (isEmpty(precio)) {
        $("#tituloProducto").text("Ingresar precio");
        $("#prodModal").modal("show");
        return false;
    }else
        return true;

}