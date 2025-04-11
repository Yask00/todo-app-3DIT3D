import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import Todo from './Todo';
import 'jest';
import { useAddTodoMutation } from '../todosApiSlice';
import { ReactNode } from 'react';
import { Todo as TodoInt } from '../../types/types';

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

describe('Todo', () => {
  it('should render active Todo successfully', () => {
    const todo: TodoInt = {
      text: 'test',
      status: 'active',
      id: '1',
    };

    const container = render(
      <Provider store={store}>
        <Todo todo={todo} />
      </Provider>
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(
      container.container.querySelector('.todo--active')
    ).toBeInTheDocument();
    expect(
      container.container.querySelector('.todo--completed')
    ).not.toBeInTheDocument();
  });

  it('should complete active Todo successfully', async () => {
    const todo: TodoInt = {
      text: 'test',
      status: 'active',
      id: '1',
    };

    fetchMock.mockOnceIf('https://example.com/todos/edit', () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({
          text: 'test',
          status: 'completed',
          id: '1',
        }),
      })
    );

    render(
      <Provider store={store}>
        <Todo todo={todo} />
      </Provider>
    );

    const completeButton = screen.getByTestId('check-icon');
    expect(completeButton).toBeInTheDocument();
    fireEvent.click(completeButton);

    const response = await fetch('https://example.com/todos/edit', {
      method: 'POST',
      body: JSON.stringify(1),
    });

    expect(response.status).toBe(200);
  });

  it('should delete Todo successfully', async () => {
    const todo: TodoInt = {
      text: 'test',
      status: 'active',
      id: '1',
    };

    fetchMock.mockOnceIf('https://example.com/todos/delete', () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({
          text: 'test',
          status: 'active',
          id: '1',
        }),
      })
    );

    render(
      <Provider store={store}>
        <Todo todo={todo} />
      </Provider>
    );

    const deleteButton = screen.getByTestId('delete-icon');
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    const response = await fetch('https://example.com/todos/delete', {
      method: 'DELETE',
      body: JSON.stringify(1),
    });

    expect(response.status).toBe(200);
  });
});
