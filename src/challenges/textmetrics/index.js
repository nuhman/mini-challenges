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
      readingTime: 0,
      readability: {
        score: 0,
        indicatorColor: "",
        note: "",
      },
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

      // total time required to read the text (in minutes & seconds)
      //calculations assume that the average reading speed of an adult is 200 words per minute
      const totalMinsRequired = (_words?.length || 0) / 200;
      const readingTime = `${Math.floor(totalMinsRequired)}m:${(
        (totalMinsRequired * 60) %
        60
      ).toFixed(1)}s`;

      setMetrics({
        words: _words?.length || 0,
        characters: value.length || 0,
        sentences: _sentences?.length || 0,
        paragraphs: _paragraphs.length,
        readability: {
          score: 0,
          indicatorColor: "",
          note: "",
        },
        readingTime,
      });
    } catch (e) {
      console.error("error occured while analyzing text", e);
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

  const getWordSyllableCount = (word) => {
    if (!word) return 0;
    if (word.length <= 3) return 1;
    word = word.toLowerCase();
    // remove silent 'e' or 'es'
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
    // remove initial 'y'
    word = word.replace(/^y/, "");
    const syllableMatches = word.match(/[aeiouy]{1,2}/g);
    return syllableMatches ? syllableMatches.length : 0;
  };

  const getReadabilityNoteAndColor = (score) => {
    const thresholds = [
      { max: 10, note: "Extremely difficult to read", color: "text-red-900" },
      { max: 30, note: "Very difficult to read", color: "text-red-700" },
      { max: 50, note: "Difficult to read", color: "text-red-500" },
      { max: 60, note: "Fairly difficult to read", color: "text-red-400" },
      { max: 70, note: "Plain English", color: "text-lime-300" },
      { max: 80, note: "Fairly easy to read", color: "text-lime-500" },
      { max: 90, note: "Easy to read", color: "text-lime-700" },
      { max: 100, note: "Very easy to read", color: "text-lime-800" },
    ];
    const defaultThreshold = {
      note: "Very easy to read",
      color: "text-lime-800",
    };
    return (
      thresholds.find((threshold) => score <= threshold.max) || defaultThreshold
    );
  };

  const getTextReadability = () => {
    const { words, sentences } = metrics;

    if (!text || !words || !sentences) {
      alert("Empty or Invalied Text");
      return;
    }

    // First, let's get a rough heuristic estimate of total syllables (not completely accurate)
    // We need to check each word whether it is a syllable
    const wordsList = text.match(/\b(\w+)\b/g);

    let totalSyllables = 0;
    (wordsList ?? []).forEach((word) => {
      const syllablesInWord = getWordSyllableCount(word);
      totalSyllables += syllablesInWord;
    });


    //Using 'Flesch Reading Ease' formula for calculating the readability score. The score rates the text on 100-point scale.
    //the higher the score easier it is to read
    // Formula: 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
    const readabilityScore =
      206.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words);

    let { note: readabilityNote, color: indicatorColor } =
      getReadabilityNoteAndColor(readabilityScore);

    setMetrics({
      ...metrics,
      readability: {
        score: readabilityScore > 0 ? readabilityScore.toFixed(2) : 0,
        note: readabilityNote,
        indicatorColor,
      },
    });
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
      </div>
      <div className="mt-8 flex align-middle items-center gap-2">
        {metrics?.readability?.note ? (
          <div className="flex align-middle items-center gap-12">
            <div className="flex flex-col">
              <p className="text-sm font-light text-zinc-600 text-center">
                Reading Score
              </p>
              <p
                className={`text-4xl font-bold ${metrics.readability.indicatorColor}`}
              >
                {metrics.readability.score}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-light text-zinc-600 text-center">
                Reading Note
              </p>
              <p
                className={`text-4xl font-bold ${metrics.readability.indicatorColor}`}
              >
                {metrics.readability.note}
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={getTextReadability}
            className="bg-neutral-300 rounded-md hover:bg-neutral-400 round p-4 pt-2 pb-2 text-gray-700"
          >
            Calculate Readability Score
          </button>
        )}
      </div>
    </div>
  );
};
