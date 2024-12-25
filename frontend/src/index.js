import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch all todos from the backend
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo");
    const data = await response.json();
    setTodos(data.data);
  };

  // Add a new todo
  const addTodo = async () => {
    const todo = {
      id: Date.now().toString(),
      item: newTodo,
    };
//    await fetch("http://localhost:8000/todo", {
await fetch("https://backend-production-d9a9.up.railway.app:8000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    setNewTodo("");
    fetchTodos();
  };

  // Update a todo
  const updateTodo = async (id, updatedItem) => {
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: updatedItem }),
    });
    fetchTodos();
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              defaultValue={todo.item}
              onBlur={(e) => updateTodo(todo.id, e.target.value)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
