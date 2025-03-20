import { Box } from '@mui/material'
import BudgetTool from './components/display/BudgetTool'
import StartingCalc from './components/calculator/StartingCalc'

function App() {

  return (
    <Box>
      <StartingCalc/>
      <BudgetTool/>
    </Box>
  )
}

export default App
