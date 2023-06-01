import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
const DB_URL = "http://localhost:3001/todos";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [toDoText, setToDoText] = useState("");

  useEffect(() => {
    getToDos();
    console.log(todoList);
  }, []);

  const getToDos = async () => {
    const response = await axios.get(DB_URL);
    setTodoList(response.data);
  };

  const addToDo = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(DB_URL, { text: toDoText });
      setTodoList(prev => [...prev, response.data])
      setToDoText('')
    } catch (err) {
      console.log(err);
    }
  };

  const deleteToDo = async (id) => {
    try {
      const response = await axios.delete(DB_URL + `/${id}`)
      const newToDoList = todoList.filter(item => item._id !== id)
      setTodoList(newToDoList)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <h1>To Do List!</h1>
      <br />
      <h4>Tasks</h4>
      <form onSubmit={e => addToDo(e)}>
        <input
          type="text"
          placeholder="Add new task..."
          onChange={(e) => {
            setToDoText(e.target.value);
          }}
          value={toDoText}
        ></input>
        <button type="submit">Add</button>
      </form>
      <div>
        {todoList.map((todo) => {
          return (
            <div key={todo.id}>
              <input type='checkbox'></input>
              {todo.text}
              <button className='delete-button' onClick={()=> {deleteToDo(todo._id)}}>x</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
