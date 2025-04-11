import { Todo as TodoInt } from '../../types/types';
import Todo from '../Todo/Todo';
import './ActiveList.scss';

interface TodosProps {
  todos: TodoInt[];
}

const ActiveList: React.FC<TodosProps> = ({ todos }) => {
  return (
    <div className="active-list">
      <h1 className="header">Tasks to do - {todos.length}</h1>
      {todos.map((todo: TodoInt) => {
        return <Todo todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

export default ActiveList;
