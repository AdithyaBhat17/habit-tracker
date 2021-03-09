import { Flex } from "@chakra-ui/layout";

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

function AppContainer({ children }: ContainerProps) {
  return (
    <Flex
      direction="column"
      px={{ base: 5, md: 10, lg: 64 }}
      py={{ base: 5, md: 10 }}
    >
      {children}
    </Flex>
  );
}

export default AppContainer;
