import https from 'https';

const apiKey = 'AIzaSyCmj__PvDE1K8NfKrwd9LYX3Gp-hijb_cw';
const models = [
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash-001',
    'gemini-1.5-flash-002',
    'gemini-1.5-flash-8b',
    'gemini-1.5-pro',
    'gemini-1.5-pro-latest',
    'gemini-1.5-pro-001',
    'gemini-1.5-pro-002',
    'gemini-1.0-pro',
    'gemini-pro',
    'gemini-2.0-flash-exp'
];

console.log('--- CHECKING MODELS ---');

function checkModel(modelName) {
    return new Promise((resolve) => {
        // We try to generate content to check if it's actually usable (permissions + quota)
        // Just checking existence isn't enough as we saw with 2.0-flash-exp (exists but quota 0)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        const body = JSON.stringify({
            contents: [{ parts: [{ text: "Hi" }] }]
        });

        const req = https.request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`[PASS] ${modelName}`);
                } else {
                    try {
                        const json = JSON.parse(data);
                        // Shorten error message
                        const msg = json.error?.message?.split('.')[0] || 'Unknown error';
                        console.log(`[FAIL] ${modelName}: ${res.statusCode} - ${msg}`);
                    } catch (e) {
                        console.log(`[FAIL] ${modelName}: ${res.statusCode} - Parse error`);
                    }
                }
                resolve();
            });
        });

        req.on('error', () => {
            console.log(`[ERR] ${modelName}: Request failed`);
            resolve();
        });

        req.write(body);
        req.end();
    });
}

(async () => {
    for (const model of models) {
        await checkModel(model);
    }
    console.log('--- DONE ---');
})();
