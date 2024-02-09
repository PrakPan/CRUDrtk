const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://root:root@cluster0.ng6wv3g.mongodb.net/");

const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));


app.get("/",(req,res)=>{
    UserModel.find({})
    .then((users)=>res.json(users))
    .catch(err => res.json(err))
})

app.post("/create",(req,res)=>{
    UserModel.create(req.body)
    .then((users)=>res.json(users))
    .catch(err => res.json(err))
})

app.put("/edit/:id",(req,res)=>{
    const id = req.params.id;
   UserModel.findById({_id:id},{name:req.body.name,email:req.body.email})
    .then((users)=>res.json(users))
    .catch(err => res.json(err))
})

app.delete("/:id",(req,res)=>{
    const id = req.params.id;
   UserModel.findByIdAndDelete({_id:id})
    .then((users)=>res.json(users))
    .catch(err => res.json(err))
})




app.listen(8080,()=>{console.log("Server Running")});