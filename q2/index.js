const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "Secret Billy",
}));

app.get('/', (req, res) => {
    const date_ob = new Date();
    const hour = date_ob.getHours();
    const isDay = hour > 6 && hour < 18;
    const form = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>Form</title>
        <link rel="stylesheet" type="text/css" href=${isDay ? "/css/day.css" : "/css/night.css"}>
    </head>
    
    <body>
        <form action="/result" method="POST">
            <label for="name">Name</label>
            <input type="text" id="name" name="name">
            <label for="age">Age</label>
            <input type="number" id="age" name="age">
            <input type="submit" value="Submit Query">
        </form>
    </body>
    
    </html>`;
    res.send(form);
});
app.post('/result', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    if (!name) {
        name = "person";
    }
    if (!age) {
        age = "0";
    }
    req.session['name'] = name;
    req.session['age'] = age;
    res.redirect(303, `/output`);
});
app.get('/output', (req, res) => {
    let name = req.session['name'];
    let age = req.session['age'];
    if (!name) {
        name = "person";
    }
    if (!age) {
        age = "0";
    }
    res.send(`Welcome ${name}, age ${age}`);
});
app.listen(3000);