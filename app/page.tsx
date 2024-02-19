"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";

const PlagiarismDetection: React.FC = () => {
  const [document1, setDocument1] = useState<string>("");
  const [document2, setDocument2] = useState<string>("");
  const [similarityPercentage, setSimilarityPercentage] = useState<number>(0);

  const calculateSimilarity = () => {
    const lcsLength = longestCommonSubsequence(document1, document2);
    const maxLength = Math.max(document1.length, document2.length);
    const percentage = (lcsLength / maxLength) * 100;
    setSimilarityPercentage(percentage);
  };

  const longestCommonSubsequence = (text1: string, text2: string): number => {
    const m = text1.length;
    const n = text2.length;
    const dp: number[][] = [];

    // Initialize dp array
    for (let i = 0; i <= m; i++) {
      dp[i] = [];
      for (let j = 0; j <= n; j++) {
        dp[i][j] = 0;
      }
    }

    // Fill dp array
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (text1[i - 1] === text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp[m][n];
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Plagiarism Detection System
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">Document 1</h2>
            <textarea
              value={document1}
              onChange={(e) => setDocument1(e.target.value)}
              className="w-full h-48 p-4 bg-gray-700 border border-gray-600 rounded shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Document 2</h2>
            <textarea
              value={document2}
              onChange={(e) => setDocument2(e.target.value)}
              className="w-full h-48 p-4 bg-gray-700 border border-gray-600 rounded shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
        </div>
        <button
          onClick={calculateSimilarity}
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
            padding: "12px 24px",

            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
            fontFamily: "Montserrat, sans-serif",
          }}
          className="btn btn-blue mt-6 mx-auto block"
        >
          Calculate Similarity
        </button>

        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Similarity Percentage</h2>
          <p className="text-2xl font-bold">
            {similarityPercentage.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismDetection;
