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