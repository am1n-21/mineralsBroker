// IMPORTS
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getContentType } from './utils/types.js';
import { serveRes } from './utils/serveRes.js';
import { getPrices } from './services/getPrices.js';
import { loadPrices } from './services/loadPrices.js';
import { readHoldings, writeBuyRequest } from './utils/data.js'

// CONSTS
const PORT = 8000;
const __dirname = import.meta.dirname;
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');

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
        // Write new buy request data
        else if (req.url === '/api/data' && req.method === 'PUT') {
            let body = ''
            for await (const chunk of req) {
              body += chunk
            }

            try {
                // Read in current holdings from data
                const holdings = await readHoldings();

                // Push new data to holdings
                const formData = JSON.parse(body);
                holdings.push(formData);

                // Rewrite data with new buy request
                await writeBuyRequest(holdings);
                serveRes(res, 200, 'application/json', JSON.stringify({success: "Successfully wrote data"}));
                return;
            } catch (err) {
                serveRes(res, 400, 'application/json', JSON.stringify(err));
                return;
            }
        }
        // Send all buy requests data to frontend holdings
        else if (req.url === '/api/data' && req.method === 'GET') {
            try {
                // Read in current holdings from data
                const holdings = await readHoldings();
                serveRes(res, 200, 'application/json', JSON.stringify(holdings));
                return;
            } catch (err) {
                serveRes(res, 400, 'application/json', JSON.stringify(err));
                return;
            }
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