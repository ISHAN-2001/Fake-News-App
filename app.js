const express = require('express')
const mongoose = require('mongoose')

const app = express();

app.get('/', (req, res) => {
    res.send("Working");
});

app.listen(3000, console.log(`Running on http://localhost:3000`));
