$("#close").on("click", function () {
    $("#userRegModal").modal("hide");
});

/**
 * validar formulario de registro
 * @returns {void}
 */
function validateForm() {
    $("#tituloRegistro").text("");
    $("#userRegModal").modal("hide");

    if (checkFields()) {
        if (!existEmail()) {
            record();
        } else {
            $('#tituloRegistro').text(`error contraseña`);
            $('#userRegModal').modal('show');
        }
    }
}

/**
 * registrar nuevo usuario
 * @returns {void}
 */
function record() {

    $("#tituloRegistro").text("");
    $("#userRegModal").modal("hide");

    var data = {
        id: $("#id").val(),
        identification: $("#identificacion").val(),
        name: $("#nombre").val(),
        address: $("#direccion").val(),
        cellPhone: $("#telefono").val(),
        email: $("#email").val(),
        password: $("#clave").val(),
        zone: $("#zona").val(),
        type: $("#tipo").val()

    };

    $.ajax({
        url: "http://localhost:8080/api/user/new",
        async: true,
        type: "POST",
        dataType: "JSON",
        contentType: "application/JSON; charset=utf-8",
        data: JSON.stringify(data),

        success: function (json) {
            limpiarCampos();
            $('#tituloRegistro').text('Cuenta creada de forma correcta');
            $('#userRegModal').modal('show');
        },
        error: function (error) {
            $('#tituloRegistro').text(`No fue posible crear la cuenta`);
            $('#userRegModal').modal('show');
        }
    });
}

/**
 * Validar que el usuario existe
 * @returns {void}
 */
function existEmail() {

    $("#tituloRegistro").text("");
    $("#userRegModal").modal("hide");

    var email = $("#email").val();
    var url = "http://localhost:8080/api/user/emailexist/" + email;
    $.ajax({
        url: url,
        async: true,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/JSON',
        success: function (answer) {
            if (answer !== false) {
                $('#tituloRegistro').text('El usuario ya existe');
                $('#userRegModal').modal('show');
            }
        },
        error: function (error) {
            $("#tituloRegistro").text("Error");
            $("#userRegModal").modal("show");
        }

    });
}

/**
 * Metodo para limpiar campos luego de registrar
 * @returns {void}
 */
function limpiarCampos() {
    $("#id").val("");
    $("#identificacion").val("");
    $("#nombre").val("");
    $("#email").val("");
    $("#clave").val("");
    $("#telefono").val("");
    $("#direccion").val("");
    $("#zona").val("NO DEFINIDO");
    $("#tipo").val("NO DEFINIDO");
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
    let identification = $("#identificacion").val();
    let nombre = $("#nombre").val();
    let direccion = $("#direccion").val();
    let cellPhone = $("#telefono").val();
    let email = $("#email").val();
    let password = $("#clave").val();
    let zona = $("#zona").val();
    let tipo = $("#tipo").val();


    $("#tituloRegistro").text("");
    $("#userRegModal").modal("hide");
    if (isEmpty(id)) {
        $("#tituloRegistro").text("Ingresar id");
        $("#userRegModal").modal("show");
        return false;
    } else if (isEmpty(identification)) {
        $("#tituloRegistro").text("Ingresar identificacion");
        $("#userRegModal").modal("show");
        return false;
    } else if (isEmpty(nombre)) {
        $("#tituloRegistro").text("Ingresar nombre");
        $("#userRegModal").modal("show");
        return false;
    } else if (isEmpty(direccion)) {
        $("#tituloRegistro").text("Ingresar direccion");
        $("#userRegModal").modal("show");
        return false;
    } else if (isEmpty(cellPhone)) {
        $("#tituloRegistro").text("Ingresar telefono");
        $("#userRegModal").modal("show");
        return false;
    } else if (isEmpty(email)) {
        $("#tituloRegistro").text("Ingresar email");
        $("#userRegModal").modal("show");
        return false;
    } else if (isEmpty(password)) {
        $("#tituloRegistro").text("Ingresar clave");
        $("#userRegModal").modal("show");
        return false;
    } else if (zona == "NO DEFINIDO") {
        $("#tituloRegistro").text("Ingresar zona");
        $("#userRegModal").modal("show");
        return false;
    } else if (tipo == "NO DEFINIDO") {
        $("#tituloRegistro").text("Ingresar tipo");
        $("#userRegModal").modal("show");
        return false;
    } else
        return true;

}