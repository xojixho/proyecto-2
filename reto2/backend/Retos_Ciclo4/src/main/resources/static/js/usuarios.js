$(document).ready(function () {
    listarUsuarios();
});

function listarUsuarios() {
    $.ajax({
        url: "http://129.151.121.31/api/user/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            llenarTablaUsuarios(respuesta);
        }
    });
}

function llenarTablaUsuarios(respuesta) {
    let tbody = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        tbody+="<tr>";
        tbody += "<th scope='row'>" + respuesta[i].identification + "</th>";
        tbody += "<td>" + respuesta[i].name + "</td>";
        tbody += "<td>" + respuesta[i].address + "</td>";
        tbody += "<td>" + respuesta[i].cellPhone + "</td>";
        tbody += "<td>" + respuesta[i].email + "</td>";
        tbody += "<td>" + respuesta[i].password + "</td>";
        tbody += "<td>" + respuesta[i].zone + "</td>";
        tbody += "<td>" + respuesta[i].type + "</td>";
        tbody += "<td><button type='button' class='btn btn-success' onclick='formularioEditarUsuario(" + JSON.stringify(respuesta[i].id) + ")'>Editar</button></td>";
        tbody += "<td><button type='button' class='btn btn-danger' onclick='borrarUsuario(" + JSON.stringify(respuesta[i].id) + ")'>Borrar</button></td>";
        tbody+="</tr>";
    }

    tbody += "</table>";
    $("#resultadoUsuarios").html(tbody);
}


function formularioEditarUsuario(usuario){
    $("#nuevoUsuario").hide();
    $("#titulo").html("Editar usuario");
    $("#contenido").html(
        `
        <div class="col"></div>
        <div class="col">
        <div id="registro-form" class="form-responsive">

            <div class="form-group">
                <label for="id" class="text-info">Id:</label><br />
                <input type="text" name="id" id="id" class="form-control" disabled />
            </div>
            <div class="form-group">
                <label for="identificacion" class="text-info">Identificacion:</label><br />
                <input type="text" name="identificacion" id="identificacion" class="form-control"
                    required />
            </div>
            <div class="form-group">
                <label for="nombre" class="text-info">Nombre:</label><br />
                <input type="email" name="nombre" id="nombre" class="form-control" required />
            </div>

        </div>
    </div>

    <div class="col">

        <div class="form-group">
            <div class="form-group">
                <label for="direccion" class="text-info">Direccion:</label><br />
                <input type="text" name="direccion" id="direccion" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="telefono" class="text-info">Teléfono:</label><br />
                <input type="text" name="telefono" id="telefono" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="email" class="text-info">Email:</label><br />
                <input type="text" name="email" id="email" class="form-control" required />
            </div>

        </div>
    </div>
    <div class="col">
        <div class="form-group">
            <div class="form-group">
                <label for="clave" class="text-info">Clave:</label><br />
                <input type="text" name="clave" id="clave" class="form-control" required/>
            </div>
            <div class="form-group">
                <label for="zonas" class="text-info input-group-addon">Zona:</label><br />
                <select id="zona" name="zonas" class="form-control" required>

                    <option value="NO DEFINIDO">SELECCIONA</option>
                    <option value="ZONA 1">ZONA 1 - LAURELES</option>
                    <option value="ZONA 2">ZONA 2 - EL POBLADO</option>
                    <option value="ZONA 3">ZONA 3 - ROBLEDO</option>
                    <option value="ZONA 4">ZONA 4 - BELÉN</option>
                    <option value="ZONA 5">ZONA 5 - LA AMÉRICA</option>
                    <option value="ZONA 6">ZONA 6 - BUENOS AIRES</option>
                    <option value="ZONA 7">ZONA 7 - CANDELARIA</option>
                    <option value="ZONA 8">ZONA 8 - ARANJUEZ</option>
                </select>
            </div>
            <div class="form-group">
                <label for="tipos" class="text-info input-group-addon">Tipo:</label><br />
                <select id="tipo" name="tipos" class="form-control" required>

                    <option value="NO DEFINIDO">SELECCIONA</option>
                    <option value="COORD">COORDINADOR ZONA</option>
                    <option value="AC">ASESOR COMERCIAL</option>
                </select>
            </div>
        </div>
        </div>
        <div class="col"></div>

    <div class="btn-group justify-content-center">
    <div class=" row">
    <div>
    <button class="btn btn-info" type="button" onclick="editarUsuario()">Editar</button>
    <button class="btn btn-info" type="button" onclick="window.location='usuarios.html'">Cancelar</button>
    </div>

    </div>
    </div>
    
    `
    );

    $.ajax({
        url: "http://129.151.121.31/api/user/"+usuario,
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            $("#id").val(respuesta.id);
            $("#identificacion").attr("placeholder", `${respuesta.identification}`);
            $("#nombre").attr("placeholder", `${respuesta.name}`);
            $("#direccion").attr("placeholder", `${respuesta.address}`);
            $("#telefono").attr("placeholder", `${respuesta.cellPhone}`);
            $("#email").attr("placeholder", `${respuesta.email}`);
            $("#clave").attr("placeholder", `${respuesta.password}`);
            $("#zona").val(respuesta.zone);
            $("#tipo").val(respuesta.type);

        }
    });


}




