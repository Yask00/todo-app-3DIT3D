import './AddTodo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { useAddTodoMutation } from '../todosApiSlice';

export function AddTodo() {
  const [addTodo] = useAddTodoMutation();
  const newTodo = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    const todoText = newTodo.current && newTodo.current.value.trim();
    if (!todoText || todoText === '') {
      throw new Error();
    }

    addTodo({
      text: todoText,
      status: 'active',
    });
  };

  return (
    <div className="add-todo">
      <input
        ref={newTodo}
        className="add-todo__text"
        type="text"
        name=""
        id=""
        placeholder="Add a new task"
      />
      <button onClick={submitHandler} className="add-todo__btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default AddTodo;
