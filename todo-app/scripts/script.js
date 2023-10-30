//functions
function openCreateProjectDialog(){
    createProjectDialog.showModal();
}

async function createNewProject(event){
    event.preventDefault();
    const name=dialogInput.value;
    if(name!==""){
        const project = createNewProjectCard(name);
        projects.appendChild(project);
        createProjectDialog.close();
    }
   
}
function deleteProject(event){
    if(event.target.classList.contains("deleteButton")){
        projects.removeChild(event.target.parentElement);
    }else if(event.target.classList.contains("card")){
        goToTasksPage(event.target);
        
    }
}
function goToTasksPage(card){
    console.log(card.getAttribute("data-id"));
    localStorage.setItem("project",card.getAttribute("data-id")-1);
    window.location.href="tasks.html";
}
function createNewProjectCard(name="newname"){
    const newDiv=document.createElement('div');
    newDiv.classList="card";
    newDiv.setAttribute("href",'#');
    newDiv.setAttribute("data-id",`${projects.childElementCount+1}`);
    newDiv.innerHTML=`<h5>${name}</h5>
        <span  class="material-symbols-outlined deleteButton">delete</span>`;
    return newDiv;


}
async function getProjects(){
    const users = await fetch("../../user-info.json").then((res)=>res.json());
    const user = users.find((element)=>{
       return (element.username===localStorage.getItem("username"))?true:false;
    });
    const fetchedProjects= user.projects;
    fetchedProjects.forEach(element => {
        const newDiv =createNewProjectCard(element.name)
        projects.appendChild(newDiv);

    });
}



const projects= document.getElementById("projects");
const createProjectButton = document.getElementById("create-project");
const projectDialogButton = document.getElementById("project-dialog-button")
const dialogInput = document.querySelector("dialog input");
const createProjectDialog=document.getElementById("new-project-dialog");



//event listeners
document.addEventListener("DOMContentLoaded",()=>{
    getProjects();
})
createProjectButton.addEventListener("click",()=>{
    openCreateProjectDialog();  
})
projects.addEventListener("click",(event)=>{
    deleteProject(event);
})
projectDialogButton.addEventListener('click',(event)=>{
    createNewProject(event);
})