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
function deleteTask(task){
    deleteTaskModal.showModal();
    const confirmDeleteButton=document.getElementById("confirm-delete-button");
    confirmDeleteButton.addEventListener('click',function(event){
        event.preventDefault();
        const parent = task.parentElement;
        deleted.push(task);
        parent.removeChild(task);
        console.log(deleted);
        deleteTaskModal.close();
    })
}
function createNewTaskNode(name,option){
    const newTask = document.createElement("li");
    const deletebutton = document.createElement("span");
    deletebutton.innerHTML='delete'
    deletebutton.className='material-symbols-outlined delete';
    deletebutton.style.float='right';


    newTask.className="todo-item";
    if(option==='completed'){
        newTask.innerHTML=`<input type="checkbox" checked/><span>${name}</span>`;
    }else if(option==="pending" || option === 'upcoming'){
        newTask.innerHTML=`<span>${name}</span>`;
    }
    else{
        newTask.innerHTML=`<input type="checkbox" /><span>${name}</span>`;
    }
    deletebutton.addEventListener('click',(event)=>deleteTask(event.target.parentElement))
    newTask.appendChild(deletebutton);
    return newTask;
}
function classifyTasks(task){
    const start = new Date(task.startdate);
    const end = new Date(task.enddate);
    if(task.deleted==='true'){
        const deletedTask = document.createElement("li");
        deletedTask.innerHTML  = `<span>${task.description}</span>`
        deleted.push(deletedTask);
        console.log(deleted);
    }else if(task.completed==='true'){
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
            "completed":"false",   
            "deleted":"false"
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
function showDeletedTasks(){
    mainSection.innerHTML=`
        <h2>bin</h2>
        <ul class ="deleted-tasks">
            
        </ul>
    `;
    console.log(deleted);
    deleted.forEach((element)=>{
        const newDeletedTask = document.createElement('li');
        console.log();
        newDeletedTask.innerHTML=`${element.querySelector('span').innerText}`;
        document.querySelector('.deleted-tasks').appendChild(newDeletedTask);
    })
    
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
const deleted =[];
const showDeletedTasksBtn=document.getElementById("deleted-tasks");
const mainSection = document.querySelector('main');
const deleteTaskModal = document.getElementById("confirm-delete-dialog");


//event listeners
openTaskDialogButton.addEventListener("click",showTaskPopup);
addTaskButton.addEventListener("click",addNewTask);
todoOl.addEventListener("click",changeTaskStatus);
completedOl.addEventListener("click",changeTaskStatus);
window.addEventListener('DOMContentLoaded',getTasks);

showDeletedTasksBtn.addEventListener('click',showDeletedTasks)