import { Box, styled } from "@mui/material";

export const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.moreBackground.light,
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.2rem 0.1rem 0.1rem rgba(0, 0, 0, .8)",
}));
