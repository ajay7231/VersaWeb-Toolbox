import React, { useEffect, useState, lazy, Suspense } from "react";
import { countStatistics, truncate } from "../algos";
import Loader from "../components/Loader";

// Lazy-loaded components
const Header = lazy(() => import("../components/TextAnalyzer/Header"));
const Footer = lazy(() => import("../components/TextAnalyzer/Footer"));
const TextArea = lazy(() => import("../components/TextAnalyzer/TextArea"));

const Textanalyzer = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    pronouns: 0,
    averageReadingTime: 0,
    longestWord: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setStats(countStatistics(text));
  }, [text]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Suspense fallback={<Loader />}>
        <Header
          words={stats.words}
          characters={stats.characters}
          sentences={stats.sentences}
          paragraphs={stats.paragraphs}
          pronouns={stats.pronouns}
        />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <TextArea handleChange={changeHandler} value={text} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Footer
          readTime={stats.averageReadingTime}
          longestWord={truncate(stats.longestWord, 15)}
        />
      </Suspense>
    </div>
  );
};

export default Textanalyzer;
