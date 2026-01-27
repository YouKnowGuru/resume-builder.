const https = require('https');

const key = 'BCEPTu0i2SoGZw46yR8FgurlnkQphw==';

const data = JSON.stringify({
    model: "deepseek-chat",
    messages: [{ role: "user", content: "Hi" }],
    stream: false
});

const options = {
    hostname: 'agentrouter.org',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        'Content-Length': data.length,
        'User-Agent': 'ResumeBuilder/1.0'
    }
};

console.log(`Testing BCEPT Token...`);

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => console.log(`BODY: ${body}`));
});

req.on('error', (e) => console.error(`ERROR: ${e.message}`));
req.write(data);
req.end();
