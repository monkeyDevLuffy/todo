//functions
function showTaskPopup(){
    taskPopup.showModal();
}
function addNewTask(event){
    event.preventDefault();
    if(dialogInput.value!==""){
        taskPopup.close();
        //create a new task item
        const newTask = document.createElement("li");
        newTask.className="todo-item";
        newTask.innerHTML=`<input type="checkbox" /><span>${dialogInput.value}</span>`
        console.log(newTask);
        todoOl.appendChild(newTask);
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






//event listeners
openTaskDialogButton.addEventListener("click",showTaskPopup);
addTaskButton.addEventListener("click",addNewTask);
todoOl.addEventListener("click",changeTaskStatus);
completedOl.addEventListener("click",changeTaskStatus);
