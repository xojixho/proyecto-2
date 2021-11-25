$(document).ready(function(){
    registrar();
});

function record() {
    if (equalEmail()) {
        let data = {
            name: $("#username").val(),
            email: $("#useremail").val(),
            password: $("#password").val()

        };

        $.ajax({
            url:"http://129.151.121.31/api/user/new/",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/JSON; charset=utf-8",
            success: function(answer){
                alert("User Registry OK!");
            },
            error: function(xhr, status){
                alert("Registry error! "+ status);
            }
        });

    } else {
        alert("Passwords are not the same");
    }
};


function equalEmail() {
    let password = document.getElementById("password").val;
    let passwordRepeated = document.getElementById("passwordrepeat");
    if (password === passwordRepeated) {
        return true;
    } else {
        return false;
    }

}