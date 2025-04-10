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
  // Intercept "GET https://example.com/user" requests...
  http.get('https://example.com/todos', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(todos);
  }),
  http.post('https://example.com/todos/add', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newTodo = await request.json()
    newTodo.id = todos.length + 1;
    // Push the new post to the map of all posts.
    todos.push(newTodo)
 
    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created post!
    return HttpResponse.json(newTodo, { status: 201 })
  }),
  http.patch('https://example.com/todos/edit', async ({ request }) => {
    const { id } = await request.json();
    const editedTodo = todos.find(todo => todo.id === id);
    
    if (!editedTodo) {
      return new HttpResponse(null, { status: 404 })
    };

    editedTodo.status = "completed";
    return HttpResponse.json(editedTodo);

  }),
  http.delete('https://example.com/todos/delete', async({ request }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = await request.json();
    // Let's attempt to grab the post by its ID.
    const deletedTodoIndex = todos.findIndex(todo => todo.id === id)
 
    // Respond with a "404 Not Found" response if the given
    // post ID does not exist.
    if (deletedTodoIndex < 0) {
      return new HttpResponse(null, { status: 404 })
    }
 
    // Delete the post from the "allPosts" map.
    const deletedTodo = todos.splice(deletedTodoIndex, 1);
 
    // Respond with a "200 OK" response and the deleted post.
    return HttpResponse.json(deletedTodo)
  }),
];
