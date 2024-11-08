
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app =express();
const Datebase=require("./Datebase");
const db=new Datebase();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));


//create a new post api
app.post('/notes',(req,res) => {
 const body = req.body;
 console.log("BODY: ",body);
 db.addNote(body)
 .then(data =>{
    res.send(data);
 })
 .catch(err =>{
    res.status(500).send(err);
 })
});

app.get('/notes',(req,res)=>{
  const {title}= req.query;
  if(title){
    db.getNotesByTitle(title)
    .then(data =>{
    res.send(data);
 })
 .catch(err =>{
    res.status(500).send(err);
 })

  }else{
    db.getNotes()
    .then(data =>{
     res.send(data);
 })
   .catch(err =>{
     res.status(500).send(err);
 })
  }
 
});

app.get('/notes/id',(req,res) =>{
    const { id } = req.params;
    db.getNoteById(id)
    .then(data =>{
        if(!data){
            res.status(404).send("Note id dosent exist "+id);
        }else{
            res.send(data);
        }
       
     })
     .catch(err =>{
        res.status(500).send(err);
     })
});

app.put('/notes',(req,res) =>{
    
    db.updateNote(req.body)
    .then(data =>{
        if(!data){
            res.status(404).send("Note id dosent exist : "+id);
        }else{
            res.send(data);
        }
       
     })
     .catch(err =>{
        res.status(500).send(err);
     })
});

app.delete('/notes/:id',(req,res) =>{
    const { id } = req.params;
    db.deleteNote(id)
    .then(data =>{
        if(!data){
            res.status(404).send("Note id dosent exist "+id);
        }else{
            res.send(data);
        }
       
     })
     .catch(err =>{
        res.status(500).send(err);
     })
});


 const port=process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`server has  started at port ${port}....`);
 db.connect();
});