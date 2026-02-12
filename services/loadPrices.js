import path from 'node:path';
import fs from 'node:fs/promises';

// CONSTS
const __dirname = import.meta.dirname;
const pathToPriceData = path.join(__dirname, '..', 'data', 'priceData.json');

export async function loadPrices() {
    try {
        // Read file and parse as object
        let data = await fs.readFile(
            pathToPriceData,
            'utf-8'
        );
        data = JSON.parse(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}