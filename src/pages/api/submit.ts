import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      throw new Error("Only POST method is allowed.");
    }

    const { answers } = req.body;
    
    if (!answers) {
      throw new Error("Answers are missing from the request.");
    }

    res.status(200).json({ message: "Success", data: answers });
    console.log("Questionnaire Response:", answers);
  } catch (error: any) {
    console.error("Error in /api/submit:", error.message);

    let statusCode = 500;
    if (error.message === "Only POST method is allowed.") statusCode = 405;
    if (error.message === "Answers are missing from the request.")
      statusCode = 400;

    res.status(statusCode).json({ message: error.message });
  }
};

export default handler;
