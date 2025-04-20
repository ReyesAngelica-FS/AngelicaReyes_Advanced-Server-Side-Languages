// server.js

const express = require('express');
const app = express();
const PORT = 8080;

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Routes
const contactsRoutes = require('./routes/contactsRoutes');
app.use('/contacts', contactsRoutes);

app.get('/', (req, res) => {
    res.send('Contacts API is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
