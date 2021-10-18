const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

app.use(cookieParser());
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));

app.get('/', (req, res) => {
    res.render("index", {
        cookies: req.cookies
    });
});

app.post('/', (req, res) => {
    res.cookie(req.body.key, req.body.value);
    res.redirect(303, "/");
});

app.listen(3000);