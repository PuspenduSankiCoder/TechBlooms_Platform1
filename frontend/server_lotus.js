const express = require('express');
const path = require('path');
const app = express();

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Lotus page route
app.get('/lotus', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lotus-animation.html'));
});

// Transition route
app.get('/transition', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'transition-animation.html'));
});

// React app route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});