import { useCallback, useEffect, useState } from "react";

export const TextMetrics = () => {
  const [text, setText] = useState("");
  const [metrics, setMetrics] = useState({});

  const resetMetrics = () => {
    setMetrics({
      words: 0,
      characters: 0,
      sentences: 0,
      paragraphs: 0,
      readabilityScore: 0,
      readingTime: 0,
    });
  };

  const analyzeText = useCallback((value) => {
    try {
      if (!value) return;

      //words
      const _words = value.match(/\b(\w+)\b/g);
      //sentences
      const _sentences = value.split(/[.!?]+\s/).filter((val) => val.trim());
      //paragraphs
      const _paragraphs = value.split(/\n\n+/).filter((val) => val.trim());

      setMetrics({
        words: _words?.length || 0,
        characters: value.length || 0,
        sentences: _sentences?.length || 0,
        paragraphs: _paragraphs.length,
        readabilityScore: 0,
        readingTime: 0,
      });

      console.log({
        value,
        words: _words,
        sentences: _sentences,
        paragraphs: _paragraphs,
      });
    } catch (e) {
      console.log("error occured while analyzing text", e);
      resetMetrics();
    }
  }, []);

  useEffect(() => {
    if (!text) {
      resetMetrics();
      return;
    }
    analyzeText(text);
  }, [text, analyzeText]);

  const handleTextChange = (value) => {
    setText(value);
  };

  return (
    <div className="p-4">
      <p className="text-2xl font-bold underline mb-2">Text Metrics</p>
      <p className="text-xs mb-2">Type or paste text below to analyze it</p>
      <textarea
        name="mtext"
        id="mtext"
        rows={10}
        cols={100}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        className="border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 p-4"
      />
      {/* Metrics Area */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="flex align-middle items-center gap-2">
          <p className="text-gray-700">Characters:</p>
          <p className="text-4xl font-bold text-zinc-300">
            {metrics?.characters || 0}
          </p>
        </div>
        <div className="flex align-middle items-center gap-2">
          <p className="text-gray-700">Words:</p>
          <p className="text-4xl font-bold text-zinc-300">
            {metrics?.words || 0}
          </p>
        </div>
        <div className="flex align-middle items-center gap-2">
          <p className="text-gray-700">Sentences:</p>
          <p className="text-4xl font-bold text-zinc-300">
            {metrics?.sentences || 0}
          </p>
        </div>
        <div className="flex align-middle items-center gap-2">
          <p className="text-gray-700">Paragraphs:</p>
          <p className="text-4xl font-bold text-zinc-300">
            {metrics?.paragraphs || 0}
          </p>
        </div>
        <div className="flex align-middle items-center gap-2">
          <p className="text-gray-700">Reading Time:</p>
          <p className="text-4xl font-bold text-zinc-300">
            {metrics?.readingTime || 0}
          </p>
        </div>
        <div className="flex align-middle items-center gap-2">
          <p className="text-gray-700">Readability Score:</p>
          <p className="text-4xl font-bold text-zinc-300">
            {metrics?.readabilityScore || 0}
          </p>
        </div>
      </div>
    </div>
  );
};
