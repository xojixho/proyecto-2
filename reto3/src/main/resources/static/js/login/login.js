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
    let url = 'http://127.0.0.1:8080/api/user/' + correo + '/' + contraseña;

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
                irAlMenu(answer);
            }
        },
        error: function (xhr, status) {
            $('#titulo').text("Ocurrio un problema al ejecutar la petición..." + status);
            $('#myModal').modal('show');
        }
    });
}

function resolveAfter2Seconds(input) {
    return new Promise(resolve => {
        setTimeout(() => {
            //resolve(x);
            let user = JSON.stringify(input);
            sessionStorage.setItem("user", user);
            location.href = "menu.html";

        }, 2000);
    });
}

async function irAlMenu(data) {

    let userData = {
        id: data.id,
        identification: data.identification,
        name: data.name,
        birthtDay: data.birthtDay,
        monthBirthtDay: data.monthBirthtDay,
        address: data.address,
        cellPhone: data.cellPhone,
        email: data.email,
        password: data.password,
        zone: data.zone,
        type: data.type
    };

    $('#titulo').text(`Bienvenido ` + userData.name);
    $('#myModal').modal('show');
    $('#close').hide();

    var x = await resolveAfter2Seconds(userData);

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
            $("#titulo").text("Error validacion");
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

