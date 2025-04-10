import { render } from '@testing-library/react';

import CompletedList from './CompletedList';

describe('CompletedList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompletedList />);
    expect(baseElement).toBeTruthy();
  });
});
