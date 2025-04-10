import { useEffect } from 'react';
import './App.scss';
import ActiveList from './Todos/ActiveList/ActiveList';
import AddTodo from './Todos/AddTodo/AddTodo';
import CompletedList from './Todos/CompletedList/CompletedList';
import { Todo } from './types/types';

export function App() {

  useEffect(() => {
    getTodosHandler();
  }, []);

  const getTodosHandler = () => {
    fetch("https://example.com/todos").then((response) => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    }).then((todos) => {
      console.log(todos);
    })
  };

  const addTodoHandler = async (todo: Todo) => {
    const response = await fetch("https://example.com/todos/add", {
      method: "POST",
      body: JSON.stringify(todo),
    });

    if(!response.ok) {
      throw new Error();
    }

    const newTodo = await response.json();
    console.log(newTodo);
  };

  const completeTodoHandler = async(id: number) => {
    const response = await fetch("https://example.com/todos/edit", {
      method: "PATCH",
      body: JSON.stringify({id: id}),
    });

    if(!response.ok) {
      throw new Error();
    }

    const completedTodo = await response.json();
  }

  const deleteTodoHandler = async(id: number) => {
    const response = await fetch("https://example.com/todos/delete", {
      method: "DELETE",
      body: JSON.stringify({id: id}),
    });

    if(!response.ok) {
      throw new Error();
    }

    const deletedTodo = await response.json();
  }

  return (
    <div className="main">
      <AddTodo />
      <ActiveList />
      <CompletedList />
      <button onClick={() => addTodoHandler({ text: 'added', status: 'active' })}>
        Add todo
      </button>
      <button onClick={getTodosHandler}>
        Get todos
      </button>
      <button onClick={() => completeTodoHandler(6)}>
        Complete last added
      </button>
      <button onClick={() => deleteTodoHandler(6)}>
        Delete last added
      </button>
    </div>
  );
}

export default App;
