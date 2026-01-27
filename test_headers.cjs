const https = require('https');

const skKey = 'sk-DHoOxkNvbx11Np0jvyAiRpYlJ4lsZ95dXH1TxTAcXygFUO8c';
const bceptToken = 'BCEPTu0i2SoGZw46yR8FgurlnkQphw==';

const combinations = [
    { name: 'Bearer SK + X-Auth BCEPT', headers: { 'Authorization': `Bearer ${skKey}`, 'X-Auth-Token': bceptToken } },
    { name: 'Bearer SK + X-Api-Key BCEPT', headers: { 'Authorization': `Bearer ${skKey}`, 'X-Api-Key': bceptToken } },
    { name: 'Bearer BCEPT + X-Api-Key SK', headers: { 'Authorization': `Bearer ${bceptToken}`, 'X-Api-Key': skKey } },
    { name: 'X-Api-Key SK', headers: { 'X-Api-Key': skKey } },
    { name: 'X-Auth-Token BCEPT', headers: { 'X-Auth-Token': bceptToken } }
];

const runTest = (combo) => {
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
            ...combo.headers
        }
    };

    console.log(`\nTesting: ${combo.name}`);

    const req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log(`SUCCESS! BODY: ${body.substring(0, 100)}...`);
            } else {
                console.log(`FAIL. BODY: ${body.substring(0, 100)}...`);
            }
        });
    });

    req.on('error', (e) => console.error(`ERROR: ${e.message}`));
    req.write(data);
    req.end();
};

combinations.forEach((combo, index) => {
    setTimeout(() => runTest(combo), index * 2000);
});
