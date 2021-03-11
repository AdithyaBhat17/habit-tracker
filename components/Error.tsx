import { Flex, Heading, Text } from "@chakra-ui/layout";

interface ErrorProps {
  error: {
    message: string;
    code: string;
  };
}

function Error({ error }: ErrorProps) {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      <Heading aria-label="poop error emoji" mb="2">
        💩
      </Heading>
      <Text color="imperialRed">
        {error?.message || error?.code || "Oops... Something went wrong 😢"}
      </Text>
    </Flex>
  );
}

export default Error;
