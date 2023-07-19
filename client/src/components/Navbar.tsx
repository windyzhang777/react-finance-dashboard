import { FlexBetween } from "@/components/FlexBetween";
import { TabLink } from "@/components/TabLink";
import PixIcon from "@mui/icons-material/Pix";
import { Typography, useTheme } from "@mui/material";
import { useState } from "react";

interface NavbarProps {}

export const Navbar = (props: NavbarProps) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");

  return (
    <FlexBetween mb={".25rem"} p={".5rem 0"} color={palette.grey[300]}>
      {/* ICON & HEADING */}
      <FlexBetween gap={".75rem"}>
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize={"1rem"}>
          Finance Dashboard
        </Typography>
      </FlexBetween>

      {/* TABS */}
      <FlexBetween gap={"2rem"}>
        <TabLink
          label="dashboard"
          selected={selected}
          setSelected={setSelected}
          to="/"
        />
        <TabLink
          label="predictions"
          selected={selected}
          setSelected={setSelected}
          to="/predictions"
        />
      </FlexBetween>
    </FlexBetween>
  );
};
