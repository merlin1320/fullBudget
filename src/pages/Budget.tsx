import SalaryCalculator from '../components/calculator/SalaryCalculator'
import ExtraIncome from '../components/calculator/ExtraIncome'
import ExpenseCategories from '../components/calculator/ExpenseCategories'
import Expenses from '../components/calculator/Expenses'
import { Box, Typography, Divider } from '@mui/material'

export const Budget = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>Budget Dashboard</Typography>
      <Divider sx={{ mb: 3 }} />
      <SalaryCalculator />
      <Divider sx={{ my: 4 }} />
      <ExtraIncome />
      <Divider sx={{ my: 4 }} />
      <ExpenseCategories />
      <Divider sx={{ my: 4 }} />
      <Expenses />
    </Box>
  )
}

export default Budget