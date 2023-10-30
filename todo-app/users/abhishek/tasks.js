//functions
async function getTasks(){
    const users = await fetch("../../user-info.json").then((res)=>res.json());
    const user = users.find((element)=>{
       return (element.username===localStorage.getItem("username"))?true:false;
    });
    const projectHeading =  document.getElementById('project-name');
    projectHeading.innerText=user.projects[localStorage.getItem("project")].name;
    const tasks = user.projects[localStorage.getItem("project")].tasks;
    displayTasks(tasks);
}
function createNewTaskNode(name,option){
    const newTask = document.createElement("li");
    newTask.className="todo-item";
    if(option==='completed'){
        newTask.innerHTML=`<input type="checkbox" checked/><span>${name}</span>`;
    }else if(option==="pending" || option === 'upcoming'){
        newTask.innerHTML=`<span>${name}</span>`;
    }
    else{
        newTask.innerHTML=`<input type="checkbox" /><span>${name}</span>`;
    }
    
    return newTask;
}
function classifyTasks(task){
    const start = new Date(task.startdate);
    const end = new Date(task.enddate);
    // console.log(d.getTime());
    if(task.completed==='true'){
        completedOl.appendChild(createNewTaskNode(task.description,"completed"))
    }else if(end<Date.now()){
        pendingOl.appendChild(createNewTaskNode(task.description,'pending'));
    }else if(start>Date.now()){
        upcomingOl.appendChild(createNewTaskNode(task.description,'upcoming'));
    }else{
        todoOl.appendChild(createNewTaskNode(task.description));
    }
   
}
function displayTasks(tasks){
    tasks.forEach(element => {
        classifyTasks(element);
    });
}
function showTaskPopup(){
    taskPopup.showModal();
}
function addNewTask(event){
    event.preventDefault();
    if(taskDescriptionInput.value!=="" && taskStartInput.value!=="" && taskEndInput.value !==""){
        taskPopup.close();
        const taskObj={
            "description":taskDescriptionInput.value,
            "startdate":taskStartInput.value,
            "enddate":taskEndInput.value,
            "completed":"false"   
        }
        classifyTasks(taskObj);
    }


}
function changeTaskStatus(event){
    if(event.target.type==="checkbox"){
        const task = event.target.parentElement;
        if(task.parentElement.id=="todo-ol"){
            if(event.target.checked){
                todoOl.removeChild(task);
                completedOl.appendChild(task);
            }
        }else if(task.parentElement.id=="completed-ol"){
            if(!event.target.checked){
                completedOl.removeChild(task);
                todoOl.appendChild(task); 
            }
        }
        
    }
    //add delete fuctionality here
}

const taskPopup=document.getElementById("add-task-dialog");
const openTaskDialogButton = document.querySelector("#open-add-task");
const addTaskButton = document.querySelector("#add-task-button");
const taskDescriptionInput = document.getElementById("task-description-input");
const taskStartInput = document.getElementById("task-start-input");
const taskEndInput = document.getElementById    ("task-end-input");
const todoOl=document.getElementById("todo-ol");
const completedOl = document.getElementById("completed-ol");
const upcomingOl= document.getElementById("upcoming-ol");
const pendingOl= document.getElementById("pending-ol");


console.log(localStorage.getItem("project"));
console.log(localStorage.getItem('username'));


//event listeners
openTaskDialogButton.addEventListener("click",showTaskPopup);
addTaskButton.addEventListener("click",addNewTask);
todoOl.addEventListener("click",changeTaskStatus);
completedOl.addEventListener("click",changeTaskStatus);
window.addEventListener('DOMContentLoaded',getTasks);
