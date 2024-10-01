"use client";

import { askQuestion } from "@/lib/api";
import React from "react";

export default function Question() {
  const [value, setValue] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const answer = await askQuestion(value);
    setValue("");
    setAnswer(answer);
    setIsLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask ai a question"
          value={value}
          onChange={handleChange}
          className="border border-black/10"
        />
        <button type="submit">Ask</button>
      </form>
      <div>{isLoading ? "Answering.." : answer}</div>
    </div>
  );
}
