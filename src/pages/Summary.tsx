import React, { useMemo, useState } from "react";
import { Box, Typography, Divider, Paper, Button, MenuItem, FormControl, InputLabel, Select, Stack } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { storage } from "../utils/storage";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF", "#FF6699", "#33CC99", "#FF4444"];

const Summary: React.FC = () => {
  // Load data from storage
  const salary = storage.get("takeHomePay") || 0;
  const extraIncomeList = storage.get("extraIncomeList") || [];
  const expenses = storage.get("expenses") || [];

  // Calculate totals
  const totalExtraIncome = extraIncomeList.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
  const totalIncome = salary + totalExtraIncome;
  const totalExpenses = expenses.reduce((sum: number, exp: any) => sum + (exp.amount || 0), 0);

  // Add date fields to rows (default to today if missing)
  const today = dayjs();
  const incomeRows = [
    { id: 1, type: 'Salary', incomeType: 'Salary', category: 'Salary', amount: salary, date: today.format('YYYY-MM-DD') },
    ...extraIncomeList.map((item: any, idx: number) => ({ id: idx + 2, type: 'Extra Income', incomeType: item.label, category: item.label, amount: item.amount, date: item.date || today.format('YYYY-MM-DD') }))
  ];
  const expenseRows = expenses.map((exp: any, idx: number) => ({ id: idx + 100, type: 'Expense', expenseCategory: exp.category, category: exp.category, amount: exp.amount, note: exp.note, date: exp.date || today.format('YYYY-MM-DD') }));
  const allRows = [...incomeRows, ...expenseRows];

  const columns: GridColDef[] = [
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'incomeType', headerName: 'Income Type', width: 150 },
    { field: 'expenseCategory', headerName: 'Expense Category', width: 150 },
    { field: 'category', headerName: 'Category', width: 180 },
    { field: 'amount', headerName: 'Amount ($)', width: 130, type: 'number' },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'note', headerName: 'Note', width: 200, flex: 1 },
  ];

  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [incomeTypeFilter, setIncomeTypeFilter] = useState<string>("all");
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);

  // Get all income types and expense categories for filter dropdowns
  const allIncomeTypes = useMemo(() => {
    const types = new Set<string>();
    incomeRows.forEach((row: any) => types.add(row.incomeType));
    return Array.from(types);
  }, [incomeRows]);
  const allExpenseCategories = useMemo(() => {
    const cats = new Set<string>();
    expenseRows.forEach((row: any) => cats.add(row.expenseCategory));
    return Array.from(cats);
  }, [expenseRows]);

  // Filtering logic
  const filteredRows = allRows.filter(row => {
    const typeMatch = typeFilter === "all" || row.type === typeFilter;
    const incomeTypeMatch = row.type === 'Salary' || row.type === 'Extra Income'
      ? (incomeTypeFilter === 'all' || row.incomeType === incomeTypeFilter)
      : true;
    const expenseCategoryMatch = row.type === 'Expense'
      ? (expenseCategoryFilter === 'all' || row.expenseCategory === expenseCategoryFilter)
      : true;
    const dateMatch = (!dateFrom || dayjs(row.date).isSameOrAfter(dateFrom, 'day')) &&
      (!dateTo || dayjs(row.date).isSameOrBefore(dateTo, 'day'));
    return typeMatch && incomeTypeMatch && expenseCategoryMatch && dateMatch;
  });

  // CSV Export
  const exportToCSV = () => {
    const headers = ["Type", "Income Type", "Expense Category", "Category", "Amount", "Date", "Note"];
    const rows = filteredRows.map(row => [row.type, row.incomeType || "", row.expenseCategory || "", row.category, row.amount, row.date, row.note || ""]);
    let csvContent = "data:text/csv;charset=utf-8," +
      headers.join(",") + "\n" +
      rows.map(e => e.map(x => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "budget_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pie chart data for expenses by category
  const pieData = useMemo(() => {
    const map: { [cat: string]: number } = {};
    expenses.forEach((exp: any) => {
      map[exp.category] = (map[exp.category] || 0) + (exp.amount || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4, p: 3 }}>
        <Typography variant="h4" gutterBottom>Summary</Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Income vs Expenses</Typography>
          <Paper sx={{ p: 2, display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="subtitle1">Total Income</Typography>
              <Typography variant="h6" color="success.main">${totalIncome.toFixed(2)}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">Total Expenses</Typography>
              <Typography variant="h6" color="error.main">${totalExpenses.toFixed(2)}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">Net</Typography>
              <Typography variant="h6" color={totalIncome - totalExpenses >= 0 ? 'success.main' : 'error.main'}>
                ${(totalIncome - totalExpenses).toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 4 }}>
          <Box sx={{ flex: 1, minWidth: 350, height: 400 }}>
            <Typography variant="h6" gutterBottom>Income & Expenses Table</Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select value={typeFilter} label="Type" onChange={e => setTypeFilter(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Extra Income">Extra Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Income Type</InputLabel>
                <Select value={incomeTypeFilter} label="Income Type" onChange={e => setIncomeTypeFilter(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  {allIncomeTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 170 }}>
                <InputLabel>Expense Category</InputLabel>
                <Select value={expenseCategoryFilter} label="Expense Category" onChange={e => setExpenseCategoryFilter(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  {allExpenseCategories.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <DatePicker
                label="From"
                value={dateFrom}
                onChange={setDateFrom}
                slotProps={{ textField: { size: 'small', sx: { minWidth: 120 } } }}
                maxDate={dateTo || undefined}
              />
              <DatePicker
                label="To"
                value={dateTo}
                onChange={setDateTo}
                slotProps={{ textField: { size: 'small', sx: { minWidth: 120 } } }}
                minDate={dateFrom || undefined}
                maxDate={today}
              />
              <Button variant="outlined" onClick={exportToCSV}>Export to CSV</Button>
            </Stack>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              autoHeight
              initialState={{
                pagination: { paginationModel: { pageSize: 7 } }
              }}
              pageSizeOptions={[7, 15, 30]}
              disableRowSelectionOnClick
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 350, height: 400 }}>
            <Typography variant="h6" gutterBottom>Expenses by Category</Typography>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Summary;
