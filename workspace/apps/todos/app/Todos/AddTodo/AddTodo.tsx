import './AddTodo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAddTodoMutation } from '../todosApiSlice';

const AddTodo: React.FC = () => {
  const [addTodo] = useAddTodoMutation();
  const [todoText, setTodoText] = useState('');

  const submitHandler = () => {
    if (todoText.trim() === '') {
      return;
    }

    addTodo({
      text: todoText,
      status: 'active',
    });
  };

  return (
    <div className="add-todo">
      <input
        onChange={(e) => setTodoText(e.target.value)}
        className="add-todo__text"
        type="text"
        name=""
        id=""
        placeholder="Add a new task"
      />
      <button
        onClick={submitHandler}
        disabled={todoText.trim() === ''}
        type="button"
        className="add-todo__btn"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default AddTodo;
