import { useEffect, useState } from "react";

import "./App.css";

interface Todo {
  text: string;
  createdAt: string;
  done: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>({
    text: "",
    createdAt: "",
    done: false,
  });
  async function fetchTodos() {
    const response = await fetch("/api");
    return response.json();
  }
  async function saveTodo(todo: any) {
    const url = "/api"; // Substitua pela URL correta

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text: todo.text}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post criado:", data);
      })
      .catch((error) => {
        console.error("Ocorreu um erro:", error);
      });
  }
  useEffect(() => {
    fetchTodos().then((body) => {
      setTodos(body.todos);
      console.log(body);
    });
  }, []);

  function onSave() {
    setTodos([...todos, todo]);
    saveTodo(todo)
  }
  return (
    <>
      <div>
        <input
          type="text"
          value={todo.text}
          onChange={(e) => {
            setTodo({ ...todo, text: e.target.value });
          }}
        ></input>
        <button onClick={onSave}>Salvar</button>
        {todos.map((todo, idx) => {
          return <div key={idx}>{todo.text}</div>;
        })}
      </div>
    </>
  );
}

export default App;
