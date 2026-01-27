const https = require('https');

const apiKey = 'sk-DHoOxkNvbx11Np0jvyAiRpYlJ4lsZ95dXH1TxTAcXygFUO8c';
const data = JSON.stringify({
    model: "deepseek-chat",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello!" }
    ],
    stream: false
});

const options = {
    hostname: 'api.deepseek.com',
    path: '/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': data.length
    }
};

console.log('Testing DeepSeek API with key ending in: ...' + apiKey.slice(-4));

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log('BODY: ' + body);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
