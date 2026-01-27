const https = require('https');

const skKey = 'sk-DHoOxkNvbx11Np0jvyAiRpYlJ4lsZ95dXH1TxTAcXygFUO8c';
const bceptToken = 'BCEPTu0i2SoGZw46yR8FgurlnkQphw==';

const tests = [
    {
        name: 'Bearer BCEPT + Origin',
        headers: {
            'Authorization': `Bearer ${bceptToken}`,
            'Origin': 'http://localhost:5173',
            'Referer': 'http://localhost:5173/'
        }
    },
    {
        name: 'Raw BCEPT (no Bearer)',
        headers: {
            'Authorization': bceptToken,
            'Origin': 'http://localhost:5173'
        }
    },
    {
        name: 'Bearer SK + X-Auth BCEPT + Origin',
        headers: {
            'Authorization': `Bearer ${skKey}`,
            'X-Auth-Token': bceptToken,
            'Origin': 'http://localhost:5173'
        }
    },
    {
        name: 'Bearer SK + X-Agent-Token BCEPT',
        headers: {
            'Authorization': `Bearer ${skKey}`,
            'X-Agent-Token': bceptToken
        }
    }
];

const runTest = (test) => {
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
            'User-Agent': 'ResumeBuilder/1.0',
            'Content-Length': data.length,
            ...test.headers
        }
    };

    console.log(`\nTesting: ${test.name}`);

    const req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log(`BODY: ${body.substring(0, 200)}`));
    });

    req.on('error', (e) => console.error(`ERROR: ${e.message}`));
    req.write(data);
    req.end();
};

tests.forEach((test, index) => {
    setTimeout(() => runTest(test), index * 2000);
});
