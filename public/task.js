async function addTask(){


  let title =
  document.getElementById("taskInput").value;
  
  
  
  await fetch("/api/tasks",{
  
  method:"POST",
  
  headers:{
  "Content-Type":"application/json"
  },
  
  body:JSON.stringify({
  
  title:title
  
  })
  
  });
  
  
  loadTasks();
  
  
  }
async function loadTasks(){

    let response =
    await fetch("/api/tasks");


    let tasks =
    await response.json();


    let taskList =
    document.getElementById("taskList");


    // clear current UI
    taskList.innerHTML = "";


    tasks.forEach(task => {

        let li =
        document.createElement("li");


        li.textContent =
        task.title;


        taskList.appendChild(li);

    });

}
window.onload = function(){
    loadTasks();
};
