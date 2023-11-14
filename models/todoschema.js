const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
    {
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        duedate:{
            type:String,
        }
    }
);
const ToDo = mongoose.model('ToDo',todoSchema);
module.exports = ToDo;