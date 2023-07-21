import { DashboardBox } from "@/components/DashboardBox";
import { Box, useMediaQuery } from "@mui/material";
import { Revenue } from "./Revenue";

interface DashboardProps {}

export const Dashboard = (props: DashboardProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      display={"grid"}
      gap={"1rem"}
      sx={{
        gridTemplateColumns: isLargeScreen
          ? "repeat(3, minmax(300px, 1fr))"
          : "1fr",
        gridAutoRows: "120px",
      }}
    >
      <Revenue />
      <DashboardBox bgcolor={"#fff"}></DashboardBox>
      <DashboardBox bgcolor={"#fff"}></DashboardBox>
      <DashboardBox bgcolor={"#fff"}></DashboardBox>
      <DashboardBox bgcolor={"#fff"}></DashboardBox>
      <DashboardBox bgcolor={"#fff"}></DashboardBox>
      <DashboardBox bgcolor={"#fff"}></DashboardBox>
      <DashboardBox bgcolor={"#fff"}></DashboardBox>
      <DashboardBox bgcolor={"#fff"}></DashboardBox>
    </Box>
  );
};
