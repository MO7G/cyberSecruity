const epxress = require("express")
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = epxress();
app.use(epxress.json());
app.use(cors({ origin: "http://localhost:5500", credentials: true }))
app.use(cookieParser());

// The user database simulation using map
const USERS = new Map()
USERS.set("mohamed", { id: 1, username: "mohamed", role: "admin" });
USERS.set("ali", { id: 2, username: "ali", role: "user" })

// the sessions store simulation 
const SESSIONS = new Map();


// dummy welcome page for checking if the server works 
app.get("/", (req, res) => {
    res.send("<h1>Welcome The server is working</h1>");
});






app.post("/login", (req, res) => {
    const user = USERS.get(req.body.username);
    // there is no user in the map => (database);
    if (user === null || user === undefined) {
        res.sendStatus(401);
        return;
    }

    // creating a random UUID (Universally Unique identifier 128 bit identifier)
    const sessionId = crypto.randomUUID();
    SESSIONS.set(sessionId, user);
    res.cookie("testSessionId", sessionId, {
        secure: true, // can only be used in https 
        httpOnly: true, // you can't access this via js !!
        sameSite: "none", // when the server and the client are not the same host 
    })
        .send(`Authed as ${req.body.username}`)
})


app.get("/adminData" , (req,res)=>{
    console.log(req.cookies);

    const user = SESSIONS.get(req.cookies.testSessionId)
    if(user === null || user == undefined){ 
       // res.sendStatus(401);
        res.send("you don't exist")
        return;
    }

    if(user.role !== "admin"){
     //   res.sendStatus(403);
        res.send("you are not an admin")
        return;
    }

    res.send("This is the admin Stuff");


})

const port = 3000; // Replace 3000 with your desired port number
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});