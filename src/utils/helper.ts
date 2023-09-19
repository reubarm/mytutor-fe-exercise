export function answerFeedback(answers: {
  [key: string]: string | string[];
}): string {
  const {
    "What kind of tutoring experience do you have?": tutoringType,
    "How much overall tutoring experience do you have?": tutoringDuration,
  } = answers;

  if (!tutoringType || !tutoringDuration) {
    return "Oops, you forgot to select some items";
  }

  const tutoringTypeStr = Array.isArray(tutoringType)
    ? tutoringType.join(", ")
    : tutoringType;
  const tutoringDurationStr = Array.isArray(tutoringDuration)
    ? tutoringDuration.join(", ")
    : tutoringDuration;

  if (tutoringTypeStr === "None" && tutoringDurationStr !== "None") {
    return "You've got great experience! Join us and expand your knowledge.";
  }

  if (tutoringTypeStr !== "None" && tutoringDurationStr === "None") {
    return "You've got the skills, now let's add the time!";
  }

  if (tutoringDurationStr && tutoringTypeStr === "None") {
    return "Everyone starts somewhere. Let's embark on your tutoring journey together.";
  }

  return "Awesome, let's keep up the hard work!";
}
