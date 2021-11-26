$('#close').on('click', function () {
    $('#myModal').modal('hide');
});

function iniciarSesion() {
    let correo = $('#useremail').val();
    let contraseña = $('#password').val();
    let url = 'http://129.151.121.31/api/user/' + correo + '/' + contraseña;
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/JSON',
        success: function (answer) {
            console.log(answer.name);
            console.log(answer);
                    if (answer.name === 'NO DEFINIDO') {
                        $('#titulo').text(`No existe el usuario`);
                        $('#myModal').modal('show');
                    } else {
                        $('#titulo').text('Bienvenido ');
                        $('#myModal').modal('show');
                    }           
        }
    });
}

function limpiarCampos() {
    $("#useremail").val("");
    $("#password").val("");
}

function isEmpty(field) {
    return field === "";
}

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

function isUser() {
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
                iniciarSesion();
        },
        error: function (error) {
            console.log(error);
            $("#titulo").text("Error");
            $("#myModal").modal("show");
        }
    });
}

function validateUser() {

    if (checkFields()) {
        isUser();
    }
}

