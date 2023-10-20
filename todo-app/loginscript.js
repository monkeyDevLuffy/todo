//functions
const loginBtn = document.querySelector("#login-button");
const googleLoginButton = document.getElementById("google-login");



//event listeners
document.addEventListener("submit",(event)=>{
    event.preventDefault();
    const form = document.querySelector("#login-form");
    //creating a FormData object
    const formData = new FormData(form);
    console.log(formData);
    const email = formData.get('email');
    const password = formData.get('password');
    if(email==="" || password ===""){
        alert("enter complete credentials");
        return;
    }
    if(email==='abhishek@gmail.com'){
        if(password==='abhishek'){
            window.location.replace('/users/abhishek/projects.html');
        }
        else{
            alert("incorrect password");
        }
    }else if(email==='pooja@gmail.com'){
        if(password==='pooja'){
            window.location.replace('/users/pooja/projects.html');

        }
        else{
            alert("incorrect password");
        }
    }else alert("user not registered");
})