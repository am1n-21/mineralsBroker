// DOM
const goldPrice = document.getElementById('gold-current-price');
const silverPrice = document.getElementById('silver-current-price');
const copperPrice = document.getElementById('copper-current-price');
const aluPrice = document.getElementById('aluminium-current-price');
const platPrice = document.getElementById('platinum-current-price');
const zincPrice = document.getElementById('zinc-current-price');

// API call to fetch prices
async function fetchPrices() {
    try {
        const res = await fetch('/api/prices', {method: 'GET'});
        const data = await res.json();
        console.log('Fetching prices...');
        console.log(data);

        return data;
    } catch (err) {
        console.log(err);
    }
}

const data = await fetchPrices();

// Update DOM
goldPrice.textContent = '$' + data.gold;
silverPrice.textContent = '$' + data.silver;
aluPrice.textContent = '$' + data.aluminium;
copperPrice.textContent = '$' + data.copper;
platPrice.textContent = '$' + data.platinum;
zincPrice.textContent = '$' + data.zinc;


