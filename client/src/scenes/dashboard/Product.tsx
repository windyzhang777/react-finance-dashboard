import { BoxHeader } from "@/components/BoxHeader";
import { DashboardBox } from "@/components/DashboardBox";
import { FlexBetween } from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

interface ProductProps {}

const MOCK = {
  operationalExpenses: {
    heading: "Operational vs Non-Operational Expenses",
    desc: "Operational (left) Non-Operational (right)",
    stat: "+3%",
  },
  campaignsTargets: {
    heading: "Campaigns and Targets",
    stat: "+4%",
    label1: "Target Sales",
    stat1: 73,
    desc1: "Desired Finance goals of the campaign",
    label2: "Losses in Revenue",
    desc2: "Losses are down 20%",
    label3: "Profit Margins",
    desc3: "Margins are up by 40% from last month",
  },
  ProductPriceExpense: {
    heading: "Product Prices vs Expenses",
    stat: "+4%",
  },
};

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

export const Product = (props: ProductProps) => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(
    () =>
      kpiData &&
      kpiData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => ({
          month: month.charAt(0).toUpperCase() + month.slice(1, 3),
          "Operational Expenses": operationalExpenses,
          "Non-Operational Expenses": nonOperationalExpenses,
        })
      ),
    [kpiData]
  );

  const productExpenses = useMemo(
    () =>
      productData &&
      productData.map(({ _id, price, expense }) => ({
        _id: _id,
        price: price,
        expense: expense,
      })),
    [productData]
  );

  return (
    <>
      {/* OPERATIONAL VS NON-OPERATIONAL EXPENSES */}
      <DashboardBox gridArea="d">
        <BoxHeader
          heading={MOCK.operationalExpenses.heading}
          stat={MOCK.operationalExpenses.stat}
        />
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart
            data={operationalExpenses}
            margin={{ top: 20, right: 0, left: 0, bottom: 60 }}
          >
            {/* background grid */}
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="month"
              tickLine={false} // tick on axis
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId={"left"}
              axisLine={false} // axis line
              tickLine={false} // tick on axis
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId={"right"}
              orientation="right"
              axisLine={false} // axis line
              tickLine={false} // tick on axis
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Non-Operational Expenses"
              stroke={palette.tertiary[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* CAMPAIGNS AND TARGETS */}
      <DashboardBox gridArea="e">
        <BoxHeader
          heading={MOCK.campaignsTargets.heading}
          stat={MOCK.campaignsTargets.stat}
        />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{ top: 0, right: -10, left: 10, bottom: 10 }}
          >
            <Pie
              data={pieData}
              stroke="none"
              // cx={120} // position x
              // cy={200} // position y
              innerRadius={15}
              outerRadius={35}
              paddingAngle={1}
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={[palette.primary[800], palette.primary[300]][index]}
                />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">{MOCK.campaignsTargets.label1}</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              {MOCK.campaignsTargets.stat1}
            </Typography>
            <Typography variant="h6">{MOCK.campaignsTargets.desc1}</Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">{MOCK.campaignsTargets.label2}</Typography>
            <Typography variant="h6">{MOCK.campaignsTargets.desc2}</Typography>
            <Typography mt="0.4rem" variant="h5">
              {MOCK.campaignsTargets.label3}
            </Typography>
            <Typography variant="h6">{MOCK.campaignsTargets.desc3}</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      {/* PRODUCT PRICES VS EXPENSES */}
      <DashboardBox gridArea="f">
        <BoxHeader
          heading={MOCK.ProductPriceExpense.heading}
          stat={MOCK.ProductPriceExpense.stat}
        />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 30,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(v) => `$${v}`}
            />
            <Scatter
              name={MOCK.ProductPriceExpense.heading}
              data={productExpenses}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};
