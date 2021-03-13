import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import AppContainer from "../components/AppContainer";
import Header from "../components/Header";
import { UserProvider } from "../lib/useUser";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppContainer>
        <UserProvider>
          <Header />
          <Component {...pageProps} />
        </UserProvider>
      </AppContainer>
    </ChakraProvider>
  );
}

export default MyApp;
