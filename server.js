const express = require('express');
const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());

const contactsRoutes = require('./app/routes/contactRoutes');

app.use('/contacts', contactsRoutes);

// Root route (optional)
app.get('/', (req, res) => {
    res.send('Contacts API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
