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
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
