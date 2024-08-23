// Import the Pinecone client library
const { Pinecone } = require('@pinecone-database/pinecone');

// Initialize Pinecone with your API key and controller host URL
const pinecone = new Pinecone({
  apiKey: '75141db9-5607-4481-9257-3a23c937b91b', // Replace with your actual API key
  controllerHostUrl: 'https://rag-7qo9irv.svc.aped-4627-b74a.pinecone.io' // Replace with your actual host URL
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
const exampleQueryVector = [/* Your query vector here */];

// Call the function with the example query vector
queryIndex(exampleQueryVector);
