import OpenAI from "openai";

const API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY;


delete configuration.baseOptions.headers["User-Agent"];

const openai = new OpenAI({
  apiKey: API_KEY,
});

export async function generateContent(message, style) {
  const response = await openai.completions.create({
    model: "text-davinci-003",
    prompt: `Write ${style} content for the following text, make it as detailled and lengthy as possible minimum 250 words. Also reply in Markdown please: ${message}`,
    temperature: 0.9,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].text;
}
