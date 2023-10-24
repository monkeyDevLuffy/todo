//funcitons
function createNewProject(){
    const project = document.createElement("div");
    const name = document.createTextNode(`project ${projects.childElementCount+1}`);
    project.className="card";
    project.setAttribute("data-id",`${projects.childElementCount+1}`)
    project.appendChild(name);
    projects.appendChild(project);
}



const projects= document.getElementById("projects");
const createProjectButton = document.getElementById("create-project");
console.log(createProjectButton);




//event listeners

createProjectButton.addEventListener("click",()=>{
    createNewProject();    
})
