const loginSubmit=document.getElementById("login-submit");
const loginEmail=document.getElementById("login-email");
const loginPassword=document.getElementById("login-password");

loginSubmit.addEventListener("click",()=>{
    if(loginEmail.validity.typeMismatch){
        loginEmail.setCustomValidity('Please enter correct email');
        if(loginPassword.textContent==""){
            loginPassword.setCustomValidity('please enter a password');
        }
    }else{
        loginEmail.setCustomValidity('');
    }
})