//functions

async function userSignin(event){
    //getting form data
    const formData = new FormData(document.getElementById("login-form"));
    const inputUsername = formData.get('username');
    const inputPassword = formData.get('password');
    if(inputUsername===""||inputPassword===""){
        alert("enter complete credentials");
        return;
    }else{
        const users = await fetch("./user-info.json").then(response=>response.json());
        const user = users.find(element=>{
            return element.username===inputUsername?true:false;
        });
        if(user===undefined){
            alert("user is not registered");
            return;
        }else{
            if(inputPassword===user.password){
                localStorage.setItem("username", user.username);
                window.location.replace('/users/abhishek/projects.html');
            }else{
                alert("incorrect password");
                return
            }
        }
    }
    

}
const loginBtn = document.querySelector("#login-button");
const googleLoginButton = document.getElementById("google-login");

const users = (fetch("./user-info.json").then((res)=>(res.json())).then((data)=>{
    const user = data.find(element=>{
        if(element.username=="abhishek")
            return true;
        return false;
    })
}));

//event listeners
window.addEventListener("submit",(event)=>{
    event.preventDefault();
    userSignin(event);
});