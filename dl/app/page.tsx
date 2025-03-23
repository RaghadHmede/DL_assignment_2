"use client";

import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(false);
  const [sentence, setSentence] = useState(""); // Store the full sentence

  const fetchPrediction = async () => {
    if (!word1 || !word2) return;

    setLoading(true);

    const response = await fetch(
      "https://5377-34-142-153-9.ngrok-free.app/predict/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word1, word2 }),
      }
    );

    const data = await response.json();
    setPredictions(data);
    setLoading(false);
  };

  const handleWordClick = (word: string) => {
    setSentence(`${word1} ${word2} ${word}`);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="First Word"
        value={word1}
        onChange={(e) => setWord1(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Second Word"
        value={word2}
        onChange={(e) => setWord2(e.target.value)}
        className="input"
      />
      <button onClick={fetchPrediction} className="button">
        Predict Next Word
      </button>

      {loading && <div>Loading...</div>}

      <ul className="list">
        {Object.keys(predictions).length > 0 ? (
          Object.keys(predictions).map((word) => (
            <li
              key={word}
              className="listItem"
              onClick={() => handleWordClick(word)}
            >
              {word}
            </li>
          ))
        ) : (
          <li className="listItem">No results found</li>
        )}
      </ul>

      {sentence && <h2 className="sentence">{sentence}</h2>}
    </div>
  );
}
