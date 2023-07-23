import { BoxHeader } from "@/components/BoxHeader";
import { DashboardBox } from "@/components/DashboardBox";
import { FlexBetween } from "@/components/FlexBetween";
import kpiJSON from "@/mock/kpi.json";
import { useGetKpisQuery } from "@/state/api";
import { Button, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";

export default function Predictions({}) {
  const { palette } = useTheme();
  const [isPrediction, setIsPrediction] = useState(false);
  const { data } = useGetKpisQuery();

  useEffect(() => {
    console.log(`loaded`);
  }, [data]);

  const MOCK = {
    heading: "Revenue & Predictions",
    desc: "charted revenue and predicted revenue based on linear regression model",
    button: `${isPrediction ? "hide" : "show"} predicted revenue for next year`,
  };

  const revenueData = useMemo(() => {
    if (!kpiJSON) return [];
    const monthlyData = kpiJSON && kpiJSON[0].monthlyData;
    const dataPoint: DataPoint[] = monthlyData.map(
      ({ revenue }, index: number) => [index, revenue]
    );
    const regressionLine = regression.linear(dataPoint);
    return monthlyData.map(({ month, revenue }, index: number) => ({
      month: month.charAt(0).toUpperCase() + month.slice(1, 3),
      "Actual Revenue": revenue,
      "Regression Line": regressionLine.points[index][1],
      "Predicted Revenue": regressionLine.predict(index + 12)[1],
    }));
  }, []);

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <BoxHeader heading={MOCK.heading} desc={MOCK.desc} />
        <Button
          onClick={() => setIsPrediction(!isPrediction)}
          sx={{
            color: palette.grey[900],
            backgroundColor: isPrediction
              ? palette.grey[700]
              : palette.primary.main,
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          {MOCK.button.toUpperCase()}
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={revenueData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="month" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[11000, 26000]}
            axisLine={{ strokeWidth: "0" }}
            tickFormatter={(v) => `$${v}`}
            style={{ fontSize: "10px" }}
          >
            <Label
              value="Revenue"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {isPrediction && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
}
