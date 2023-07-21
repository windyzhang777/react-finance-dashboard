import { Navbar } from "@/components/Navbar";
import { themeSettings } from "@/theme";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./scenes/dashboard";

export default function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Box width={"100%"} height={"100%"} p={"1rem 2rem 4rem 2rem"}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<div>predictions</div>} />
            </Routes>
          </Box>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
