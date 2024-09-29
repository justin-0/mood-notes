import { OpenAI } from "@langchain/openai";

export const analyse = async (prompt: string) => {
  const model = new OpenAI({
    model: "gpt-3.5-turbo-instruct",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const reply = await model.invoke(prompt);
  console.log(reply);
};
