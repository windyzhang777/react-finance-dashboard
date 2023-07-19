import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { CssBaseline } from "@mui/material";

export default function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">hello world</div>
    </ThemeProvider>
  );
}
