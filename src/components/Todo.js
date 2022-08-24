import React, { useState, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import Todoform from "./TodoForm";
import { motion } from "framer-motion";
import useScrollPosition from "@react-hook/window-scroll";

function Todo({ todos, completeTodo, removeTodo, updateTodo, addTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  const scrollY = useScrollPosition(60 /*fps*/);

  const [isEdit, setIsEdit] = useState(false);

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
    setIsEdit(!isEdit);
  };

  if (edit.id) {
    return (
      <Todoform
        editValue={true}
        onSubmit={submitUpdate}
        editMode={true}
        editModeText={edit.value}
      />
    );
  }

  return (
    <>
      {!isEdit ? <Todoform onSubmit={addTodo} /> : null}
      <div className="todo-wrapper">
        {todos?.map((todo, index) => {
          return (
            <motion.div
              layout
              className={todo.isComplete ? "todo-row complete" : "todo-row"}
              key={index}
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              whileHover={{ scale: 1.03 }}
            >
              <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
              </div>
              <div className="icons">
                <AiOutlineCheckCircle
                  onClick={() => {
                    completeTodo(todo.id);
                  }}
                  className="done-icon"
                />
                <TiEdit
                  onClick={() => {
                    return (
                      setEdit({ id: todo.id, value: todo.text }),
                      setIsEdit(!isEdit)
                    );
                  }}
                  className="edit-icon"
                />
                <RiCloseCircleLine
                  onClick={() => {
                    window.scrollTo(0, scrollY);
                    removeTodo(todo.id);
                  }}
                  className="delete-icon"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

export default Todo;
