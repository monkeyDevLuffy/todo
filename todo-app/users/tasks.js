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
function createNewTaskNode(name,option,start,end){
    const newTask = document.createElement("li");
    newTask.className="todo-item";
    newTask.innerHTML=`<span>${name}</span>`;
    const taskDiv = document.createElement("div");

    //delete button

    const deletebutton = document.createElement("span");
    deletebutton.innerHTML='delete';
    deletebutton.className='material-symbols-outlined delete';
    deletebutton.style.float='right';

    newTask.appendChild(deletebutton);
    
    if(option==='completed'){
        let checkBox=document.createElement('input');
        checkBox.setAttribute('type','checkbox');
        checkBox.setAttribute("checked",'');
        checkBox.className='todo-checkbox';
        newTask.appendChild(checkBox);
        
    }else if(option==='todo'){
        checkBox=document.createElement('input');
        checkBox.setAttribute('type','checkbox');
        checkBox.className='todo-checkbox';

        newTask.appendChild(checkBox);
    }
    //calculate dates
    const startDate = document.createElement("span");
    const endDate = document.createElement("span");
    
    startDate.innerHTML=`<i>start date :</i> ${start.getDate()}-${start.toLocaleString('default',{ month: 'short' })}-${start.getFullYear()}`;
    endDate.innerHTML=` <i>end date :</i> ${end.getDate()}-${end.toLocaleString('default',{ month: 'short' })}-${end.getFullYear()}`;

    startDate.className='dates';
    endDate.className='dates';

    taskDiv.appendChild(startDate);
    taskDiv.appendChild(endDate);
    newTask.appendChild(taskDiv);
    
    console.log(startDate.innerHTML,endDate.innerHTML);
    // console.log(newTask.querySelector("input").hasAttribute("checked"));
    deletebutton.addEventListener('click',(event)=>deleteTask(event.target.parentElement))
 
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
        completedOl.appendChild(createNewTaskNode(task.description,"completed",start,end))
    }else if(end<Date.now()){
        pendingOl.appendChild(createNewTaskNode(task.description,'pending',start,end));
    }else if(start>Date.now()){
        upcomingOl.appendChild(createNewTaskNode(task.description,'upcoming',start,end));
    }else{
        todoOl.appendChild(createNewTaskNode(task.description,'todo',start,end));
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
    console.log(event.target.parentElement);
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