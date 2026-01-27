const https = require('https');

const key = 'BCEPTu0i2SoGZw46yR8FgurlnkQphw==';

const paths = [
    '/v1/chat/completions',
    '/api/v1/chat/completions',
    '/chat/completions',
    '/api/chat/completions'
];

const runTest = (path) => {
    const data = JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: "Hi" }],
        stream: false
    });

    const options = {
        hostname: 'agentrouter.org',
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
            'Content-Length': data.length
        }
    };

    console.log(`\nTesting Path: ${path}`);

    const req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log(`BODY: ${body.substring(0, 100)}...`));
    });

    req.on('error', (e) => console.error(`ERROR: ${e.message}`));
    req.write(data);
    req.end();
};

paths.forEach((path, index) => {
    setTimeout(() => runTest(path), index * 2000);
});
