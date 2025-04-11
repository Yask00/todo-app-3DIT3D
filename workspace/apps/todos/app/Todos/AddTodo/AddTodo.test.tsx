import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import AddTodo from './AddTodo';
import 'jest';
import { useAddTodoMutation } from '../todosApiSlice';
import { ReactNode } from 'react';

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

describe('AddTodo', () => {
  it('should render AddTodo successfully', () => {
    const container = render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    expect(container).toBeTruthy();
  });

  it('should add a new todo if input is ok', async () => {
    fetchMock.mockOnceIf('https://example.com/todos/add', () =>
      Promise.resolve({
        status: 201,
        body: JSON.stringify({
          text: 'test',
          status: 'active',
        }),
      })
    );

    renderHook(() => useAddTodoMutation(), { wrapper: Wrapper });

    render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Add a new task');
    const button = screen.getByRole('button');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
    fireEvent.click(button);

    const response = await fetch('https://example.com/todos/add', {
      method: 'POST',
      body: JSON.stringify({
        text: 'test',
        status: 'active',
      }),
    });

    expect(fetchMock).toBeCalled();
    expect(fetchMock).toBeCalledWith(
      'https://example.com/todos/add',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          text: 'test',
          status: 'active',
        }),
      })
    );
    expect(response.status).toBe(201);

    const createdTodo = await response.json();

    expect(createdTodo).toEqual({
      text: 'test',
      status: 'active',
    });
  });

  it('should not add a new todo if empty input', async () => {
    render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Add a new task');
    const button = screen.getByRole('button');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toHaveValue('');

    expect(button).toBeDisabled();
  });
});
