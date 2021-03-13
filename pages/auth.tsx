import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { supabase } from "../lib/supabase-client";
import { useUser } from "../lib/useUser";

function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user]);

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email } = event.target as EventTarget & {
      email: { value: string };
    };
    if (!email.value.trim()) {
      setMessage({ type: "error", text: "Nice try, genius 😏" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signIn({
      email: email.value,
    });
    setLoading(false);
    if (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to send magic link",
      });
      return;
    }
    setMessage({ type: "success", text: "Check your email for a magic link" });
  };

  return (
    <div>
      <Head>
        <title>Login / Signup </title>
      </Head>
      <Heading color="prussianBlue" size="md" my="10" textAlign="center">
        Continue with email
      </Heading>
      <Box
        bg="#fff"
        p={{ base: "10", md: "20" }}
        width={{ base: "100%", lg: "60%" }}
        mx="auto"
        borderRadius="10"
        boxShadow="2xl"
      >
        <form method="POST" onSubmit={handleAuth}>
          <FormControl>
            <FormLabel htmlFor="email" color="gray.600">
              Email
            </FormLabel>
            <Input
              type="email"
              id="email"
              disabled={loading}
              isRequired
              name="email"
              placeholder="name@domain.com"
            />
            <PrimaryButton
              isFullWidth
              isDisabled={loading}
              isLoading={loading}
              type="submit"
              mt="5"
            >
              GET MAGIC LINK
            </PrimaryButton>
            <FormHelperText
              color={message.type === "success" ? "green.700" : "imperialRed"}
            >
              {message.text}
            </FormHelperText>
          </FormControl>
        </form>
      </Box>
    </div>
  );
}

export default AuthPage;
