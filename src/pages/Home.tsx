import { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  homeBudgetColumns,
  homeExpenseColumns,
  homeIncomeColumns,
} from "../columnTypes";

type TableType = "expenses" | "income" | "budget";

export const Home = () => {
  const pageSize = 5;
  const drawerWidth = 276;
  const tableMaxSize = `calc(100% - ${drawerWidth}px)`;
  const { palette, breakpoints } = useTheme();

  const [selectedTable, setSelectedTable] = useState<TableType>("expenses");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTable(event.target.value as TableType);
  };

  // Dummy data for illustration — replace with real row data
  const expenseRows = [
    { id: 1, name: "Rent", amount: 1200 },
    { id: 2, name: "Groceries", amount: 300 },
  ];

  const incomeRows = [
    { id: 1, source: "Job", amount: 2500 },
    { id: 2, source: "Freelance", amount: 800 },
  ];

  const budgetRows = [{ id: 1, remaining: 1800 }];

  const columnMap = {
    expenses: homeExpenseColumns,
    income: homeIncomeColumns,
    budget: homeBudgetColumns,
  };

  const rowMap = {
    expenses: expenseRows,
    income: incomeRows,
    budget: budgetRows,
  };

  const currentColumns = columnMap[selectedTable];
  const currentRows = rowMap[selectedTable];

  const titleMap = {
    expenses: "Expenses",
    income: "Income",
    budget: "Remaining Budget",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
        gap: 2,
        width:'100%',
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">{titleMap[selectedTable]}</Typography>
        <Select value={selectedTable} onChange={handleChange} size="small">
          <MenuItem value="expenses">Expenses</MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="budget">Remaining Budget</MenuItem>
        </Select>
      </Box>
      <Box sx={{flex:1, justifyContent:'center'}}>
        <DataGrid
          columns={currentColumns}
          rows={currentRows}
          sx={{
            height: "fit-content",
            borderColor: palette.primary.main,
            "& .MuiDataGrid-withBorderColor": {
              borderColor: palette.primary.main,
            },
            width: tableMaxSize,
            minWidth: 300,
            [breakpoints.up("sm")]: { width: tableMaxSize },
            [breakpoints.up("md")]: { width: tableMaxSize },
            [breakpoints.up("lg")]: { width: tableMaxSize },
            minHeight: 250,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize,
              },
            },
          }}
          pageSizeOptions={[pageSize]}
          rowSelection
        />
      </Box>
    </Box>
  );
};

export default Home;
