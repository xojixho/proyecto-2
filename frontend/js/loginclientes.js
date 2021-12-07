$('#close').on('click', function () {
    $('#myModal').modal('hide');
});

/**
 * Iniciar sesion
 * @returns {void}
 */
function iniciarSesion() {
    let correo = $('#useremail').val();
    let contraseña = $('#password').val();
    let url = 'http://localhost:8080/api/user/' + correo + '/' + contraseña;
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/JSON',
        success: function (answer) {
            console.log(answer.name);
            console.log(answer);
            if (answer.id == null) {
                $('#titulo').text(`No existe el usuario`);
                $('#myModal').modal('show');
            } else {
                $('#titulo').text(`Bienvenido`);
                $('#myModal').modal('show');
                $('#close').hide();
                irListarUsuarios();
                //window.location = "usuarios.html";
            }
        }
    });
}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            //resolve(x);
            window.location = "/frontend/clientes.html";
        }, 2000);
    });
}

async function irListarUsuarios() {
    var x = await resolveAfter2Seconds();

    //console.log(x); // 10
}



/**
 * Limpiar campos
 * @returns {void}
 */
function limpiarCampos() {
    $("#useremail").val("");
    $("#password").val("");
}

/**
 * validar string vacio
 * @param {type} field
 * @returns {Boolean}
 */
function isEmpty(field) {
    return field === "";
}

/**
 * validar campos vacios en login
 * @returns {Boolean}
 */
function checkFields() {
    let password = $("#password").val();
    let useremail = $("#useremail").val();

    $("#titulo").text("");
    $("#myModal").modal("hide");

    if (isEmpty(useremail)) {
        $("#titulo").text("Ingresar email");
        $("#myModal").modal("show");
        return false;
    } else if (isEmpty(password)) {
        $("#titulo").text("Ingresar contraseña");
        $("#myModal").modal("show");
        return false;
    } else
        return true;
}

/**
 * verifiacar un usuario con cuenta
 * @returns {void}
 */
function isUser() {
    var useremail = $("#useremail").val();
    var url = "http://127.0.0.1:8080/api/user/emailexist/" + useremail;
    $.ajax({
        url: url,
        async: true,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/JSON',
        success: function (answer) {
            console.log("user exist? " + answer);
            iniciarSesion();
        },
        error: function (error) {
            console.log(error);
            $("#titulo").text("Error");
            $("#myModal").modal("show");
        }
    });
}

/**
 * Metodo que valida y registra al usuario nuevo
 * @returns {void}
 */
function validateUser() {

    if (checkFields()) {
        isUser();
    }
}
