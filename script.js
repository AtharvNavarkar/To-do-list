
document.addEventListener("DOMContentLoaded",()=> {
const getinput = document.getElementById("todo-input")
const inputbutton = document.getElementById("add-task-btn")
const inputlist = document.getElementById("todo-list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => rendertask(task));

inputbutton.addEventListener("click",()=>{
  
  let tasktext = getinput.value.trim();

  if(tasktext === "") return;
  let newtask = {
    id : Date.now(),
    text : tasktext,
    completed : false
  };

  tasks.push(newtask);
  rendertask(newtask);
  savetasks();
  getinput.value = "";
  console.log(tasks);
})

function rendertask(task){
  let li = document.createElement("li");
  li.setAttribute("data-id",task.id);
  li.innerHTML = `
  <span>${task.text}</task>
  <button>delete</button>`
    li.addEventListener("click",(e)=>{
    if(e.target.tagName === "BUTTON") return;
    task.completed=!task.completed;
    li.classList.toggle('completed');
    savetasks();
  })

  li.querySelector('button').addEventListener("click",(e)=>{
    e.stopPropagation();
    tasks = tasks.filter((t)=> t.id !== task.id);
    li.remove();
    savetasks();
  })
  inputlist.appendChild(li);

}

function savetasks(){
  localStorage.setItem("tasks",JSON.stringify(tasks))
}
})