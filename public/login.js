async function login(){


  let username =
  document.getElementById("username").value;
  
  
  let password =
  document.getElementById("password").value;
  
  
  
  let response =
  await fetch("/api/auth/login",{
  
  method:"POST",
  
  headers:{
  "Content-Type":"application/json"
  },
  
  body:JSON.stringify({
  
  username,
  password
  
  })
  
  });
  
  
  
  if(response.ok){
  
  window.location.href="tasks.html";
  
  }
  
  else{
  
  alert("Login failed");
  
  }
  
  
  }