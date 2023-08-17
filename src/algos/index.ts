const categories: string[] = [
  "age",
  "alone",
  "amazing",
  "anger",
  "architecture",
  "art",
  "attitude",
  "beauty",
  "best",
  "birthday",
  "business",
  "car",
  "change",
  "communications",
  "computers",
  "cool",
  "courage",
  "dad",
  "dating",
  "death",
  "design",
  "dreams",
  "education",
  "environmental",
  "equality",
  "experience",
  "failure",
  "faith",
  "family",
  "famous",
  "fear",
  "fitness",
  "food",
  "forgiveness",
  "freedom",
  "friendship",
  "funny",
  "future",
  "god",
  "good",
  "government",
  "graduation",
  "great",
  "happiness",
  "health",
  "history",
  "home",
  "hope",
  "humor",
  "imagination",
  "inspirational",
  "intelligence",
  "jealousy",
  "knowledge",
  "leadership",
  "learning",
  "legal",
  "life",
  "love",
  "marriage",
  "medical",
  "men",
  "mom",
  "money",
  "morning",
  "movies",
  "success",
];

const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface Statistics {
  words: number;
  characters: number;
  sentences: number;
  paragraphs: number;
  pronouns: number;
  averageReadingTime: number;
  longestWord: string;
}

const countStatistics = (text: string): Statistics => {
  const wordsArray = text.match(/[A-Za-z]+/g);
  const words = wordsArray ? wordsArray.length : 0;
  const characters = text.length;
  const sentences = text
    .split(/[.!?]/)
    .filter((sentence) => sentence.trim() !== "").length;
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim() !== "").length;

  const pronouns = (
    text.match(
      /\b(he|she|they|it|we|you|I|me|him|her|them|us|my|your|his|their)\b/gi
    ) || []
  ).length;

  const averageReadingTime = Math.ceil(words / 200); // in minutes

  const longestWord = wordsArray
    ? wordsArray.reduce(
        (longest, current) =>
          current.length > longest.length ? current : longest,
        ""
      )
    : "";

  return {
    words,
    characters,
    sentences,
    paragraphs,
    pronouns,
    averageReadingTime,
    longestWord,
  };
};

const truncate = (str: string, n: number, dots = true): string => {
  return str.length > n ? str.substr(0, n - 1) + (dots ? "..." : "") : str;
};

export { categories, generateUUID as uuid, countStatistics, truncate };
