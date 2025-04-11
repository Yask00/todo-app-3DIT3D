import './App.scss';
import ActiveList from './Todos/ActiveList/ActiveList';
import AddTodo from './Todos/AddTodo/AddTodo';
import CompletedList from './Todos/CompletedList/CompletedList';
import { Todo as TodoInt } from './types/types';
import { useGetTodosQuery } from './Todos/todosApiSlice';
import { useEffect, useState } from 'react';

export function App() {
  const { data: todos = [], isLoading, isError } = useGetTodosQuery({});
  const [completeTodos, setCompleteTodos] = useState<TodoInt[]>([]);
  const [activeTodos, setActiveTodos] = useState<TodoInt[]>([]);

  useEffect(() => {
    const completed = todos.filter(
      (todo: TodoInt) => todo.status === 'completed'
    );
    const active = todos.filter((todo: TodoInt) => todo.status === 'active');
    setCompleteTodos(completed);
    setActiveTodos(active);
  }, [todos]);

  if (isError) {
    return (
      <div className="main">
        <div>Error</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="main">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="main">
      <AddTodo />
      <ActiveList todos={activeTodos} />
      <CompletedList todos={completeTodos} />
    </div>
  );
}

export default App;
