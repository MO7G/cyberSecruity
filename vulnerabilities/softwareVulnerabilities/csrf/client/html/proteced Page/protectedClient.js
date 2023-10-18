const loginMohamedBtn = document.getElementById("login-mohamed")
const loginAliBtn = document.getElementById("login-ali")
const loginBelalBtn = document.getElementById("login-belal")
const adminBtn = document.getElementById("admin")
const responsesDiv = document.getElementById("responses")
const deleteCur = document.getElementById("delete-Current")
loginMohamedBtn.addEventListener("click", () => { login("mohamed") })
loginAliBtn.addEventListener("click", () => { login("ali") })
loginBelalBtn.addEventListener("click", () => { login("belal") })
deleteCur.addEventListener("click", () => { deleteCurrent() })

adminBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/adminData", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.text())
        .then(data => (responsesDiv.textContent = data));
})

let csrfToken;
function login(username) {
    console.log("this is the user name ", username);
    fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    })
        .then(res => {
            if (res.status === 401) {
                // Handle the 401 Unauthorized response here
                responsesDiv.textContent = "Unauthorized: Please check your credentials.";
                // You can also redirect the user or perform other actions as needed
                return;
            }
            return res.json(); // Parse the response as JSON
        })
        .then(data => {
            csrfToken = data.csrfToken;
            responsesDiv.textContent = data.message;
        })
        .catch(error => {
            console.error("Error:", error);
        });
}


function deleteCurrent() {
    fetch("http://localhost:3000/delete-user", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({csrfToken})
    })
        .then(res => res.text())
        .then(data => (
            responsesDiv.textContent = data));
}