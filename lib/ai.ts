import { z } from "zod";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Entry } from "@prisma/client";
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

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

export const questionAnswer = async (question: string, entries: Entry[]) => {
  try {
    console.log("ENTRY AI FILES", entries);

    // Convert entries to Documents
    const docs = entries.map((entry) => {
      console.log("DOCS MAP ARRAY", entry);
      return new Document({
        pageContent: entry.content,
        metadata: { id: entry.id, created: entry.createdAt },
      });
    });
    console.log("DOCS", docs);
    const model = new OpenAI({ temperature: 0 });
    const chain = loadQARefineChain(model);
    const embeddings = new OpenAIEmbeddings();
    // Create vector store
    console.log("Creating vector store...");
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
    console.log("STORE created successfully");

    // Perform similarity search
    console.log("Performing similarity search...");
    const relevantDocs = await store.similaritySearch(question);
    console.log("RELEVANT DOCS", relevantDocs);

    if (relevantDocs.length === 0) {
      console.warn("No relevant documents found for the question.");
      return {
        text: "I couldn't find any relevant information to answer your question.",
      };
    }

    // Invoke the chain
    console.log("Invoking chain...");
    const res = await chain.invoke({
      input_documents: relevantDocs,
      question,
    });
    console.log("RESPONSE", res);

    return res;
  } catch (error) {
    console.error("Error in questionAnswer function:", error);
    throw error;
  }
};
