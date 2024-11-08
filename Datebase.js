
const mongoose=require("mongoose");

const Note=require("./schemas/note");

class datebase{
    constructor(){
        //this.url ="mongodb://127.0.0.1:27017/notaty";
        this.url =process.env.MONGODB_URL || "mongodb+srv://admin:admin123@cluster0.hgbmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    }
    connect(){
        mongoose.connect(this.url)
        .then(()=>{
            console.log("date base connected succcessfully");
        })
        .catch((error)=>{
            console.log("error in connecting to datebase ",error);
        })
        

    }
    addNote(note){
        return new Promise((resolve,reject)=>{
            note["createdDate"] = new Date();
            note["updatedDate"] = new Date();
            let newNote = new Note(note);
            newNote.save()
            .then(doc => {
                resolve(doc);
            })
            .catch(err =>{
                reject(err);
            })
        })       
    }

    getNotes(){
        return new Promise((resolve, reject) =>{
            Note.find({})
            .then(data =>{
                resolve(data);
            })
            .catch(err =>{
                reject(err);
            })
        });
    }

    getNoteById(id){
        return new Promise((resolve, reject) =>{
            Note.findById(id)
            .then(data =>{
                resolve(data);
            })
            .catch(err =>{
                reject(err);
            })
        });
    }

    updateNote(note){
        return new Promise((resolve, reject) =>{
            note["updatedDate"] = new Date();
            Note.findByIdAndUpdate(note["_id"],note)
            .then(data =>{
                console.log(data);
                resolve(data);
            })
            .catch(err =>{
                reject(err);
            })
        });
    }

    deleteNote(id){
        return new Promise((resolve, reject) =>{
            Note.findByIdAndDelete(id)
            .then(data =>{
                resolve(data);
            })
            .catch(err =>{
                reject(err);
            })
        });
    }

    getNotesByTitle(notetitle){
        return new Promise((resolve, reject) =>{
            const query ={title : {$regex : new RegExp(notetitle, 'i')}};
            Note.find(query)
            .then(data =>{
                resolve(data);
            })
            .catch(err =>{
                reject(err);
            })
        });
    }

}


module.exports=datebase;