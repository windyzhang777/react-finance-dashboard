import { BoxHeader } from "@/components/BoxHeader";
import { DashboardBox } from "@/components/DashboardBox";
import kpisJSON from "@/mock/kpis.json";
import { useGetKpisQuery } from "@/state/api";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
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
  const { data } = useGetKpisQuery();

  console.log(`data :`, data || kpisJSON);
  const revenues = useMemo(
    () =>
      kpisJSON?.[0].monthlyData?.map(({ month, revenue, expenses }) => ({
        month: month.charAt(0).toUpperCase() + month.slice(1, 3),
        revenue: revenue,
        expenses: expenses,
      })),
    []
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
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};
