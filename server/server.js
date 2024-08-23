const PORT = process.env.PORT ?? 8000;
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// Use cors middleware globally
app.use(cors());
app.use(express.json());//this enables the server to understand when we pass json file

app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        res.json(todos.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuidv4();
    try {
        const newtodo=await pool.query(
            'INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)',
            [id, user_email, title, progress, date]
        );
        res.json(newtodo)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/todos/:id', async(req,res)=>{
    const {id} = req.params;
    const{user_email, title, progress,date} = req.body
    try{
        const editTodo = await pool.query('UPDATE todos SET user_email=$1, title=$2, progress=$3, date=$4 WHERE id=$5',
            [user_email, title, progress, date, id]
        );
        res.json(editTodo)
    }catch(err){
        console.error(err)
    }
})

app.delete('/todos/:id', async(req,res)=>{
    const {id} = req.params
    
    try {
        const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    
        if (deleteTodo.rowCount === 0) {
          return res.status(404).json({ error: 'Todo not found' });
        }
    
        res.status(200).json({ message: 'Todo deleted successfully', todo: deleteTodo.rows[0] });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
})

app.post('/signup',async(req,res)=>{
    const {email,password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword=bcrypt.hashSync(password, salt)
    try{
       const signup= await pool.query('INSERT INTO users (email, hashed_password) VALUES($1,$2)',[email, hashedPassword])

       const token = jwt.sign({email}, 'secret', {expiresIn:'1hr'})
       res.json({email, token})
    }catch(err){
        console.error(err)
        //if we run here we will get error in terminal as detail: email already exists, we console log the error and send it to result to be able to display in the frontend.
        if(err){
            res.json({detail: err.detail})
        }
    }
})

app.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try{
        const users = await pool.query('SELECT * FROM users WHERE email=$1',[email])
        if(!users.rows.length) return res.json({detail: 'user dosenot exist!'})
        
        const success =await bcrypt.compare(password, users.rows[0].hashed_password)
        const token = jwt.sign({email}, 'secret', {expiresIn:'1hr'})
        if(success){

            res.json({'email':users.rows[0].email, token})    
        }else{
            res.json({detail: 'Login failed'})
        }

    }catch(err){
        console.error(err)
        if(err){
            res.json({detail: err.detail})
        }
    }
})

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
