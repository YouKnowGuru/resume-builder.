const https = require('https');

const tests = [
    { name: 'SK Key', key: 'sk-DHoOxkNvbx11Np0jvyAiRpYlJ4lsZ95dXH1TxTAcXygFUO8c' },
    { name: 'BCEPT Token', key: 'BCEPTu0i2SoGZw46yR8FgurlnkQphw==' }
];

const runTest = (testCase) => {
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
            'Authorization': `Bearer ${testCase.key}`,
            'Content-Length': data.length,
            'User-Agent': 'ResumeBuilder/1.0' // Adding UA to avoid simple blocking
        }
    };

    console.log(`\nTesting ${testCase.name}...`);

    const req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log(`BODY: ${body.substring(0, 200)}...`));
    });

    req.on('error', (e) => console.error(`ERROR: ${e.message}`));
    req.write(data);
    req.end();
};

tests.forEach((test, index) => {
    setTimeout(() => runTest(test), index * 2000);
});
