const https = require('https');

const key = 'sk-piWaxkWMM3N6Z139k7ti6ke0BGbG3';

// First, check models available for this key
const options = {
    hostname: 'api.x.ai',
    path: '/v1/models',
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${key}`
    }
};

console.log(`Checking models with key: ${key.substring(0, 10)}...`);

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`BODY: ${body}`);
    });
});

req.on('error', (e) => console.error(`ERROR: ${e.message}`));
req.end();
