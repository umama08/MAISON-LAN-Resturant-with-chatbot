import { generateRAGResponse } from './ragService.js';
import { retrieveContext } from './retriever.js';

async function test() {
  console.log("==================================================");
  console.log("MAISON ÉLAN RAG CHATBOT SYSTEM TEST");
  console.log("==================================================");

  const testQueries = [
    "What are your opening hours and location?",
    "Tell me about your signature pasta dish and its price",
    "What is included in L'Offre Maison combo?",
    "How can I reserve a table for dinner?"
  ];

  for (const query of testQueries) {
    console.log(`\n❓ USER QUERY: "${query}"`);
    console.log("--- RETRIEVING CONTEXT ---");
    const ctx = retrieveContext(query, 2);
    console.log(ctx.substring(0, 150) + "...\n");

    console.log("--- GENERATING RAG RESPONSE VIA GROQ ---");
    const result = await generateRAGResponse(query, []);
    console.log(`🤖 ASSISTANT (${result.modelUsed}):\n${result.answer}`);
    console.log("--------------------------------------------------");
  }
}

test().catch(console.error);
