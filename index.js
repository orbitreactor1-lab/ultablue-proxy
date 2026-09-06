const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Serve the static frontend assets from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Securely proxy search engine traffic 
app.use('/service', createProxyMiddleware({
    target: 'https://duckduckgo.com',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
        '^/service': '', 
    },
    on: {
        proxyRes: (proxyRes, req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }
}));

// Default port layout for Render environment
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ultablue running smoothly on port ${PORT}`);
});
