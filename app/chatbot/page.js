'use client';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function Home() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `Hi! I'm the ai assistant. How can I help you today?`,
        },
    ]);
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        if (!message.trim()) return;
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content: message },
            { role: 'assistant', content: '...' },
        ]);
        setMessage('');

        try {
            // Make the request to the API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: message }),
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            const data = await response.json();
            const assistantMessage = data.generations[0]?.text?.trim() || 'Sorry, I could not generate a response.';

            setMessages((prevMessages) => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                return [
                    ...prevMessages.slice(0, -1),
                    { ...lastMessage, content: assistantMessage },
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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
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
            sx={{
                background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)', // Adjust gradient colors
            }}
        >
            <Typography variant="h2" color="white" mb={3}>
               Ai Assistant
            </Typography>
            <Box
                width="60%"
                maxWidth="600px"
                height="70%"
                bgcolor="#f0f8ff" // Light background
                borderRadius={16}
                p={3}
                boxShadow={3}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Stack
                    direction="column"
                    spacing={2}
                    flexGrow={1}
                    overflow="auto"
                    sx={{ maxHeight: '100%', paddingBottom: 2 }}
                >
                    {messages.map((msg, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
                        >
                            <Box
                                bgcolor={msg.role === 'assistant' ? '#e0f7fa' : '#00796b'}
                                color={msg.role === 'assistant' ? 'black' : 'white'}
                                borderRadius={12}
                                p={2}
                                maxWidth="80%"
                            >
                                {msg.content}
                            </Box>
                        </Box>
                    ))}
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown} // Handle Enter key
                        sx={{ bgcolor: 'white', borderRadius: 2 }}
                    />
                    <Button
                        variant="contained"
                        onClick={sendMessage}
                        sx={{
                            bgcolor: '#00796b',
                            color: 'white',
                            textTransform: 'none',
                            borderRadius: 2,
                            minWidth: '80px',
                        }}
                    >
                        Send
                    </Button>
                </Stack>
            </Box>
            <Button
                variant="contained"
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    backgroundColor: '#00695c',
                    borderRadius: 16,
                }}
            >
                Feedback
            </Button>
        </Box>
    );
}
