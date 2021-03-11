import { Button, ButtonOptions } from "@chakra-ui/button";
import { primaryButtonStates } from "../../styles/theme";

export interface ButtonProps extends ButtonOptions {
  children: JSX.Element | string;
  [key: string]: any | undefined;
}

function PrimaryButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      _hover={primaryButtonStates}
      _focus={primaryButtonStates}
      _active={primaryButtonStates}
      color="white"
      bg="prussianBlue"
      {...props}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
