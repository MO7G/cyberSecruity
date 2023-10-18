const epxress = require("express")
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = epxress();
app.use(epxress.json());
app.use(cors({ origin: "http://localhost:55678", credentials: true }))
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
    const csrfToken = crypto.randomUUID();
    SESSIONS.set(sessionId, { user, csrfToken });
    res.cookie("testSessionId", sessionId, {
        secure: true, // can only be used in https 
        httpOnly: true, // you can't access this via js !!
        sameSite: "none", // when the server and the client are not the same host 
    }).json({ csrfToken, message: `Authed as ${req.body.username}` })
})


app.post("/delete-user", (req, res) => {
    const session = SESSIONS.get(req.cookies.testSessionId);
    if (!session || !session.user || !session.csrfToken || session.csrfToken !== req.body.csrfToken) {
        res.sendStatus(401);
        return;
    }
    USERS.delete(session.user.username);
    SESSIONS.delete(req.cookies.testSessionId);
    res.send(`Deleted the user ${session.user.username} `) // This sets the status to 204 (No Content) with an empty response body.
});





app.get("/adminData", (req, res) => {
    //console.log(req.cookies);
    
    const user = SESSIONS.get(req.cookies.testSessionId).user
    console.log(user)
    if (user === null || user == undefined) {
        res.sendStatus(401);

        return;
    }

    if (user.role !== "admin") {
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