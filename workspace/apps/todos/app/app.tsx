import './App.scss';
import ActiveList from './Todos/ActiveList/ActiveList';
import AddTodo from './Todos/AddTodo/AddTodo';
import CompletedList from './Todos/CompletedList/CompletedList';

export function App() {
  return (
    <div className="main">
      <AddTodo />
      <ActiveList />
      <CompletedList />
    </div>
  );
}

export default App;
