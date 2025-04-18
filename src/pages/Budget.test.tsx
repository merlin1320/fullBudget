import { render } from '@testing-library/react';
import Budget from './Budget';

test('renders Budget page without crashing', () => {
  render(<Budget />);
});