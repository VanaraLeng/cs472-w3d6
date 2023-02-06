const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));
app.use('/css', express.static(path.join(__dirname, "public", "style")));



app.get('/', (req, res) => {
    const date = new Date();
    const hour = date.getHours;
    const css = hour > 6 && hour < 18 ? "css/day.css" : "css/night.css";
    res.render('index', {
        time: date.toTimeString(),
        style: css
    });
});

app.listen(3000);