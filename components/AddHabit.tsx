import { Input } from "@chakra-ui/input";
import { theme } from "../styles/theme";

function AddHabit() {
  return (
    <form method="POST">
      <Input
        my="5"
        aria-label="Add new habit"
        type="text"
        background="#fff"
        border="none"
        _placeholder={{
          color: theme.colors.prussianBlue as string,
          fontSize: "0.85rem",
        }}
        placeholder="Enter a new habit"
      />
    </form>
  );
}

export default AddHabit;
