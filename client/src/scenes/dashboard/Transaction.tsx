import { BoxHeader } from "@/components/BoxHeader";
import { DashboardBox } from "@/components/DashboardBox";
import { FlexBetween } from "@/components/FlexBetween";
import kpiJSON from "@/mock/kpi.json";
import productJSON from "@/mock/product.json";
import transactionJSON from "@/mock/transaction.json";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

export const Transaction = () => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  useEffect(() => {
    console.log(`loaded`);
  }, [kpiData, productData, transactionData]);

  const MOCK = {
    products: { heading: "List of Products", stat: "124 products" },
    recentOrders: {
      heading: "Recent Orders",
      stat: `${transactionJSON?.length} latest transactions`,
    },
    expenseBreakdown: { heading: "Expense Breakdown By Category", stat: "+5%" },
    overallSummary: { heading: "Overall Summary", stat: "+10%" },
  };

  const productColumns = [
    { field: "_id", headerName: "id", flex: 1 },
    {
      field: "price",
      headerName: "Price",
      flex: 0.4,
      renderCell: ({ value }: GridCellParams) => `$${value}`,
      // renderCell: ({ row: { price } }: GridCellParams) => `$${price}`,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.4,
      renderCell: ({ value }: GridCellParams) => `$${value}`,
      // renderCell: ({ row: { expense } }: GridCellParams) => `$${expense}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.2,
      renderCell: ({ value }: GridCellParams) => `$${value}`,
      // renderCell: ({ row: { amount } }: GridCellParams) => `$${amount}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: ({ value }: GridCellParams) => (value as String[])?.length,
      // renderCell: ({ row: { value } }: GridCellParams) =>
      //   (value as String[])?.length,
    },
  ];

  const pieData = useMemo(() => {
    if (kpiJSON) {
      const totalExpenses = kpiJSON[0].totalExpenses;
      return Object.entries(kpiJSON[0].expensesByCategory).map(([k, v]) => [
        { name: k, value: v },
        { name: `net ${k}`, value: totalExpenses - v },
      ]);
    }
  }, []);

  return (
    <>
      {/* LIST OF PRODUCTS */}
      <DashboardBox gridArea="g">
        <BoxHeader heading={MOCK.products.heading} stat={MOCK.products.stat} />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true} // hide page and rowsPerPage
            rows={productJSON || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      {/* RECENT ORDERS */}
      <DashboardBox gridArea="h">
        <BoxHeader
          heading={MOCK.recentOrders.heading}
          stat={MOCK.recentOrders.stat}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionJSON || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      {/* EXPENSE BREAKDOWN BY CATEGORY */}
      <DashboardBox gridArea="i">
        <BoxHeader
          heading={MOCK.expenseBreakdown.heading}
          stat={MOCK.expenseBreakdown.stat}
        />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieData &&
            pieData.map((data, index) => (
              <Box key={index}>
                <PieChart width={110} height={100}>
                  <Pie
                    data={data}
                    stroke="none"
                    innerRadius={15}
                    outerRadius={35}
                    paddingAngle={1}
                    dataKey="value"
                  >
                    {data.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          [palette.primary[800], palette.primary[500]][index]
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
                <Typography variant="h5">{data[0].name}</Typography>
              </Box>
            ))}
        </FlexBetween>
      </DashboardBox>

      {/* OVERALL SUMMARY */}
      <DashboardBox gridArea="j">
        <BoxHeader
          heading={MOCK.overallSummary.heading}
          stat={MOCK.overallSummary.stat}
        />
        <Box
          height="20px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="20px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium,
          facilis facere hic exercitationem distinctio vitae optio enim? Nulla
          praesentium nisi culpa labore. Quos consequuntur soluta reiciendis
          deleniti! Consequatur, quo id!
        </Typography>
      </DashboardBox>
    </>
  );
};
