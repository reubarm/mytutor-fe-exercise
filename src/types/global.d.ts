type Question = {
  id: number;
  text?: string;
  question: string;
  type: "checkbox" | "radio";
  options: string[];
};
