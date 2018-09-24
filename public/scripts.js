$("#login").click(function(){
    var username =$("#student-id").val();
    var password =$("#password").val();

    var credentials={
        student_id:username,
        password:password
    };

    console.log(`${username} ${password}`);
    $.ajax({
        type:"POST",
        url:"/login",
        dataType: "json",
        data:credentials,
        success:function(data){
            localStorage.setItem("token",data.token);
            window.location.replace("/users");
        },
        error:function(){
            console.log("error from the method");
            window.location.replace("/login");
        }
    });
});