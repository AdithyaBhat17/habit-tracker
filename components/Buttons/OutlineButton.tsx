import { Button, ButtonProps } from "@chakra-ui/button";
import { forwardRef } from "@chakra-ui/react";

const OutlineButton = forwardRef<ButtonProps, "button">((props, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      color="imperialRed"
      border="2px solid"
      borderColor="imperialRed"
      {...props}
    >
      {props.children}
    </Button>
  );
});

export default OutlineButton;
