import { BoxHeader } from "@/components/BoxHeader";
import { DashboardBox } from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueProps {}

const MOCK = {
  heading: "Revenue & Expenses",
  desc: "revenue (top line, expenses (bottom line)",
  stat: "+2%",
};

export const Revenue = (props: RevenueProps) => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();

  const revenues = useMemo(
    () =>
      data &&
      data[0].monthlyData?.map(({ month, revenue, expenses }) => ({
        month: month.charAt(0).toUpperCase() + month.slice(1, 3),
        revenue: revenue,
        expenses: expenses,
      })),
    [data]
  );

  return (
    <DashboardBox gridArea="a">
      <BoxHeader heading={MOCK.heading} desc={MOCK.desc} stat={MOCK.stat} />
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart
          width={500}
          height={400}
          data={revenues}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 60,
          }}
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
                stopColor={palette.primary[300]}
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor={palette.primary[300]}
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
            stroke={palette.primary.main}
            fillOpacity={1}
            fill="url(#colorExpenses)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};
