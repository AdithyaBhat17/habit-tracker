import { FormControl, FormHelperText } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { FormEvent, useRef, useState } from "react";
import { mutate } from "swr";
import { fetcher } from "../lib/fetcher";
import { theme } from "../styles/theme";
import { Habit } from "../types/habit";

function AddHabit({ user }: { user?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    const { habit } = event.target;
    if (!habit.value.trim()) {
      setError("Nice try genius 😒");
      return;
    }
    try {
      mutate(
        "/api/habits",
        async (habits: Habit[]) => {
          setLoading(true);
          const data = await fetcher({
            url: "/api/habit",
            body: { title: habit.value },
            token: user,
          });
          setLoading(false);
          if (data.id) {
            formRef.current?.reset();
            return [data, ...habits];
          } else {
            setError(data.message);
          }
          return habits;
        },
        false
      );
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <form method="POST" onSubmit={onSubmit} ref={formRef}>
      <FormControl mt="5" mb="8">
        <Input
          disabled={loading}
          aria-label="Add new habit"
          type="text"
          name="habit"
          onChange={() => error && setError("")}
          id="habit"
          background="#fff"
          border="none"
          _placeholder={{
            color: theme.colors.prussianBlue as string,
            fontSize: "0.85rem",
          }}
          placeholder="Add a new habit"
        />
        <FormHelperText color="imperialRed">{error}</FormHelperText>
      </FormControl>
    </form>
  );
}

export default AddHabit;
