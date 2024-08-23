'use client';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

export default function Home() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
        },
    ]);
    const [message, setMessage] = useState('');

    // Mock function to generate an embedding vector
    const generateEmbedding = (text) => {
        // Replace with actual embedding generation logic when available
        return new Array(768).fill(0); // Mock vector of size 768
    };

    const sendMessage = async () => {
        if (!message.trim()) return; // Ignore empty messages

        // Update local state with the user's message
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content: message },
            { role: 'assistant', content: '' },
        ]);
        setMessage('');

        try {
            const embedding = generateEmbedding(message); // Generate embedding from the message

            // Make the request to the API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embedding: embedding,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            // Read the response
            const data = await response.json();

            // Update the assistant's message with the response
            setMessages((prevMessages) => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                return [
                    ...prevMessages.slice(0, -1),
                    { ...lastMessage, content: data.error ? data.error : JSON.stringify(data) },
                ];
            });

        } catch (error) {
            console.error('Fetch error:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
            ]);
        }
    };

    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                direction={'column'}
                width="500px"
                height="700px"
                border="1px solid black"
                p={2}
                spacing={3}
            >
                <Stack
                    direction={'column'}
                    spacing={2}
                    flexGrow={1}
                    overflow="auto"
                    maxHeight="100%"
                >
                    {messages.map((msg, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
                        >
                            <Box
                                bgcolor={msg.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                                color="white"
                                borderRadius={16}
                                p={3}
                            >
                                {msg.content}
                            </Box>
                        </Box>
                    ))}
                </Stack>
                <Stack direction={'row'} spacing={2}>
                    <TextField
                        label="Message"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button variant="contained" onClick={sendMessage}>
                        Send
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
