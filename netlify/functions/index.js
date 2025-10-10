import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  if (req.method !== "GET") {
    return Response.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  return new Response("Hello world!", { status: 200 });
};
