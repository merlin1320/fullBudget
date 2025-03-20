import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  homeBudgetColumns,
  homeExpenseColumns,
  homeIncomeColumns,
} from "../columnTypes";

export const Home = () => {
  const pageSize = 5;
  const drawerWidth = 276;
  const tableMaxSize = `calc(100% - ${drawerWidth}px)`;

  const { palette, breakpoints } = useTheme();

  return (
    <Box>
      <Box sx={{ classname: "Expenses" }}>
        <DataGrid
          columns={homeExpenseColumns}
          sx={{
            height: "fit-content",
            borderColor: palette.primary.main,
            "& .MuiDataGrid-withBorderColor": {
              borderColor: palette.primary.main,
            },
            width: tableMaxSize,
            minWidth: 300,
            [breakpoints.up("sm")]: { width: tableMaxSize },
            [breakpoints.up("md")]: {
              width: tableMaxSize,
            },
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
      <Box sx={{ classname: "Income" }}>
        <DataGrid
          columns={homeIncomeColumns}
          sx={{
            height: "fit-content",
            borderColor: palette.primary.main,
            "& .MuiDataGrid-withBorderColor": {
              borderColor: palette.primary.main,
            },
            width: tableMaxSize,
            minWidth: 300,
            [breakpoints.up("sm")]: { width: tableMaxSize },
            [breakpoints.up("md")]: {
              width: tableMaxSize,
            },
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
      <Box sx={{ classname: "Budget" }}>
        <DataGrid
          columns={homeBudgetColumns}
          sx={{
            height: "fit-content",
            borderColor: palette.primary.main,
            "& .MuiDataGrid-withBorderColor": {
              borderColor: palette.primary.main,
            },
            width: tableMaxSize,
            minWidth: 300,
            [breakpoints.up("sm")]: { width: tableMaxSize },
            [breakpoints.up("md")]: {
              width: tableMaxSize,
            },
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
