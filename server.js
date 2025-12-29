const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'), {
    extensions: ['html', 'htm'],
    index: 'index.html'
}));

// Fallback to index.html for SPA support (client-side routing)
// This allows frameworks like React Router to handle routes
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(404).send('404 - Page Not Found');
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Static file server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, 'public')}`);
});
