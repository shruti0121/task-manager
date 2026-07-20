async function register(){


  let username =
  document.getElementById("username").value;
  
  
  let password =
  document.getElementById("password").value;
  
  
  
  let response =
  await fetch("/api/auth/register",{
  
  
  method:"POST",
  
  
  headers:{
  
  "Content-Type":"application/json"
  
  },
  
  
  body:JSON.stringify({
  
  username,
  password
  
  })
  
  
  });
  
  
  
  let data =
  await response.json();
  
  
  
  document.getElementById("message")
  .innerHTML=data.message;
  
  
  }