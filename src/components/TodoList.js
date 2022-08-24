import React, { useState, useEffect, useLayoutEffect } from "react";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoData = window.localStorage.getItem("todo-key");
    if (todoData) {
      // const parsedTodo = JSON.parse(todoData);
      // for (var i in parsedTodo) todos.push(parsedTodo[i]);
      setTodos(JSON.parse(todoData));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todo-key", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      // blank or only space
      return;
    }
    // convert string of object to an array first
    const parsedNewTodos = [];
    const todoData = window.localStorage.getItem("todo-key");
    const parsedOldTodos = JSON.parse(todoData); // string of object
    for (var i in parsedOldTodos) parsedNewTodos.push(parsedOldTodos[i]);
    const newTodos = [todo, ...parsedNewTodos];
    // console.log(newTodos);

    if (todos.length > 0) {
      // check for identical id
      newTodos.map((checked) => {
        // console.log(checked);
        if (checked.id === todo.id) {
          todo.id = Math.floor(Math.random() * 10000);
        }
        return checked;
      });
    }
    setTodos(newTodos);
    // console.log(todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    return setTodos((prevTodos) =>
      prevTodos.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((props) => props.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Plans of one fine day</h1>

      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        addTodo={addTodo}
      />
    </>
  );
}

export default TodoList;
