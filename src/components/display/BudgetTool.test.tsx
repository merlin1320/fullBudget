import { render } from '@testing-library/react';
import BudgetTool from './BudgetTool';

test('renders BudgetTool without crashing', () => {
  render(<BudgetTool />);
});