function editarUsuario(){
    if(checkFields()){
        updateUser();
    }
}

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


    $("#tituloUsuario").text("");
    $("#userModal").modal("hide");
    if (isEmpty(id)) {
        $("#tituloUsuario").text("Ingresar id");
        $("#userModal").modal("show");
        return false;
    } else if (isEmpty(identification)) {
        $("#tituloUsuario").text("Ingresar identificación");
        $("#userModal").modal("show");
        return false;
    } else if (isEmpty(nombre)) {
        $("#tituloUsuario").text("Ingresar nombre");
        $("#userModal").modal("show");
        return false;
    } else if (isEmpty(direccion)) {
        $("#tituloUsuario").text("Ingresar dirección");
        $("#userModal").modal("show");
        return false;
    } else if (isEmpty(cellPhone)) {
        $("#tituloUsuario").text("Ingresar teléfono");
        $("#userModal").modal("show");
        return false;
    } else if (isEmpty(email)) {
        $("#tituloUsuario").text("Ingresar email");
        $("#userModal").modal("show");
        return false;
    } else if (isEmpty(password)) {
        $("#tituloUsuario").text("Ingresar clave");
        $("#userModal").modal("show");
        return false;
    } else if (zona == "NO DEFINIDO") {
        $("#tituloUsuario").text("Ingresar zona");
        $("#userModal").modal("show");
        return false;
    } else if (tipo == "NO DEFINIDO") {
        $("#tituloUsuario").text("Ingresar tipo");
        $("#userModal").modal("show");
        return false;
    } else
        return true;

}

function updateUser() {

    $("#tituloUsuario").text("");
    $("#userModal").modal("hide");

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
        url: "http://129.151.121.31/api/user/update",
        async: true,
        type: "PUT",
        dataType: "JSON",
        contentType: "application/JSON; charset=utf-8",
        data: JSON.stringify(data),

        success: function (json) {
            limpiarCampos();
            $('#tituloUsuario').text('Cambios realizados de forma exitosa');
            $('#userModal').modal('show');
            $('#close').hide();
            irListarUsuarios();
        },
        error: function (error) {
            $('#tituloUsuario').text(`No fue posible editar la cuenta`);
            $('#userModal').modal('show');
        }
    });
}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            //resolve(x);
            window.location = "usuarios.html";
        }, 500);
    });
}

async function irListarUsuarios() {
    var x = await resolveAfter2Seconds();

    //console.log(x); // 10
}


/**
 * Metodo eliminar
 * @param {*} codigo 
 */

function borrarUsuario(codigo) {
    let datos = {
        id: codigo
    }

    let = datoBorrar = JSON.stringify(datos);
    $.ajax({
        url: "http://129.151.121.31/api/user/"+codigo,
        data: datoBorrar,
        type: "DELETE",
        contentType: "application/JSON",
        dataType: "json",
        success: function (respuesta) {
            $('#tituloUsuario').text('Usuario eliminado de forma exitosa');
            $('#userModal').modal('show');
            $('#close').hide();
            irListarUsuarios();
        },
        error: function (xhr, status) {
            $('#tituloUsuario').text(`No fue posible eliminar la cuenta`);
            $('#userModal').modal('show');
        }
    });
}
