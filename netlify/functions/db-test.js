import { createClient } from "@supabase/supabase-js";

export default async () => {
  // Get your Supabase credentials from Netlify's environment variables
  const supabaseUrl = Netlify.env.get("SUPABASE_URL");
  const supabaseKey = Netlify.env.get("SUPABASE_SERVICE_KEY");

  // If the variables aren't set, return an error
  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: "Supabase environment variables are not set." }, { status: 500 });
  }

  // Create the Supabase client. This client has admin privileges.
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Fetch all rows from the 'employees' table.
    const { data, error } = await supabase.from("employees").select("*");

    // If Supabase returned an error, forward it.
    if (error) {
      throw error;
    }

    // Return the data successfully.
    return Response.json({ employees: data });
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
    return Response.json({ error: "Failed to fetch data.", details: error.message }, { status: 500 });
  }
};
