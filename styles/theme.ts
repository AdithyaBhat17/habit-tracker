import { Colors, extendTheme } from "@chakra-ui/react";

const colors: Colors = {
    imperialRed: '#E63946',
    prussianBlue: '#1D3557',
    celadonBlue: '#457B9D',
    powderBlue: '#A8DADC',
    honeyDew: '#f1faee',
    white: '#F6F7FB'
}
// brand: {
//     900: "#E63946",
//     800: "#1D3557",
//     700: "#457B9D",
//     600: "#A8DADC",
//     500: "#f1faee",
//     100: "#F6F7FB",
//   },

const fonts = {
    body: '"DM Sans", sans-serif',
    heading: '"DM Sans", sans-serif',
}

export const theme = extendTheme({
    colors,
    fonts,
    
})