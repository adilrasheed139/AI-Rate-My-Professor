<<<<<<< HEAD
import fetch from 'node-fetch';

// Define your API key here or load it from environment variables
const COHERE_API_KEY = "qDXEnu9uDsvelcsG98MaHcbTpAY204EfYhOuFPwo";

// Define the correct Cohere API endpoint
const endpoint = 'https://api.cohere.com/v1/generate';

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // Validate the prompt input
    if (!prompt || prompt.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Prompt cannot be empty." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Make the API request to Cohere
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'command-xlarge-nightly',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.7,
        k: 0,
        stop_sequences: [],
      })
    });

    const result = await response.json();

    // Return the result from Cohere
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
=======
import { Pinecone } from '@pinecone-database/pinecone';
import fetch from 'node-fetch';

// Set global fetch implementation
globalThis.fetch = fetch;

export async function POST(req) {
  try {
    // Initialize Pinecone client
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    // Access the Pinecone index
    const index = pc.Index('rag');

    // Extract and log the request body
    const body = await req.json();
    console.log('Received request body:', body);

    const vector = body.embedding;

    // Validate vector
    if (!Array.isArray(vector) || vector.length !== 768) {
      console.error('Invalid vector format:', vector);
      return new Response('Invalid vector format', { status: 400 });
    }

    if (!vector.every(val => typeof val === 'number')) {
      console.error('Vector contains non-numeric values:', vector);
      return new Response('Vector contains non-numeric values', { status: 400 });
    }

    // Log received vector
    console.log('Received vector:', vector);

    // Perform query using the received vector
    try {
      const queryResponse = await index.query({
        vector,
        topK: 3,
      });

      // Log and return the query results
      console.log('Query response:', queryResponse);
      return new Response(JSON.stringify(queryResponse), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (queryError) {
      console.error('Query failed:', queryError.message);
      return new Response('Query failed', { status: 500 });
    }

>>>>>>> d41bcffa6fc3e8b1c5f871653303566bdf0b0a97
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack trace:', error.stack);
    return new Response('Internal Server Error', { status: 500 });
  }
}
