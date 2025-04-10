import { render } from '@testing-library/react';

import ActiveList from './ActiveList';

describe('ActiveList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActiveList />);
    expect(baseElement).toBeTruthy();
  });
});
