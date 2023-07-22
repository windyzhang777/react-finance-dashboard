import { BoxHeader } from "@/components/BoxHeader";
import { DashboardBox } from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueProps {}

const MOCK = {
  revenueExpenses: {
    heading: "Revenue & Expenses",
    stat: "+2%",
  },
  revenueProfit: {
    heading: "Revenue & Profit",
    desc: "Revenue (left) Profit (right)",
    stat: "+2%",
  },
  revenueByMonth: {
    heading: "Revenue By Month",
    stat: "+2%",
  },
};

export const Revenue = (props: RevenueProps) => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();

  const revenueExpenses = useMemo(
    () =>
      data &&
      data[0].monthlyData?.map(({ month, revenue, expenses }) => ({
        month: month.charAt(0).toUpperCase() + month.slice(1, 3),
        revenue: revenue,
        expenses: expenses,
      })),
    [data]
  );

  const revenueProfit = useMemo(
    () =>
      data &&
      data[0].monthlyData?.map(({ month, revenue, expenses }) => ({
        month: month.charAt(0).toUpperCase() + month.slice(1, 3),
        revenue: revenue,
        profit: (revenue - expenses).toFixed(2),
      })),
    [data]
  );

  const revenueByMonth = useMemo(
    () =>
      data &&
      data[0].monthlyData?.map(({ month, revenue }) => ({
        month: month.charAt(0).toUpperCase() + month.slice(1, 3),
        revenue: revenue,
      })),
    [data]
  );

  return (
    <>
      {/* REVENUE & EXPENSES */}
      <DashboardBox gridArea="a">
        <BoxHeader
          heading={MOCK.revenueExpenses.heading}
          stat={MOCK.revenueExpenses.stat}
        />
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
          >
            {/* fading gradient area color by id */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.grey[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.grey[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            {/* background grid */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="month"
              tickLine={false} // tick on axis
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={{ strokeWidth: "0" }} // axis line
              tickLine={false} // tick on axis
              style={{ fontSize: "10px" }}
              domain={[10000, 23000]}
            />
            <Tooltip />
            <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main} // area top line
              // fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.grey[300]}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* REVENUE & PROFIT */}
      <DashboardBox gridArea="b">
        <BoxHeader
          heading={MOCK.revenueProfit.heading}
          desc={MOCK.revenueProfit.desc}
          stat={MOCK.revenueProfit.stat}
        />
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart
            data={revenueProfit}
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
              dataKey="revenue"
              stroke={palette.primary.main}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* REVENUE */}
      <DashboardBox gridArea="c">
        <BoxHeader
          heading={MOCK.revenueByMonth.heading}
          stat={MOCK.revenueByMonth.stat}
        />
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart
            width={500}
            height={300}
            data={revenueByMonth}
            margin={{
              top: 20,
              right: 25,
              left: -5,
              bottom: 50,
            }}
          >
            {/* fading gradient area color by id */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};
