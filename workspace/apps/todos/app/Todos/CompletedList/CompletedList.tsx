import { Todo as TodoInt } from '../../types/types';
import Todo from '../Todo/Todo';
import './CompletedList.scss';

interface TodosProps {
  todos: TodoInt[];
}

const CompletedList: React.FC<TodosProps> = ({ todos }) => {
  return (
    <div className="completed-list">
      <h1 className="header">Done - {todos.length}</h1>
      {todos.map((todo: TodoInt) => {
        return <Todo todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

export default CompletedList;
