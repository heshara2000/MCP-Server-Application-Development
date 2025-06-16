const OpenAI = require('openai');
//const parseResume = require('../../resumeParser');
import parseResume from './resumeParser'; 


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatwithResume(question) {
    const resumeText = await parseResume();

    const response = await openai.chat.completions.create({
        //model: 'gpt-3.5-turbo',
        model: 'gpt-4o-mini-2024-07-18',
        //OPENAI_API_VERSION 2024-08-01-preview
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Here is my resume:\n${resumeText}` },
            { role: 'user', content: question },
        ],
   
    });
    return response.choices[0].message.content;
}

module.exports = chatwithResume;