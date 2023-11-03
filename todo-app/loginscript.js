//functions

async function userSignin(event){
    //getting form data
    const formData = new FormData(document.getElementById("login-form"));
    const inputUsername = formData.get('username');
    const inputPassword = formData.get('password');
    if(inputUsername===""||inputPassword===""){
        document.getElementById('no-username-alert').classList.add("show");
        setTimeout(()=>{
            document.getElementById('no-username-alert').classList.remove("show");
        },2000);
        return;
    }else{
        const users = await fetch("./user-info.json").then(response=>response.json());
        const user = users.find(element=>{
            return element.username===inputUsername?true:false;
        });
        if(user===undefined){
            document.getElementById('wrong-username-warning').classList.add("show");
            setTimeout(()=>{
                document.getElementById('wrong-username-warning').classList.remove("show");
            },2000)
            return;
        }else{
            if(inputPassword===user.password){
                localStorage.setItem("username", user.username);
                window.location.replace('/users/projects.html');
            }else{
                document.getElementById('wrong-password-warning').classList.add("show");
                setTimeout(()=>{
                    document.getElementById('wrong-password-warning').classList.remove("show");
                },2000)
                return
            }
        }
    }
    

}
const loginBtn = document.querySelector("#login-button");
const googleLoginButton = document.getElementById("google-login");


//event listeners
window.addEventListener("submit",(event)=>{
    event.preventDefault();
    userSignin(event);
});