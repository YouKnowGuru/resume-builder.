import https from 'https';

const apiKey = 'AIzaSyCmj__PvDE1K8NfKrwd9LYX3Gp-hijb_cw';
// Try the standard pro model
const model = 'gemini-pro';

console.log(`Checking ${model}...`);

const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
const body = JSON.stringify({
    contents: [{ parts: [{ text: "Hello" }] }]
});

const req = https.request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        try {
            const json = JSON.parse(data);
            console.log('Response:', JSON.stringify(json, null, 2));
        } catch {
            console.log('Raw:', data);
        }
    });
});

req.on('error', (e) => console.log('Error:', e.message));
req.write(body);
req.end();
