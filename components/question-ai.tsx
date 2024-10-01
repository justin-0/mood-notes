"use client";

import { newQuestion } from "@/lib/api";
import React from "react";

export default function Question() {
  const [value, setValue] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await newQuestion(value);
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
    </div>
  );
}
