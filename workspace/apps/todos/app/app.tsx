import './App.scss';
import ActiveList from './Todos/ActiveList/ActiveList';
import AddTodo from './Todos/AddTodo/AddTodo';
import CompletedList from './Todos/CompletedList/CompletedList';
import { Todo } from './types/types';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
} from './Todos/todosApiSlice';

export function App() {
  // GET ALL and split them into two sections of the state
  // WHEN COMPLETE ONE MOVE IT TO THE OTHER section
  // when delete one remove it from the current section
  // when add new add it to the normal section

  const { data: todos = [], isLoading, isError } = useGetTodosQuery({});

  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();

  if (isError) {
    return <div className="main"><div>Error</div></div>;
  }

  if (isLoading) {
    return <div className="main"><div>Loading...</div></div>;
  }

  return (
    <div className="main">
      {todos.map((todo: Todo) => {
        return <div key={todo.id}>{todo.text}</div>;
      })}
      <button onClick={() => addTodo({ text: 'added', status: 'active' })}>
        Add todo
      </button>
      <button onClick={() => deleteTodo({ id: 6 })}>Delete last added</button>
      <button onClick={() => completeTodo(6)}>Complete last added</button>
      {/* <AddTodo />
      <ActiveList />
      <CompletedList />
       */}
    </div>
  );
}

export default App;
