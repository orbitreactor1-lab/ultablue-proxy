const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Serve the static frontend assets from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple proxy route directly to the target search index
app.use('/search', createProxyMiddleware({
    target: 'https://duckduckgo.com',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
        '^/search': ''
    }
}));

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ultablue running smoothly on port ${PORT}`);
});
