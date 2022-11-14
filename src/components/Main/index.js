import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Todo from "../Todo.js";
import "./main.css";

const Main = () => {
  const [font, setFont] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTimeout(() => loadTodos(), 500);
  }, []);

  const handleCard = () => {
    fetch(" http://localhost:3000/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Date.now(),
        todo: todo,
        date: new Date().toDateString(),
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
    setTodo("");
  };

  const handleChange = (event) => {
    setTodo(event.target.value);
    setTimeout(() => loadTodos(), 500);
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });
    setTimeout(() => loadTodos(), 300);
  };


  const fontHandler = (e) => {
    setFont(e.target.value);
  };

  return (
    <div className="col-md-12 border p-3 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6 editing-tools">
            <select name="fonts" id="fonts" onChange={fontHandler}>
              <option value="sans-serif">sans-serif</option>
              <option value="Georgia">Georgia</option>
              <option value="cursive">cursive</option>
              <option value="fantasy">fantasy</option>
              <option value="monospace">monospace</option>
            </select>
          </div>
          <div className="col-md-6">
            <input
              className="todo-input"
              type="text"
              placeholder="Add a Item "
              value={todo}
              onChange={handleChange}
              maxLength="300"
            ></input>
            <Button
              variant="outline-success"
              className="add-btn"
              onClick={handleCard}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <div
        className="row reverse-row justify-content-center"
        style={{ fontFamily: font }}
      >
        {todos.map((item, index) => {
          return (
            <Todo
              text={item.todo}
              date={item.date}
              id={item.id}
              key={index}
              onSelect={deleteItem}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Main;
