let serverEndPoint = "http://localhost:3002/login";

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Define the data to send to the server
        const data = { username, password };

        fetch(serverEndPoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.text())
            .then(data => generateTable(JSON.parse(data)));
    });

});


const generateTable = (data) => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = data.message;
    const yourQuery = document.getElementById('yourQuery');
    yourQuery.innerText = "your query is => " + data.query;
    const generalResponse = document.getElementById('generalResponse');
    generalResponse.innerText = "this is the response and you can access it form the inspector " + JSON.stringify(data)
    console.log(data)
    // Get a reference to the table body
    const tableBody = document.querySelector('#userTable tbody');

    // Clear the existing content in the table body
    tableBody.innerHTML = ''; // This will remove all child elements

    // Loop through the data and create table rows
    data.users.forEach((user) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = user.id;
        row.insertCell(1).textContent = user.username;
        row.insertCell(2).textContent = user.email;
        row.insertCell(3).textContent = new Date(user.created_at).toLocaleString();
    });
}






// Get references to the password input and toggle button
const passwordInput = document.getElementById('password');
const toggleButton = document.getElementById('toggle-password');

// Add a click event listener to the toggle button
toggleButton.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Show the password
        toggleButton.textContent = 'Hide';
    } else {
        passwordInput.type = 'password'; // Hide the password
        toggleButton.textContent = 'Show';
    }
});
