import type { NextApiRequest, NextApiResponse } from "next";

const questions: Question[] = [
  {
    id: 1,
    question: "What kind of tutoring experience do you have?",
    options: ["Online tutoring", "Home schooling", "After school club", "None"],
    type: "checkbox",
  },
  {
    id: 2,
    question: "How much overall tutoring experience do you have?",
    options: ["0-1 years", "1-2 years", "3 or more", "None"],
    type: "radio",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(questions);
}
