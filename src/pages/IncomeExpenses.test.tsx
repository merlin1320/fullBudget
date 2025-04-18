import { render } from '@testing-library/react';
import IncomeExpenses from './IncomeExpenses';

test('renders IncomeExpenses page without crashing', () => {
  render(<IncomeExpenses />);
});