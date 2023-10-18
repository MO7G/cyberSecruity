const loginMohamedBtn = document.getElementById("login-mohamed")
const loginAliBtn = document.getElementById("login-ali")
const loginBelalBtn = document.getElementById("login-belal")
const adminBtn = document.getElementById("admin")
const responsesDiv = document.getElementById("responses")
const deleteCur = document.getElementById("delete-Current")


loginMohamedBtn.addEventListener("click" , ()=>{login("mohamed")})
loginAliBtn.addEventListener("click" , ()=>{login("ali")})
loginBelalBtn.addEventListener("click" , ()=>{login("belal")})
deleteCur.addEventListener("click" , ()=>{deleteCurrent()})

adminBtn.addEventListener("click",()=>{
    fetch("http://localhost:3000/adminData" ,{
        credentials: "include",
        headers:{
            "Content-Type" : "application/json",
        },
    })
    .then(res=>res.text())
    .then(data=>(responsesDiv.textContent = data));
})

function login(username){
    console.log("this is the user name "  , username)
    fetch("http://localhost:3000/login",{
        method: "POST",
        credentials: "include",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({username}),
    })
    .then(res=>res.text())
    .then(data=>(responsesDiv.textContent = data));
}

function deleteCurrent(){
    fetch("http://localhost:3000/delete-user",{
        method: "POST",
        credentials: "include",
        headers:{
            "Content-Type" : "application/json",
        }
    })
    .then(res=>res.text())
    .then(data=>(responsesDiv.textContent = data));
}