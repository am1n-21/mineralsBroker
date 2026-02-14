// DOM
const holdingsContainer = document.getElementById('holdings');

// API Call to server to get current data on all holdings
async function getData() {
    try {
        const res = await fetch('/api/data', {method: 'GET'});
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

// Renders each holding as html 
function renderData(holdings) {
    holdingsContainer.innerHTML = '';

    holdings.forEach((h) => {
        holdingsContainer.innerHTML +=
        `
        <div class="hold-container">
            <div class="h-container">
                <h1>${h.name}</h1>
                <h2>${h.email}</h2>
                <h3>${h.number}</h3>
            </div>

            <div class="p-container">
                <p class="metal-txt">${h.buy}</p>
                <p class="price-txt">$${h.price}</p>
            </div>
        </div>
        `
    });
}
async function init() {
    const holdings = await getData();
    renderData(holdings);
}

init();


