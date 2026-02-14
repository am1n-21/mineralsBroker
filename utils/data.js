// IMPORTS
import path from 'node:path';
import fs from 'node:fs/promises';

// CONSTS
const __dirname = import.meta.dirname;
const pathToData = path.join(__dirname, '..', 'data', 'usersData.json');

// Writes a buy request to usersData.json
export async function writeBuyRequest(holdings) {    
  await fs.writeFile(
    pathToData,
    JSON.stringify(holdings, null, 2),
    'utf8'
  )
  return;
}

// Reads and returns all holdings written to data
export async function readHoldings() {
  const holdings = await fs.readFile(pathToData, 'utf8');

  // Return empty array if the file is empty
  if (!holdings || holdings.trim() === '') {
    return [];
  }

  return JSON.parse(holdings);
}