import { render } from '@testing-library/react';
import ExpenseTracker from './ExpenseTracker';

test('renders ExpenseTracker without crashing', () => {
  render(
    <ExpenseTracker categories={['Food', 'Travel']} onAddExpense={() => {}} />
  );
});