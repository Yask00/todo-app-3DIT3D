import { http, HttpResponse } from 'msw';

const todos = [
  {
    text: 'Init workspace and apps',
    status: 'completed',
    id: 1,
  },
  {
    text: 'Add few components with NX',
    status: 'active',
    id: 2,
  },
  {
    text: 'Add styling to elements',
    status: 'active',
    id: 3,
  },
  {
    text: 'Add unit tests',
    status: 'active',
    id: 4,
  },
  {
    text: 'Mock backend with msw',
    status: 'active',
    id: 5,
  },
];

export const handlers = [
  http.get('https://example.com/todos', () => {
    return HttpResponse.json(todos);
  }),
  http.post('https://example.com/todos/add', async ({ request }) => {
    const newTodo = await request.json();
    newTodo.id = todos.length + 1;

    todos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 });
  }),
  http.patch('https://example.com/todos/edit', async ({ request }) => {
    const id = await request.json();
    const editedTodo = todos.find((todo) => todo.id === id);

    if (!editedTodo) {
      return new HttpResponse(null, { status: 404 });
    }

    editedTodo.status = 'completed';
    return HttpResponse.json(editedTodo);
  }),
  http.delete('https://example.com/todos/delete', async ({ request }) => {
    const id = await request.json();
    const deletedTodoIndex = todos.findIndex((todo) => todo.id === id);

    if (deletedTodoIndex < 0) {
      return new HttpResponse(null, { status: 404 });
    }

    const deletedTodo = todos.splice(deletedTodoIndex, 1);

    return HttpResponse.json(deletedTodo);
  }),
];
