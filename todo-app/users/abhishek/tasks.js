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
const taskPopup=document.getElementById("add-task-dialog");

const openTaskDialogButton = document.querySelector("#open-add-task");
const addTaskButton = document.querySelector("#add-task-button");
const dialogInput = document.querySelector("dialog input")
const todoOl=document.getElementById("todo-ordered-list");
console.log(todoOl);













//event listeners
openTaskDialogButton.addEventListener("click",showTaskPopup);
addTaskButton.addEventListener("click",addNewTask);

