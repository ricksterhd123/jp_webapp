function registration(){
    var email = $("#email").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var repeatPassword = $("#repeat").val();
    console.log(email);
    
        $.ajax({
            type: "PUT",
            url: "/api/users",
            data: "username="+username+"&"+"password="+password,
            success: function(data){
                alert(data);
            }
        });
}
