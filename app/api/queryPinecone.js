import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone with your API key and controller host URL
const pinecone = new Pinecone({
  apiKey: 'qpwuqrfHopSaVCHuh8EpD8sOJmtGn57k9mI1vKIW', // Replace with your actual API key
  controllerHostUrl: 'https://api.cohere.ai/generate' // Replace with your actual host URL
});

// Define the index name
const indexName = 'rag'; // Replace with your actual index name

// Get the index object
const index = pinecone.Index(indexName);

// Function to query the Pinecone index
async function queryIndex(queryVector) {
  try {
    const queryResult = await index.query({
      vector: queryVector,
      topK: 10 // Number of top results to retrieve
    });
    console.log('Query results:', queryResult);
  } catch (error) {
    console.error('Error querying Pinecone:', error);
  }
}

// Example vector to query
const exampleQueryVector = [0.1, 0.2, 0.3, 0.4, 0.5]; // Replace with your actual query vector

// Call the function with the example query vector
queryIndex(exampleQueryVector);
