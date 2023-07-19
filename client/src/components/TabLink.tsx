import { Box, useTheme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface TabLinkProps {
  label: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  to: string;
}

export const TabLink = ({ label, selected, setSelected, to }: TabLinkProps) => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        "&:hover": { color: palette.primary[100] },
      }}
    >
      <Link
        to={to}
        onClick={() => setSelected(label)}
        style={{
          color: selected === label ? "inherit" : palette.grey[700],
          textDecoration: "inherit",
        }}
      >
        {label}
      </Link>
    </Box>
  );
};
