

//  ! SHOW SETUP UI
function showUi() {  
    const token = localStorage.getItem("token")

    const loginBtn = document.getElementById("log-in-div")
    const logoutBtn = document.getElementById("logout-div")



    //? ADD NEW POST
    const addBtn = document.getElementById("btn-add")


    // * token == null that mean if the user are not log in
    if (token == null)  {
        if(addBtn != null)
        {
            addBtn.style.setProperty("display", "none", "important")
        }
        logoutBtn.style.setProperty("display", "none", "important")
        loginBtn.style.setProperty("display", "flex", "important")
    } else {  // * here user login
        if(addBtn  != null)
        {
            addBtn.style.setProperty("display", "block", "important")
        }
        loginBtn.style.setProperty("display", "none", "important")
        logoutBtn.style.setProperty("display", "flex", "important")

        const currentUser = getCurrentUser()
        document.getElementById("nav-username").innerHTML = `@${currentUser.username}`
        document.getElementById("user-image").src = currentUser.profile_image

    }
}


// ! BTN-LOGIN
function buttonClicked() {
    let userName = document.getElementById("username-input").value
    let password = document.getElementById("password-input").value
    let parameter = {
        "username" : userName, 
        "password" : password 
    }
    axios.post("https://tarmeezacademy.com/api/v1/login", parameter)
    .then((response) => {
        let token = response.data.token
        // ? Save user
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        // ? hide the modal
        let modal = document.getElementById("login-modal")
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide();
        showSucessMessage("Login successfuly", "success")
        showUi()
    })
    .catch((error) => {
        console.log(error);
    })
    }

    // ! BTN-REGISTER
function registerClicked(){
        let regUserName = document.getElementById("register-username-input").value
        let regName = document.getElementById("name-input").value
        let regPasword = document.getElementById("register-password-input").value
        const image = document.getElementById("register-image-input").files[0]


        let parameter = new FormData()
        parameter.append("username", regUserName)
        parameter.append("password", regPasword)
        parameter.append("image", image)
        parameter.append("name", regName)


        const header = {
            "Content-Type" : "multipart/form-data"
        }
        axios.post("https://tarmeezacademy.com/api/v1/register", parameter, {
            headers: header
        }) .then((response) => {
                console.log(response.data);
                // ? Save user / register
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                // ? hide the modal
                let modal = document.getElementById("register-modal")
                const modalInstance = bootstrap.Modal.getInstance(modal)
                modalInstance.hide();
                showSucessMessage("Register Successfuly", 'success') 
                showUi()
                getPosts()
            })
        .catch((error) => {
        const message = error.response.data.message
        showSucessMessage(message,'danger')
    })
}

// ! SHOW MESSAGE SUCCESS
function showSucessMessage(coustomMeg, color){
    const alertPlaceholder = document.getElementById("succ-alert")
    const alert = (message, type) => {
    const wrapper = document.createElement('div')
        wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

        // alertPlaceholder.append(wrapper)
    }
    alert(coustomMeg, color)
    
    setTimeout(()=> {
        const alertMsg = bootstrap.Alert.getOrCreateInstance('#succ-alert')
        alertMsg.close()
    }, 2000)
}

// ! SHOW LOGOUT MESSSAGE
function showLogoutMessage(){
    const alertPlaceholder = document.getElementById("succ-alert")
    const alert = (message, type) => {
    const wrapper = document.createElement('div')
        wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

        // alertPlaceholder.append(wrapper)
    }
    alert("Logout Successfully", 'danger')

    setTimeout(()=> {
        const alertMsg = bootstrap.Alert.getOrCreateInstance('#succ-alert')
        alertMsg.close()
    }, 2000)
}

    // ! BTN-LOGOUT
function logOut() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    showLogoutMessage("Logout successfuly", "danger")
    showUi()
}

function getCurrentUser(){
    let user = null;
    let storageUser = localStorage.getItem("user")

    if(storageUser != null){
        user = JSON.parse(storageUser)
    }
    return user
}

