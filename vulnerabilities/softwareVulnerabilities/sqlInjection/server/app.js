const express = require('express');
const cors = require('cors');
const db = require('./sqlConnector')
const app = express();
const port = 3002;
app.use(cors({ origin: "http://localhost:50742", credentials: true }))
app.use(express.json());
app.get('/', (req, res) => {
    res.send('<h1>hello man</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.post('/login', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const query = `SELECT * FROM users WHERE username = '${user}' AND password = '${pass}' `;
    // const query = 'SELECT DATABASE();'
    // Fix the SQL query by removing the extra single quote at the end
    console.log(query);
    // i need to return the final query also 
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching data from the database', query });
        } else {
            if (results.length === 0) {
                res.json({ message: 'You dont exist !!! ', users: {}, query });
            } else {
                console.log(results)
                res.json({ message: 'You are logged he is your profile', users: results, query });
            }
        }
    });
});






