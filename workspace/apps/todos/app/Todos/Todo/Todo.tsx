import './Todo.scss';
import { Todo as TodoInt } from '../../types/types';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useDeleteTodoMutation,
  useCompleteTodoMutation,
} from '../todosApiSlice';

interface TodoProps {
  todo: TodoInt;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();

  return (
    <div className={`todo todo--${todo.status}`}>
      <span>{todo.text}</span>
      {todo.status === 'active' && (
        <div className="actions">
          <FontAwesomeIcon
            onClick={() => completeTodo(todo.id)}
            icon={faCheck}
            data-testid="check-icon"
          />
          <FontAwesomeIcon
            onClick={() => deleteTodo(todo.id)}
            icon={faTrash}
            data-testid="delete-icon"
          />
        </div>
      )}
    </div>
  );
};

export default Todo;
