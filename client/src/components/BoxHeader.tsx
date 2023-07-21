import { Box, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "@/components/FlexBetween";

interface BoxHeaderProps {
  icon?: string;
  heading: string;
  desc: string;
  stat: string;
}

export const BoxHeader = ({ icon, heading, desc, stat }: BoxHeaderProps) => {
  const { palette } = useTheme();

  return (
    <FlexBetween color={palette.grey[400]} m={"1.5rem 1rem 0 1rem"}>
      <FlexBetween>
        {icon}
        <Box>
          <Typography variant="h4">{heading}</Typography>
          <Typography variant="h6">{desc}</Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
        {stat}
      </Typography>
    </FlexBetween>
  );
};
