$(document).ready(function () {
    listarProductos();
});

function listarProductos() {
    $.ajax({
        async:"true",
        url: "http://localhost:8080/api/laptop/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            llenarTarjetaProductos(respuesta);
        }
    });
}

function llenarTarjetaProductos(item) {
    let cardBody = `<div class="container"><div class="row justify-content-center">`;
    for (i = 0; i < item.length; i++) {
        cardBody += `
            <div class="card" style="width: 15rem; margin: 2px">
                <img src="${item[i].photography}" class="card-img-top" alt="producto">
                <div class="card-body" style="padding: 5px;">
                    <h5 class="card-title">$ ${item[i].price}</h5>
                    <h6 class="card-subtitle mb-5 text-muted" style="margin-bottom: 1rem!important">
                        Stock: ${item[i].quantity}</h6>
                    <p class="card-text"><strong> ${item[i].description} ${item[i].brand} </strong>,
                        ${item[i].os} <strong>procesador: </strong> ${item[i].procesor}, <strong>memoria: </strong>
                        ${item[i].memory}, <strong>disco duro: </strong>${item[i].hardDrive}.</p>
                </div>
                <div class="card-footer" style="padding: 5px">
                    <div class="card-body" style="padding: 5px">
                        <a href="#" class="btn btn-info" onclick="formularioEditarProducto(${item[i].id})">Editar</a>
                        <a href="#" class="btn btn-danger" onclick="eliminarProducto(${item[i].id})">Eliminar</a>
                    </div>
                </div>
            </div>
            `
    }

    cardBody += "</div></div>";
    $("#productos").html(cardBody);
}

function formularioEditarProducto(producto) {
    $("#nuevoProducto").hide();
    $("#titulo").html("Editar Producto");

    $.ajax({
        url: "http://localhost:8080/api/laptop/all",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            $("#productos").html(
                `
                <div id="form-nuevo-prod" class="row justify-content-center">
                <div class="card" style="background-color:#eeeee8; width: 36rem; padding: 10px;">
        
                            <form style="margin: 10px;">
                                <!-- Id -->
                                <div class="form-group">
                                    <label for="id" style="padding: 2px; margin-right:3px">Id: </label>
                                    <input type="number" class="form-control col-md-4" id="id" disabled value="${respuesta[producto].id}">
                                </div>
                                <!-- descripcion y marca -->
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="descripcion">Descripcion:</label>
                                        <input type="text" class="form-control" id="descripcion" placeholder="${respuesta[producto].description}">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="marca">Marca:</label>
                                        <select name="marca" id="marca" class="form-control">
                                            <option value="Not selected">Elegir</option>
                                            <option selected>${respuesta[producto].brand}</option>
                                            <option value="HP">HP</option>
                                            <option value="Huawei">Huawei</option>
                                            <option value="Asus">Asus</option>
                                            <option value="Lenovo">Lenovo</option>
                                        </select>
                                    </div>
                                </div>
        
                                <!-- modelo y sistema operativo -->
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="modelo">Modelo:</label>
                                        <input type="text" class="form-control" id="modelo" placeholder="${respuesta[producto].model}">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="so">Sistema Operativo:</label>
                                        <select name="so" id="so" class="form-control">
                                            <option value="Not selected">Elegir</option>
                                            <option selected>${respuesta[producto].os}</option>
                                            <option value="Win10 Home">Win10 Home</option>
                                            <option value="Win10 Pro">Win10 Pro</option>
                                            <option value="Ubuntu">Ubuntu 18.9.8</option>
                                            <option value="Win11">Win11</option>
                                        </select>
                                    </div>
                                </div>
        
                                <!-- procesador y memoria -->
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="procesador">Procesador:</label>
                                        <input type="text" class="form-control" id="procesador" placeholder="${respuesta[producto].procesor}">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="memoria">Memoria:</label>
                                        <select name="memoria" id="memoria" class="form-control">
                                            <option value="Not selected">Elegir</option>
                                            <option selected>${respuesta[producto].memory}</option>
                                            <option value="4GB">4GB</option>
                                            <option value="16GB">16GB</option>
                                            <option value="32GB">32GB</option>
                                            <option value="64GB">64GB</option>
                                        </select>
                                    </div>
                                </div>
        
                                <!-- disco duro y cantidad -->
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="disco">Disco Duro:</label>
                                        <input type="text" class="form-control" id="disco" placeholder="${respuesta[producto].hardDrive}">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="cantidad">Cantidad:</label>
                                        <input type="number" class="form-control" name="cantidad" id="${respuesta[producto].quantity}"
                                            placeholder="Cantidad">
                                    </div>
                                </div>
        
                                <!-- imagen y precio-->
                                <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="imagen" style="padding: 2px; margin-right:3px">Imagen: </label>
                                    <input type="text" class="form-control" id="imagen" placeholder="${respuesta[producto].photography}">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="precio" style="padding: 2px; margin-right:3px">Precio: </label>
                                    <input type="text" class="form-control col-md-6" id="precio" placeholder="${respuesta[producto].price}">
                                </div>
                            </div>
        
                                <div class="row justify-content-center" style="margin:10px;">
                                    <div class="col-sm-3">
                                        <button type="button" class="btn btn-block btn-success"
                                            onclick="validateFormEditar()">Editar</button>
                                    </div>
                                    <div class="col-sm-3">
                                        <button type="button" class="btn btn-block btn-danger"
                                            onclick="window.location='catalogo.html'">Cancelar</button>
                                    </div>
        
                                </div>
        
                            </form>
                        </div>
                    </div>
                `
            );
        }
    });
}

/**
 * validar formulario de registro producto
 * @returns {void}
 */
 function validateFormEditar() {
    $("#tituloProducto").text("");
    $("#prodModal").modal("hide");

    if (checkFields()) {
        editarProducto();
    }
}

/**
 * registrar nuevo usuario
 * @returns {void}
 */
 function editarProducto() {

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
        url: "http://localhost:8080/api/laptop/update",
        async: true,
        type: "PUT",
        dataType: "JSON",
        contentType: "application/JSON; charset=utf-8",
        data: JSON.stringify(data),

        success: function (json) {
            limpiarCampos();
            $('#tituloProducto').text('Producto editado de forma correcta');
            $('#prodModal').modal('show');
            $('#close').hide();
            irListarProductos();
            
        },
        error: function (error) {
            $('#tituloRegistro').text(`No fue posible editar el producto`);
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

/**
 * Metodo eliminar
 * @param {*} codigo 
 */

 function eliminarProducto(codigo) {
    let datos = {
        id: codigo
    }

    let = datoBorrar = JSON.stringify(datos);
    $.ajax({
        url: "http://localhost:8080/api/laptop/"+codigo,
        data: datoBorrar,
        type: "DELETE",
        contentType: "application/JSON",
        dataType: "json",
        success: function (respuesta) {
            $('#tituloProducto').text('Producto eliminado de forma exitosa');
            $('#prodModal').modal('show');
            $('#close').hide();
            irListarProductos();
        },
        error: function (xhr, status) {
            $('#tituloProducto').text(`No fue posible eliminar el producto`);
            $('#prodModal').modal('show');
        }
    });
}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            //resolve(x);
            window.location = "catalogo.html";
        }, 500);
    });
}

async function irListarProductos() {
    var x = await resolveAfter2Seconds();

    //console.log(x); // 10
}
