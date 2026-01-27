const https = require('https');

const key = 'sk-piWaxkWMM3N6Z139k7ti6ke0BGbG3';

const runTest = () => {
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
            'User-Agent': 'ResumeBuilder/1.0',
            'Content-Length': data.length
        }
    };

    console.log(`\nTesting Final Key: ${key.substring(0, 10)}...`);

    const req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log(`BODY: ${body}`));
    });

    req.on('error', (e) => console.error(`ERROR: ${e.message}`));
    req.write(data);
    req.end();
};

runTest();
