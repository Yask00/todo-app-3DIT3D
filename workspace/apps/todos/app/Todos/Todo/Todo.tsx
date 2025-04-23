import { useEffect, useState } from 'react';
import './Todo.scss';
import { Todo as TodoInt } from '../../types/types';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
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
  const [deleteInProcess, setDeleteInProcess] = useState(false);
  

  useEffect(() => {
    const handleDelete = (id: string) => {
      deleteTodo(id);
    };

    let timeout: NodeJS.Timeout | undefined = undefined;

    if (deleteInProcess) {
      timeout = setTimeout(() => {
        if (todo.id !== undefined) {
          handleDelete(todo.id);
        }
      }, 2000);
    }

    if (timeout && !deleteInProcess) {
      clearTimeout(timeout);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [deleteTodo, deleteInProcess, todo.id]);

  return (
    <div className={`todo todo--${todo.status}`}>
      <span>{todo.text}</span>
      {todo.status === 'active' && (
        <div className="actions">
          {!deleteInProcess && (
            <>
              <FontAwesomeIcon
                onClick={() => completeTodo(todo.id)}
                icon={faCheck}
                data-testid="check-icon"
              />
              <FontAwesomeIcon
                onClick={() => setDeleteInProcess(true)}
                icon={faTrash}
                data-testid="delete-icon"
              />
            </>
          )}

          {deleteInProcess && (
            <div className="delete-confirmation">
              <FontAwesomeIcon onClick={() => setDeleteInProcess(false)} icon={faCircleXmark} data-testid="rever-delete" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Todo;
