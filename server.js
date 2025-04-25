const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

// Import and use the routes
const contactRoutes = require('./app/routes/contactRoutes'); 

app.use('/contacts', contactRoutes);

// Root route (optional)
app.get('/', (req, res) => {
    res.send('Contacts API is running!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
