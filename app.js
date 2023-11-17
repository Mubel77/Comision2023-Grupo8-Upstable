const express = require ('express');
const app = express();
const path = require ('path');
const bodyParser = require('body-parser');
const port = 3000;

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"));
});
app.post("/login",(req,res) => {
    console.log(req.body);
    res.redirect("/");
})

app.get("/registro", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/register.html"));
});
app.post("/registro",(req,res) => {
    console.log(req.body);
    res.redirect("/");
})

app.get("/productDetail", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/productDetail.html"));
});
app.get("/productCart", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/productCart.html"));
});
app.use(express.static("public"));

app.listen(port, console.log(`sever running in http://localhost:${port}`));
