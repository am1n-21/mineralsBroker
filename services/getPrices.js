import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs/promises';

const __dirname = import.meta.dirname;

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export async function getPrices() {
    try {
        // Fetch gold, silver and platinum metal prices USD, (make up rest as not in free plan)
        const res = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=${process.env.API_KEY}&base=USD&currencies=XAU,XAG,XPT`);
        const data = await res.json();

        const metalsPrices = {
            gold: data.rates.USDXAG.toFixed(4),
            silver: data.rates.USDXAU.toFixed(4),
            aluminium: 8.1543,
            copper: 12.9812,
            platinum: data.rates.USDXPT.toFixed(4),
            zinc: 101.1921
        }

        // Write prices to priceData.json
        const pathToData = path.join(__dirname, '..', 'data', 'priceData.json');
        await fs.writeFile(
            pathToData,
            JSON.stringify(metalsPrices, null, 2),
            'utf8'
        );
    

    } catch (err) {
        console.log(err);
    }

    return;
}