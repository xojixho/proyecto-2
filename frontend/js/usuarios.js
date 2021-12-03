$(document).ready(function () {
    listarUsuarios();
});

function listarUsuarios() {
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            llenarTablaUsuarios(respuesta);
        }
    });
}

function llenarTablaUsuarios(respuesta) {
    let tbody = "<tr>";
    for (i = 0; i < respuesta.length; i++) {
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
    }

    tbody += "</tr>";
    $("#resultadoUsuarios").html(tbody);
}


function formularioEditarUsuario(usuario){
    $("#nuevoUsuario").hide();
    $("#titulo").html("editar usuario");
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
        url: "http://localhost:8080/api/user/"+usuario,
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
    console.log('hola');
}