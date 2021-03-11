import { Button } from "@chakra-ui/button";
import { ButtonProps } from "./PrimaryButton";

function OutlineButton({ children, ...props }: ButtonProps) {
  return (
    <div>
      <Button
        variant="outline"
        color="imperialRed"
        border="2px solid"
        borderColor="imperialRed"
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}

export default OutlineButton;
