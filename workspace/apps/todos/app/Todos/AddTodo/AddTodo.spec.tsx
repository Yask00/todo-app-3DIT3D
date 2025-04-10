import { render } from '@testing-library/react';

import AddTodo from './AddTodo';

describe('AddTodo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddTodo />);
    expect(baseElement).toBeTruthy();
  });
});
