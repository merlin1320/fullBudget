import { Box } from "@mui/material";
import SalaryCalculator from "../components/calculator/SalaryCalculator";
import ExtraIncome from "../components/calculator/ExtraIncome";

const IncomePage = () => (
  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start', justifyContent: 'center', mt: 4 }}>
    <SalaryCalculator />
    <ExtraIncome />
  </Box>
);

export default IncomePage;
