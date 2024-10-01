import { z } from "zod";
import { OpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Entry } from "@prisma/client";
import { Document } from "langchain/document";

// Output for AI reply
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    subject: z
      .string()
      .describe(
        "Overall subject of the journal entry, keep it short, no longer than 4 words."
      ),
    summary: z.string().describe("Quick summary of the entire journal entry."),
    mood: z
      .string()
      .describe("The mood of the person who wrote the journal entry."),
    colour: z
      .string()
      .describe(
        "Provide a colour for the mood based on the journal entry, give a hexidecimal value - example #00000."
      ),
    negative: z
      .boolean()
      .describe(
        "Give a true or false output based on the journal entry being negative based on the emotive language in the entry."
      ),
  })
);

export const analyse = async (prompt: string) => {
  const chain = RunnableSequence.from([
    // Tells AI the format to output in its reply from journal entry
    PromptTemplate.fromTemplate(
      "Analyse the journal entry. Your reply must always match the output schema, do not divert from this!\n{format_instructions}\n{question}"
    ),
    new OpenAI({ temperature: 0, apiKey: process.env.OPENAI_API_KEY }),
    parser,
  ]);
  const response = await chain.invoke({
    question: prompt,
    format_instructions: parser.getFormatInstructions(),
  });
  return response;
};

// Vector DB to be used to save in memory
export const questionAnswer = (question: string, entries: Entry[]) => {
  // Convert every entry into a langchain document
  const docs = entries.map((entry) => {
    return new Document({
      // Documents page content will the content from our entry
      pageContent: entry.content,
      // Metadata to help with querying docs
      metadata: { id: entry.id, created: entry.createdAt },
    });
  });

  const model = new OpenAI({ temperature: 0 });
};
