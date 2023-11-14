const express = require('express'); 
const mongoose = require('./config/mongoose');
const ToDo = require('./models/todoschema');
const PORT = 8085;
const app = express();
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/css'));
app.get('/',function(req,res){
    const tasks = ToDo.find({}).exec();
    tasks.then(data => {
        console.log(data);
        res.render('todolist',{data});
    }).catch(err => {
        console.log("Error in feaching taks");
    });
});
app.get('/delete-task',function(req,res){
    var id = req.query;
    var len = Object.keys(id).length;
    var deletePromises = [];
    for(let i=0; i < len ; i++){
        deletePromises.push(ToDo.findByIdAndDelete({_id:Object.keys(id)[i]}));
    }
    Promise.all(deletePromises).then(()=>{
        return res.redirect('back'); 
    }).catch((err)=>{
        console.log('error in deleting task', err);
        return res.redirect('back');
    });
});
app.post('/add-task',function(req,res){
    const todo = new Promise((resolve,reject) =>{
        ToDo.create({
            description : req.body.description,
            category : req.body.category,
            duedate : req.body.duedate ? req.body.duedate :'No Deadline'
        }).then(newdata =>{
            console.log("******  new task  ******");
            resolve(newdata);
        }).catch( err => {
            console.log("Error in creating data");
            reject(err);
        });
    });
    todo.then(data =>{
        res.redirect('back');
    })
    .catch((err) =>{
        console.log("Error in creation");
    });
});
app.listen(PORT,function(err){
    if(err){
        console.log("Error");
        return;
    }
    console.log("Server is up and running on ",PORT);
});
