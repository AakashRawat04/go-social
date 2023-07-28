import { createClient, SupabaseClient } from '@supabase/supabase-js';
import config from '@/config';

let database: SupabaseClient;

async function initializeClient() {
  const supabase = createClient(config.SUPABASE.URL, config.SUPABASE.KEY);

  return supabase;
}

export const db = async () => {
  if (!database) {
    database = await initializeClient();
  }
  return database;
};
