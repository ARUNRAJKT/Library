const express = require('express')
const app = express()
const mongoose = require('mongoose')
const addbook = require('./src/routes/book')
const login=require('./src/routes/login')
const bodyParse = require('body-parser')

app.use(bodyParse())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.get('/', (req, res) => {
    res.send("server connected")
})

app.use('/addbook', addbook)
app.use('/login',login)


mongoose.connect('mongodb+srv://arunraj44799:arunraj44799@thehut.v0kbybp.mongodb.net/library?retryWrites=true&w=majority').then(() => {
    app.listen(4004, () => {
        console.log("server started at http://localhost:4004");
    });
}).catch((err) => {
    console.log(err);
})