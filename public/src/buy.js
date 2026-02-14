// DOM
const form = document.getElementsByTagName('form')[0];

// API call to put form data onto the server and throw any errors to event listener
async function saveForm(value) {
    const res = await fetch('/api/data' , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    });

    const data = await res.json();
    console.log(data);
}

// EVENT LISTENERS
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const values = {
        name: formData.get('name-input'),
        email: formData.get('email-input'),
        number: formData.get('number-input'),
        buy: formData.get('buy-input'),
        price: formData.get('price-input')
    }

    // Upload form data to server
    try {
        await saveForm(values);
    } catch (err) {
        console.log(err);
    }
});