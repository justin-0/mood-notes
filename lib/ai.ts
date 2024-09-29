import { z } from "zod";
import { OpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    subject: z.string().describe("Overall subject of the journal entry"),
    summary: z.string().describe("Summarise the journal entry"),
    mood: z
      .string()
      .describe("Provide a colour for the mood based on the journal entry"),
    negative: z
      .boolean()
      .describe(
        "Give a true or false boolean based on the journal entry being negative sentiment"
      ),
  })
);

export const analyse = async (prompt: string) => {
  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      "Answer the users question as best as possible.\n{format_instructions}\n{question}"
    ),
    new OpenAI({ temperature: 0, apiKey: process.env.OPENAI_API_KEY }),
    parser,
  ]);
  const response = await chain.invoke({
    question: prompt,
    format_instructions: parser.getFormatInstructions(),
  });
  console.log(response);
};
