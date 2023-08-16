export const quotes = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote:
      "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
  },
  {
    quote:
      "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
  },
  {
    quote:
      "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph Waldo Emerson",
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    quote: "The only thing we have to fear is fear itself.",
    author: "Franklin D. Roosevelt",
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha",
  },
  {
    quote:
      "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
  },
  {
    quote: "To succeed in life, you need two things: ignorance and confidence.",
    author: "Mark Twain",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    quote: "A journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
  },
  {
    quote:
      "Happiness is not something readymade. It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    quote:
      "The only thing standing between you and your dream is the will to try and the belief that it is actually possible.",
    author: "Joel Brown",
  },
  {
    quote:
      "Success is stumbling from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll",
  },
  {
    quote: "We may encounter many defeats but we must not be defeated.",
    author: "Maya Angelou",
  },
  {
    quote:
      "The only thing you can do in this world is to play your own game in your own way and to the best of your ability.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "A ship is always safe at the shore but that is not what it is built for.",
    author: "Albert Einstein",
  },
  {
    quote:
      "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
];

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const countStatistics = (text: string) => {
  // Count words
  const words = text.split(/\s+/).filter((word) => word !== "").length;

  // Count characters (including spaces)
  const characters = text.length;

  // Count sentences (assuming sentences end with '.', '!', or '?')
  const sentences = text
    .split(/[.!?]/)
    .filter((sentence) => sentence !== "").length;

  // Count paragraphs (assuming paragraphs are separated by double line breaks)
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph !== "").length;

  // Count pronouns (a simple list of common pronouns for demonstration)
  const pronouns = (
    text.match(
      /\b(he|she|they|it|we|you|I|me|him|her|them|us|my|your|his|their)\b/gi
    ) || []
  ).length;

  const averageReadingTime = Math.ceil(words / 200); // in minutes

  // Find the longest word
  const wordsArray = text.match(/[A-Za-z]+/g);

  const longestWord =
    wordsArray?.reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      ""
    ) || "";

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

// add ... to the end of the string if it's too long
export const truncate = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};
