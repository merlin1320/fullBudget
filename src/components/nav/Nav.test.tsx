import { render } from '@testing-library/react';
import Nav from './Nav';
import { MemoryRouter } from 'react-router-dom';

test('renders Nav without crashing', () => {
  render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );
});