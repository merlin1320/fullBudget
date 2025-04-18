import { render } from '@testing-library/react';
import Layout from './Layout';
import { MemoryRouter } from 'react-router-dom';

test('renders Layout without crashing', () => {
  render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  );
});