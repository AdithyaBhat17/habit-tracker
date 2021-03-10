import { Flex } from "@chakra-ui/layout";
import Lottie, { Options } from "react-lottie";
import animationData from "../lotties/44298-coffee-love.json";

const options: Options = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Loading() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="60vh"
    >
      <Lottie options={options} height={150} width={150} />
    </Flex>
  );
}

export default Loading;
