//funcitons
function createNewProject(){
    const project = document.createElement("div");
    const name = document.createTextNode(`project ${projects.childElementCount+1}`);
    const deletebutton = document.createElement('span');
    deletebutton.className="material-symbols-outlined deleteButton";
    deletebutton.innerText="delete";
    project.className="card";
    project.setAttribute("data-id",`${projects.childElementCount+1}`)
    project.appendChild(name);
    project.appendChild(deletebutton)
    projects.appendChild(project);


}
function deleteProject(event){
    if(event.target.classList.contains("deleteButton")){
        console.log(true);
        console.log(event.target.parentElement);
        projects.removeChild(event.target.parentElement);
    }else{
        console.log(false);
    }
}




const projects= document.getElementById("projects");
const createProjectButton = document.getElementById("create-project");
console.log(createProjectButton);



//event listeners

createProjectButton.addEventListener("click",()=>{
    createNewProject();  
})
projects.addEventListener("click",(event)=>{
    deleteProject(event);
})