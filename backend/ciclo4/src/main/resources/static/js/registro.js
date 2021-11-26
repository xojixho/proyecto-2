$("#close").on("click", function () {
    $("#myModal").modal("hide");
});

/**
 * validar formulario de registro
 * @returns {void}
 */
function validateForm() {
    $("#title-answer").text("");
    $("#myModal").modal("hide");

    if (checkFields()) {
        console.log("fields ok");
        if (!existEmail()) {
            console.log("email ok");
            if (repeatedPassword()) {
                console.log("password ok");
                record();
            } else {
                $('#title-answer').text(`error contraseña`);
                $('#myModal').modal('show');
            }
        }
    }
}

/**
 * registrar nuevo usuario
 * @returns {void}
 */
function record() {

    $("#title-answer").text("");
    $("#myModal").modal("hide");

    var data = {
        name: $("#username").val(),
        email: $("#useremail").val(),
        password: $("#password").val()

    };

    $.ajax({
        url: "http://129.151.121.31/api/user/new",
        async: true,
        type: "POST",
        dataType: "JSON",
        contentType: "application/JSON; charset=utf-8",
        data: JSON.stringify(data),
        
        success: function (json) {
            console.log(json.name);
            limpiarCampos();
                    $('#title-answer').text('Cuenta creada de forma correcta');
                    $('#myModal').modal('show');
                },
                error: function (error) {
                    console.log(error, xhr);
                    $('#title-answer').text(`No fue posible crear la cuenta`);
                    $('#myModal').modal('show');
                }
    });
}

/**
 * Verificamos que el password coincida
 * @returns {Boolean}
 */
function repeatedPassword() {
    var password = $("#password").val();
    var passwordRepeated = $("#passwordrepeat").val();
    if (password === passwordRepeated) {
        return true;
    } else
        return false;
}

/**
 * Validar que el usuario existe
 * @returns {void}
 */
function existEmail() {

    $("#title-answer").text("");
    $("#myModal").modal("hide");

    var useremail = $("#useremail").val();
    var url = "http://129.151.121.31/api/user/" + useremail;
    $.ajax({
        url: url,
        async: true,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/JSON',
        success: function (answer) {
            console.log("user exist? " + answer);
            if (answer !== false) {
                $('#title-answer').text('El usuario ya existe');
                $('#myModal').modal('show');
            }
        },
        error: function (error) {
            console.log(error);
            $("#title-answer").text("Error");
            $("#myModal").modal("show");
        }

    });
}

/**
 * Metodo para limpiar campos luego de registrar
 * @returns {void}
 */
function limpiarCampos() {
    $("#username").val("");
    $("#useremail").val("");
    $("#password").val("");
    $("#passwordrepeat").val("");
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
    let username = $("#username").val();
    let useremail = $("#useremail").val();
    let password = $("#password").val();
    let repassword = $("#passwordrepeat").val();

    $("#title-answer").text("");
    $("#myModal").modal("hide");

    if (isEmpty(username)) {
        $("#title-answer").text("Ingresar nombre");
        $("#myModal").modal("show");
        return false;
    } else if (isEmpty(useremail)) {
        $("#title-answer").text("Ingresar email");
        $("#myModal").modal("show");
        return false;
    } else if (isEmpty(password)) {
        $("#title-answer").text("Ingresar contraseña");
        $("#myModal").modal("show");
        return false;
    } else if (isEmpty(repassword)) {
        $("#title-answer").text("Confirmar contraseña");
        $("#myModal").modal("show");
        return false;
    } else
        return true;

}