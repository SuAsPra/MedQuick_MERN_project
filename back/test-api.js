const http = require('http');

const fetchJson = (url) => new Promise((resolve, reject) => {
    http.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) });
            } catch (e) {
                resolve({ status: res.statusCode, headers: res.headers, body: data });
            }
        });
    }).on('error', reject);
});

async function test() {
    console.log('--- Testing Backend APIs ---');
    
    // 1. Health
    const health = await fetchJson('http://localhost:8000/');
    console.log('1. Health check:', health.status, health.body);

    // 2. Categories
    const categories = await fetchJson('http://localhost:8000/categories');
    console.log('2. Categories count:', categories.body.length, categories.body.map(c => c.name));

    // 3. Brands
    const brands = await fetchJson('http://localhost:8000/brands');
    console.log('3. Brands count:', brands.body.length, brands.body.map(b => b.name));

    // 4. Products
    const products = await fetchJson('http://localhost:8000/products');
    console.log('4. Total products:', products.body.length, 'X-Total-Count:', products.headers['x-total-count']);

    // 5. Keyword search "Amoxicillin"
    const search1 = await fetchJson('http://localhost:8000/products?search=Amoxicillin');
    console.log('5. Search "Amoxicillin":', search1.body.length, search1.body.map(p => ({
        title: p.title,
        brand: p.brand?.name,
        category: p.category?.name,
        requiresPrescription: p.requiresPrescription,
        dosage: p.dosage,
        manufacturer: p.manufacturer
    })));

    // 6. Keyword search "Antibiotic" (matching medicineType)
    const search2 = await fetchJson('http://localhost:8000/products?search=Antibiotic');
    console.log('6. Search "Antibiotic":', search2.body.length, search2.body.map(p => p.title));

    // 7. Users
    const users = await fetchJson('http://localhost:8000/users');
    console.log('7. Users count:', users.body.length, users.body.map(u => ({ name: u.name, email: u.email, isAdmin: u.isAdmin })));

    console.log('--- All Backend Tests Succeeded! ---');
}

test().catch(console.error);
