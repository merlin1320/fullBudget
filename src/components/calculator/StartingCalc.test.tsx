import { render } from '@testing-library/react';
import StartingCalc from './StartingCalc';

test('renders StartingCalc without crashing', () => {
  render(<StartingCalc />);
});