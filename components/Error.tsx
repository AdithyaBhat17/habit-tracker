import { Flex, Heading, Text } from "@chakra-ui/layout";

type ErrorMessage = {
  message?: string;
};

interface ErrorProps {
  error: {
    message: string;
    errors: ErrorMessage[];
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
        {error?.message ||
          error?.errors[0]?.message ||
          "Oops... Something went wrong 😢"}
      </Text>
    </Flex>
  );
}

export default Error;
