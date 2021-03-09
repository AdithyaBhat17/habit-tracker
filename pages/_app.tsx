import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import AppContainer from "../components/AppContainer";
import Header from "../components/Header";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppContainer>
        <Header />
        <Component {...pageProps} />
      </AppContainer>
    </ChakraProvider>
  );
}

export default MyApp;
