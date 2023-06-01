import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
const DB_URL = "http://localhost:3001/todos";

function App() {
  // List state
  const [todoList, setTodoList] = useState([]);
  // New task state
  const [toDoText, setToDoText] = useState("");

  // Grab existing list when page first loads
  useEffect(() => {
    getToDos();
  }, []);

  // Grabs all list items from DB
  const getToDos = async () => {
    try {
      const response = await axios.get(DB_URL);
      setTodoList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add new item
  const addToDo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(DB_URL, { text: toDoText });
      setTodoList((prev) => [...prev, response.data]);
      setToDoText("");
    } catch (err) {
      console.log(err);
    }
  };

  // Delete an item
  const deleteToDo = async (id) => {
    try {
      const response = await axios.delete(DB_URL + `/${id}`);
      const newToDoList = todoList.filter((item) => item._id !== id);
      setTodoList(newToDoList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>Do Stuff List</h1>
      <br />
      <h4>Tasks</h4>
      <div className="input">
      <form onSubmit={(e) => addToDo(e)}>
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
      </div>
      <div>
        {todoList.map((todo) => {
          return (
            <div className="todo" key={todo.id}>
              <input
                id={todo.id}
                type="checkbox"
                checked={todo.complete ? "checked" : ""}
              ></input>
              <label for={todo.id}> {todo.text} </label>
              <button
                className="delete-button"
                onClick={() => {
                  deleteToDo(todo._id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
