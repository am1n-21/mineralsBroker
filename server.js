// IMPORTS
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getContentType } from './utils/types.js';
import { serveRes } from './utils/serveRes.js';

// CONSTS
const PORT = 8000;
const __dirname = import.meta.dirname;
const publicDir = path.join(__dirname, 'public');

// SERVER
const server = http.createServer(async (req, res) => {
    try {
        // Create path to content
        const pathToResource = path.join(
            publicDir,
            req.url === '/' ? 'index.html' : req.url
        );

        // Serve files
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