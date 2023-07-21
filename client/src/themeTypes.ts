import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string;
    light: string;
  }

  interface Palette {
    tertiary: PaletteColor;
    moreBackground: PaletteColor;
  }
}
