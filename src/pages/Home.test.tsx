import { render } from '@testing-library/react';
import Home from './Home';

test('renders Home page without crashing', () => {
  render(<Home />);
});