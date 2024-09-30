import { z } from "zod";
import { OpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

// Output for AI reply
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    subject: z.string().describe("Overall subject of the journal entry, ."),
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
