/**
 * validar string vacio
 * @param {type} field
 * @returns {Boolean}
 */
 function isEmpty(field) {
    return field === "";
}

/**
 * valida el correo electrónico: tomado de
 * https://www.w3resource.com/javascript/form/email-validation.php
 */
 function ValidateEmail(valor) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return valor.match(mailformat);
}