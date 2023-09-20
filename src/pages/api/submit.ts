import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST method is allowed." });
    return;
  }

  try {
    const { answers } = req.body;

    if (!answers || typeof answers !== "object") {
      throw new Error("Invalid or missing answers in the request.");
    }

    if (answers["testError"]) {
      throw new Error("Test error triggered!");
    }

    res.status(200).json({ message: "Success", data: answers });
    console.log("Questionnaire Response:", answers);
  } catch (error: any) {
    console.error("Error in /api/submit:", error.message);
    let statusCode = 500;
    if (error.message === "Invalid or missing answers in the request.") {
      statusCode = 400;
    } else if (error.message === "Test error triggered!") {
      statusCode = 400;
    }

    res.status(statusCode).json({ message: error.message });
  }
};

export default handler;