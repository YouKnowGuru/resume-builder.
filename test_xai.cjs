const https = require('https');

const key = 'sk-piWaxkWMM3N6Z139k7ti6ke0BGbG3';

const data = JSON.stringify({
    model: "grok-beta",
    messages: [{ role: "user", content: "Hi" }],
    stream: false
});

const options = {
    hostname: 'api.x.ai',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        'Content-Length': data.length
    }
};

console.log(`Testing xAI Grok with key: ${key.substring(0, 10)}...`);

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => console.log(`BODY: ${body}`));
});

req.on('error', (e) => console.error(`ERROR: ${e.message}`));
req.write(data);
req.end();
