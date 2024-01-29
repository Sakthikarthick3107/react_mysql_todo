const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

const db =  mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'todolist'
});

db.connect(err =>{
    if(err){
        throw err;
    }
    console.log('Database connected successfully');
})


app.get('/' , (req , res) =>{
    res.send('Hello World');
})

app.get('/tasks' , (req,res) =>{
    const sql = 'SELECT * from tasks';
    db.query(sql , (err , data) =>{
        if(err){
            throw err;
        }
        res.json(data);
    })
})

app.get('/tasks/:id' , (req  , res) =>{
    const sql = 'SELECT * from tasks WHERE id = ?';
    const reqId =[ req.params.id];
    db.query(sql , [reqId], (err,data )=>{
        if(err){
            throw err;
        }
        res.json(data);
    })
})


app.post('/tasks' , (req , res) =>{
    const sql = 'INSERT INTO tasks(`task`)VALUES(?)';
    const todo = [
        req.body.task
    ];
    db.query(sql , [todo] , (err,data) =>{
        if(err){
            throw err;
        }
        res.json(data)
    })
});

app.delete('/tasks/:id' , (req  , res)=>{
    const sql = 'DELETE from tasks WHERE id = ?';
    const selectedId = req.params.id;
    db.query(sql , selectedId , (err) =>{
        if(err){
            throw(err);
        }
        res.send('Deleted successfully')
    })
});

app.put('/tasks/:id' , (req , res) =>{
    const sql = 'UPDATE tasks SET `task` = ? WHERE id = ?';
    
    const updated = [
        req.body.task
    ];
    const uid = req.params.id;
    db.query(sql , [...updated , uid] , (err,data) =>{
        if(err){
            throw err;
        }
        res.json(data);
    })
})

app.listen(8000 , () => {
    console.log('Server is running at the port 8000');
})