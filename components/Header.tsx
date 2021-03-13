import { Button } from "@chakra-ui/button";
import { Flex, Heading } from "@chakra-ui/layout";
import { useState } from "react";
import { supabase } from "../lib/supabase-client";

function Header() {
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };
  return (
    <Flex as="header" justifyContent="space-between" alignItems="center">
      <Heading color="prussianBlue">Habit Tracker</Heading>
      <Button variant="link" onClick={logout}>
        {loading ? "Logging out.." : "Logout"}
      </Button>
    </Flex>
  );
}

export default Header;
