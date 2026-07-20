require("dotenv").config();

const express = require("express");
const session = require("express-session");
const path = require("path");

const db = require("./db");


const app = express();


app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));


// sessions
app.use(session({

    secret:"task-secret",

    resave:false,

    saveUninitialized:false

}));



// Serve HTML/CSS
app.use(express.static("public"));


// Serve frontend JS
app.use(
    "/js",
    express.static(
        path.join(__dirname,"js")
    )
);



/*
========================
AUTH APIs
========================
*/


// Register

app.post("/api/auth/register",
async(req,res)=>{


    const {
        username,
        password
    } = req.body;


    await db.query(

        "INSERT INTO users(username,password) VALUES(?,?)",

        [
            username,
            password
        ]

    );


    res.json({

        message:"User created"

    });


});





// Login

app.post("/api/auth/login",
async(req,res)=>{


    const {
        username,
        password
    } = req.body;

 console.log("LOGIN REQUEST:", username, password);



 const [allUsers] = await db.query("SELECT * FROM users");

    console.log("ALL USERS:", allUsers);

    const [rows] =
    await db.query(

        "SELECT * FROM users WHERE username=? AND password=?",

        [
            username,
            password
        ]

    );

console.log("DATABASE RESULT:", rows);

    if(rows.length===0){

        return res.status(401)
        .json({

            message:"Invalid login"

        });

    }



    req.session.userId =
    rows[0].id;

console.log("SESSION AFTER LOGIN:", req.session);

    res.json({

        message:"Login successful"

    });



});





app.post("/api/auth/logout",(req,res)=>{

    req.session.destroy(()=>{

        res.json({
            message:"Logged out"
        });

    });

});

/*
========================
TASK APIs
========================
*/


// Get all tasks

app.get("/api/tasks",
async(req,res)=>{


    const userId =
    req.session.userId;



    const [rows] =
    await db.query(

        "SELECT * FROM tasks WHERE user_id=?",

        [userId]

    );


    res.json(rows);


});





// Add task

app.post("/api/tasks",
async(req,res)=>{

    console.log("SESSION:", req.session);

    console.log("BODY:", req.body);


    const userId = req.session.userId;


    const title = req.body.title;


    await db.query(

        "INSERT INTO tasks(user_id,title) VALUES(?,?)",

        [
            userId,
            title
        ]

    );


    res.json({

        message:"Task added"

    });


});



// Delete task

app.delete("/api/tasks/:id",
async(req,res)=>{


    await db.query(

        "DELETE FROM tasks WHERE id=?",

        [
            req.params.id
        ]

    );


    res.json({

        message:"Deleted"

    });


});





// Mark complete

app.put("/api/tasks/:id",
async(req,res)=>{


    await db.query(

    "UPDATE tasks SET completed=? WHERE id=?",

    [

        req.body.completed,

        req.params.id

    ]

    );


    res.json({

        message:"Updated"

    });



});






app.listen(3000,()=>{

console.log(
"Server running on port 3000"
);


});
