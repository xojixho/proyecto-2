$(document).ready(function () {
    listarProductos();
});

function listarProductos() {
    $.ajax({
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
        cardBody+= `
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
                        <a href="#" class="btn btn-info">Editar</a>
                        <a href="#" class="btn btn-danger">Eliminar</a>
                    </div>
                </div>
            </div>
            `
    }

    cardBody += "</div></div>";
    $("#productos").html(cardBody);
}
