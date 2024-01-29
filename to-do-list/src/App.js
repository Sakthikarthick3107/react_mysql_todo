import './index.css'
import React , {useState , useEffect} from 'react';
import axios from 'axios';

function App() {
  const[tasks ,  setTasks] = useState([]);
  const[task , setNewTask] = useState('');
  const[update  , setUpdate] =  useState('')
  const[reqId , setReqId] = useState(null);
  const[open , setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() =>{
      const fetchData = async() =>{
        try{
          const response = await axios.get('http://localhost:8000/tasks')
          setTasks(response.data);
          
        }   
        catch(err){
          console.log(err)
        }
        
      }
      fetchData()
    },300)
    return () =>clearInterval(interval);
    
  },[])

  const newTask = async(e) =>{
    e.preventDefault();
    const post= {
      task : task
    }
    try{
      await axios.post('http://localhost:8000/tasks',post);
      console.log('Added successfully');
      setNewTask('')
    }
    catch(err){
      console.log(err);
    }
  }

  const deleteTask = async(id) =>{
    try{
      await axios.delete('http://localhost:8000/tasks/'+id);
      console.log('Deleted successfully');
      setReqId(null);
      setOpen(false)
    }catch(err){
      console.log(err);
    }
  }
  const handleChange = (e) =>{
    setUpdate(e.target.value)
}

  const changeTask = async(e)=>{
    e.preventDefault();
    const post ={
      task:update
    }
    try{
      await axios.put('http://localhost:8000/tasks/'+reqId , post);
      console.log('Updated successfully');
      setOpen(false);
      setReqId(null)
    }catch(err){
      console.log(err);
    }
  }

  const openDialog = async(id) =>{
    setReqId(id);
    setOpen(true);   

  }
  return (
    <div className="App flex justify-center items-center">
      <div className='block space-y-20'>
      <h3 className="text-4xl  font-bold text-center">To-do-list</h3>

      <form className='border border-black p-4 rounded-lg w-96 flex justify-between' onSubmit={newTask}>
        <input className='focus:outline-none' type='text' name='new' value={task} onChange={(e)=>setNewTask(e.target.value)} placeholder='Create new task...' />
        <button type='submit' className='bg-blue-600 text-white p-2 rounded-md hover:bg-blue-400 '>Create</button>
      </form>

      <div>
        <ol>
        {tasks.map(item =>(
          <li key={item.id}  className='border border-black p-4 m-2 rounded-lg flex justify-between '>
            <h6>&nbsp;{item.task}</h6>
            <div className='space-x-1'>
              <button className='bg-red-600 hover:bg-red-400 rounded-md p-2 text-white'
                  onClick={()=> deleteTask(item.id)}  >Delete</button>
              <button className='bg-green-600 hover:bg-green-400 rounded-md p-2 text-white'
                onClick={()=>{openDialog(item.id)}}>Update</button>
              <button>{item.completed}</button>
            </div>
            
          </li>
        ))}
        </ol>
      </div>
      {open &&
      <div className='w-full h-full rounded-md bg-black text-white text-center'>
        <form className='border border-black p-4 rounded-lg w-96 flex justify-between' onSubmit={changeTask} >
          <input className='focus:outline-none bg-transparent' type='text' name='update' 
              onChange={handleChange}   placeholder='Update task...' />
          <button type='submit' className='bg-blue-600 text-white p-2 rounded-md hover:bg-blue-400 '>Update</button>
          
        </form>
      </div>
}
      </div>
      
    </div>
  );
}

export default App;
