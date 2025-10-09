const handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  return {
    statusCode: 200,
    body: "good",
  };
};

export { handler };
