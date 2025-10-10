import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const { name, greeting } = await req.json();

    if (!name || !greeting) {
      return Response.json({ error: "Name and greeting are required." }, { status: 400 });
    }

    const store = getStore("user-greetings");

    await store.setJSON(name, { greeting });

    return Response.json({ success: true, message: `Greeting for ${name} saved.` });
  } catch (error) {
    console.error("Failed to process request:", error);
    return Response.json({ error: "Failed to parse or save data.", details: error.message }, { status: 500 });
  }
};
