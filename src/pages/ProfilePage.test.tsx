import { render } from '@testing-library/react';
import ProfilePage from './ProfilePage';

test('renders ProfilePage without crashing', () => {
  render(<ProfilePage />);
});