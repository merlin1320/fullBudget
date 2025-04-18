import { render } from '@testing-library/react';
import Expenses from './Expenses';

test('renders Expenses without crashing', () => {
  render(<Expenses />);
});