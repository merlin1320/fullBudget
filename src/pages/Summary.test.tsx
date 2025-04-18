import { render } from '@testing-library/react';
import Summary from './Summary';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

test('renders Summary page without crashing', () => {
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Summary />
    </LocalizationProvider>
  );
});