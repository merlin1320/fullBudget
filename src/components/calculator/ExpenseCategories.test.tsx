import { render } from '@testing-library/react';
import ExpenseCategories from './ExpenseCategories';

test('renders ExpenseCategories without crashing', () => {
  render(<ExpenseCategories />);
});