import { User } from "@supabase/gotrue-js";
import { supabase } from "./supabase-admin";

interface UserDetails {
  user: User | null;
  data: User | null;
  error: Error | null;
}

export async function getUser(token: string): Promise<UserDetails> {
  return await supabase.auth.api.getUser(`Bearer ${token}`);
}
