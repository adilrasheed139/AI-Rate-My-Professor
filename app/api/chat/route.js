// Import Pinecone client
const { PineconeClient } = require('@pinecone-database/pinecone');

// Initialize Pinecone client
const client = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY,
  environment: 'us-east-1', // or your specific region
  // Any other required options
});

const indexName = 'your-index-name';

export async function POST(req) {
  try {
    const { vector } = await req.json();

    // Ensure `client.query` is the correct method for querying
    const result = await client.query({
      index: indexName,
      queryRequest: {
        vector: vector,
        topK: 10 // Number of top results to return
      }
    });

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
