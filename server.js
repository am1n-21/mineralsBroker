// IMPORTS
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getContentType } from './utils/types.js';
import { serveRes } from './utils/serveRes.js';
import { getPrices } from './services/getPrices.js';
import { loadPrices } from './services/loadPrices.js';

// CONSTS
const PORT = 8000;
const __dirname = import.meta.dirname;
const publicDir = path.join(__dirname, 'public');

// Update prices every 24 hours
setInterval(() => {
    getPrices();
}, 60 * 60 * 24 * 1000);


// SERVER
const server = http.createServer(async (req, res) => {
    try {
        // Market price update
        if (req.url === '/api/prices' && req.method === 'GET') {
            const data = await loadPrices();
            serveRes(res, 200, 'application/json', JSON.stringify(data));
            return;
        }

        // Create path to content
        const pathToResource = path.join(
            publicDir,
            req.url === '/' ? 'index.html' : req.url
        );

        // Static file serving (HTML, CSS, frontend-JS)
        const content = await fs.readFile(pathToResource);
        const ext = path.extname(pathToResource);
        const contentType = getContentType(ext);

        serveRes(res, 200, contentType, content);
    } catch (err) {
        serveRes(res, 404, 'text/html', '<h1>404 not found</h1>');
        console.log(err);
    }

    res.end();
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));