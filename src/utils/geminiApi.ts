export class GrokAPI {
    private apiKey: string;
    private baseURL = 'https://api.apifree.ai/v1/chat/completions';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async generateSuggestion(type: 'summary' | 'bullet-point', context?: string): Promise<string> {
        const prompts = {
            summary: `You are a professional resume writer. Generate a compelling professional summary (2-3 sentences) for a resume. 
The summary should be:
- Results-oriented and achievement-focused
- Highlight key skills and expertise
- Professional and concise
- Written in third person
${context ? `Context: ${context}` : ''}

Generate only the professional summary text, no additional commentary.`,
            'bullet-point': `You are a professional resume writer. Generate a strong achievement bullet point for a resume.
The bullet point should:
- Start with a strong action verb
- Include specific metrics or quantifiable results (percentages, numbers, timeframes)
- Demonstrate impact and value
- Be concise (1-2 lines)
${context ? `Context: ${context}` : ''}

Generate only the bullet point text, no additional commentary.`
        };

        const requestBody = {
            model: "xai/grok-4",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful expert resume writer assistant."
                },
                {
                    role: "user",
                    content: prompts[type]
                }
            ],
            stream: false
        };

        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', errorData);
                throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
            }

            const data = await response.json();

            // Check if API returned an error in a 200 response (some proxies do this)
            if (data.error) {
                throw new Error(data.error.message || 'API returned an error');
            }

            if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
                throw new Error('No valid response from AI');
            }

            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('Logic Error:', error);

            // Fallback to Mock Data for testing if API fails (e.g. invalid key/quota)
            console.log('Falling back to Mock Data');
            return this.getMockData(type);
        }
    }

    private getMockData(type: 'summary' | 'bullet-point'): string {
        if (type === 'summary') {
            return "Dedicated software engineer with 5+ years of experience in full-stack development. Expert in React, TypeScript, and Node.js with a strong focus on building scalable web applications and delivering high-quality user experiences.";
        } else {
            return "Engineered a new automated testing framework that reduced release cycle time by 40% and improved code coverage from 65% to 92% across the entire microservices architecture.";
        }
    }
}

// Hardcoded key as per user request
const API_KEY = 'sk-piWaxkWMM3N6Z139k7ti6ke0BGbG3';

export const createGeminiClient = () => {
    // Returning Grok client but keeping the factory name for compatibility
    return new GrokAPI(API_KEY);
};
