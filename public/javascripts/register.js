function registration(){
    var email = $("#email").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var repeatPassword = $("#repeat").val();

    if ((password.length == 0 || repeatPassword.length == 0) || password !== repeatPassword) {
        alert("Password does not match...");
    } else {
        $.ajax({
            type: "PUT",
            url: "/api/users",
            data: "email="+email+"&"+"username="+username+"&"+"password="+password,
            success: function(data){
                alert(data);
            }
        });
    }
}
