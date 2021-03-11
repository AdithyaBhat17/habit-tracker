import { Colors, extendTheme } from "@chakra-ui/react";

const colors: Colors = {
  imperialRed: "#E63946",
  prussianBlue: "#031f99",
  celadonBlue: "#2453c6",
  powderBlue: "#A8DADC",
  honeyDew: "#f1faee",
  horizon: "#C3BDE0",
  white: "#F6F7FB",
};
// brand: {
//     900: "#E63946",
//     800: "#1D3557",
//     700: "#457B9D",
//     600: "#A8DADC",
//     500: "#f1faee",
//     100: "#F6F7FB",
//   },

const fonts = {
  body: "Poppins, sans-serif",
  heading: "Poppins, sans-serif",
};

export const theme = extendTheme({
  colors,
  fonts,
});

export const primaryButtonStates = {
  bg: colors.celadonBlue as string,
  color: "white",
};
