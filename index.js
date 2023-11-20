function index() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "ar" && password === "12") {
        alert("Login Successful");
        window.location.assign("index.html");
    } else {
        alert("Login Failed");
    }
}
