'use strick'


document.getElementById("login-btn").addEventListener("click", () => {
    let email = document.getElementById("email-input").value
    let password = document.getElementById("password-input").value
    axios.post('https://reqres.in/api/login', {
        "email": email,
        "password": password                
    })
.then(function (response) {
    // alert("good user")
    let token = response.data.token
    // localStorage.setItem("token", token)
    window.location = "index-2.html"
}).catch(error => {
    alert(error.response.data.error);
})    
})