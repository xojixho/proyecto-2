$(document).ready(function () {
    estadoInicial();

    $("#cerrarSesion").click(function () {
        sessionStorage.removeItem("user");
        location.href = "login.html";
    });
});


function estadoInicial() {
    $("#opcionesAsesor").hide();
    $("#opcionesAdm").hide();
    $("#opcionesCoord").hide();

    let usuarioData = sessionStorage.getItem("user");

    if (usuarioData == null) location.href = "index.html";
    else {
        let usuario = JSON.parse(usuarioData);
        console.table(usuario);
        let tipoUsuario;

        if (usuario.type == "ASE") {
            tipoUsuario = "ASESOR";
        } else if (usuario.type == "ADM") {
            tipoUsuario = "ADMINISTRADOR";
        } else if (usuario.type == "COORD") {
            tipoUsuario = "COORDINADOR";
        }

        if (tipoUsuario == "ASESOR") {
            $("#opcionesAsesor").show();
            $("#opcionesAdm").hide();
            $("#opcionesCoord").hide();
        } else if (tipoUsuario == "ADMINISTRADOR") {
            $("#opcionesAdm").show();
            $("#opcionesAsesor").hide();
            $("#opcionesCoord").hide();
        } else if (tipoUsuario == "COORDINADOR") {
            $("#opcionesCoord").show();
            $("#opcionesAsesor").hide();
            $("#opcionesAdm").hide();
        }
        $("#userName").html(usuario.name);
        $("#userEmail").html(usuario.email);
        $("#userType").html(tipoUsuario);

    }
}