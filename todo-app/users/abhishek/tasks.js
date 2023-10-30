//functions
async function getTasks(){
    const users = await fetch("../../user-info.json").then((res)=>res.json());
    const user = users.find((element)=>{
       return (element.username===localStorage.getItem("username"))?true:false;
    });
    const tasks = user.projects[localStorage.getItem("project")].tasks;
    displayTasks(tasks);
}
function createNewTaskNode(name,section){
    const newTask = document.createElement("li");
    newTask.className="todo-item";
    if(section === upcomingOl){
        newTask.innerHTML=`<span>${name}</span>`
    }else if(section === completedOl){
        newTask.innerHTML=`<input type="checkbox" checked/><span>${name}</span>`
    }else{
        newTask.innerHTML=`<input type="checkbox" /><span>${name}</span>`
    }
    section.appendChild(newTask);
}
function displayTasks(tasks){
    console.log(tasks);
    tasks.todo.forEach(element => {
        createNewTaskNode(element,todoOl);
    });
    tasks.upcoming.forEach(element=>{
        createNewTaskNode(element,upcomingOl);

    })
    tasks.completed.forEach(element=>{
        createNewTaskNode(element,completedOl);
    })
}
function showTaskPopup(){
    taskPopup.showModal();
}
function addNewTask(event){
    event.preventDefault();
    if(dialogInput.value!==""){
        taskPopup.close();
        createNewTaskNode(dialogInput.value,todoOl);
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
const dialogInput = document.querySelector("dialog input")
const todoOl=document.getElementById("todo-ol");
const completedOl = document.getElementById("completed-ol");
const upcomingOl= document.getElementById("upcoming-ol");


console.log(localStorage.getItem("project"));
console.log(localStorage.getItem('username'));


//event listeners
openTaskDialogButton.addEventListener("click",showTaskPopup);
addTaskButton.addEventListener("click",addNewTask);
todoOl.addEventListener("click",changeTaskStatus);
completedOl.addEventListener("click",changeTaskStatus);
window.addEventListener('DOMContentLoaded',getTasks);
