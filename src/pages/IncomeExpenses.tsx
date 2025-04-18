import { Box } from '@mui/material'
import StartingCalc from '../components/calculator/StartingCalc'
import BudgetTool from '../components/display/BudgetTool'

export const IncomeExpenses = () => {
  return (
    <Box>
      <StartingCalc/>
      <BudgetTool/>
    </Box>
  )
}

export default IncomeExpenses