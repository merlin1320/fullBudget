import { render } from '@testing-library/react';
import SalaryCalculator from './SalaryCalculator';

test('renders SalaryCalculator without crashing', () => {
  render(<SalaryCalculator />);
});