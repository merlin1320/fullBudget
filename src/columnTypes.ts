import { GridColDef } from "@mui/x-data-grid";

export const homeExpenseColumns: GridColDef[]=[
    {
        flex: 1,
        field: "remove",
        headerName: "Remove",
        minWidth: 150,
        disableColumnMenu: true,
        sortable: false,
        // renderCell: (params) => {
        //   return (
        //     <Button
        //       onClick={() => {
        //         console.log(params);
        //       }}
        //     >
        //       Remove
        //     </Button>
        //   );
        // },
      },
      {
        flex: 2,
        field: "col1",
        headerName: "Expense",
        minWidth: 150,
        disableColumnMenu: true,
        sortable: false,

      },
      {
        flex: 2,
        field: "col2",
        headerName: "Expense date",
        minWidth: 150,
        disableColumnMenu: true,
      },
]
export const homeIncomeColumns: GridColDef[]=[
    {
        flex: 1,
        field: "remove",
        headerName: "Remove",
        minWidth: 150,
        disableColumnMenu: true,
        sortable: false,
        // renderCell: (params) => {
        //   return (
        //     <Button
        //       onClick={() => {
        //         console.log(params);
        //       }}
        //     >
        //       Remove
        //     </Button>
        //   );
        // },
      },
      {
        flex: 2,
        field: "col1",
        headerName: "Income",
        minWidth: 150,
        disableColumnMenu: true,
        sortable: false,
      },
      {
        flex: 2,
        field: "col2",
        headerName: "Income received Date",
        minWidth: 150,
        disableColumnMenu: true,
      },
]
export const homeBudgetColumns: GridColDef[]=[
    {
        flex: 1,
        field: "remove",
        headerName: "Remove",
        minWidth: 150,
        disableColumnMenu: true,
        sortable: false,
        // renderCell: (params) => {
        //   return (
        //     <Button
        //       onClick={() => {
        //         console.log(params);
        //       }}
        //     >
        //       Remove
        //     </Button>
        //   );
        // },
      },
      {
        flex: 2,
        field: "col1",
        headerName: "Budget",
        minWidth: 150,
        disableColumnMenu: true,
        sortable: false,

      },
      {
        flex: 2,
        field: "col2",
        headerName: "Budget Date",
        minWidth: 150,
        disableColumnMenu: true,
      },
      {
        flex: 2,
        field: "col3",
        headerName: "Budget Cost",
        minWidth: 150,
        disableColumnMenu: true,
        sortable: false,

      },
]