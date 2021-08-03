import React from 'react';
import { useState, useEffect } from 'react';
import './todo.css'

export default function CreateTodo () {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [todoEditing, setTodoEditing] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    useEffect(() => {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }, [todos]);

    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            id: new Date().getTime(),
            text: todo,
            completed: false,
        };
        setTodos([...todos].concat(newTodo));
        setTodo("");
    }

    function deleteTodo(id) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    function submitEdits(id) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }

    return (
        <div id="todo-list">
            <h1 className="title">Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                />
                <button className="add" type="submit">Add</button>
            </form>
            {todos.map((todo) => (
                <div key={todo.id} className="todo">
                    <div className="todo-text">
                        <input
                            type="checkbox"
                            id="completed"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                        />
                        {todo.id === todoEditing ? (
                            <input
                                type="text"
                                onChange={(e) => setEditingText(e.target.value)}
                            />
                        ) : (
                            <div>{todo.text}</div>
                        )}
                    </div>
                    <div className="todo-actions">
                        {todo.id === todoEditing ? (
                            <button className="done" onClick={() => submitEdits(todo.id)}>Done</button>
                        ) : (
                                <button className="edit" onClick={() => setTodoEditing(todo.id)}><i class="fas fa-edit"></i></button>
                        )}

                        <button className="delete" onClick={() => deleteTodo(todo.id)}><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            ))}
        </div>
    );
}