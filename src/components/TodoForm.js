import React, { useState, useEffect, useRef } from "react";

export default function Todoform(props) {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const handlechange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={
            props.editMode
              ? "Editing plan: " + props.editModeText
              : "Add a plan"
          }
          value={input}
          name="text"
          className={props.editMode ? "todo-input editMode" : "todo-input"}
          onChange={handlechange}
          ref={inputRef}
        />
        <button className="todo-button">
          {props.editValue ? "Edit Todo" : "Add Plan"}
        </button>
      </form>
    </>
  );
}
