import OpenAI from "openai";

const API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY;


delete configuration.baseOptions.headers["User-Agent"];

const openai = new OpenAI({
  apiKey: API_KEY,
});

export async function paraphraseText(message, style) {
  const response = await openai.completions.create({
    model: "text-davinci-003",
    prompt: `Paraphrase this text in ${style}: ${message}`,
    temperature: 0.3,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].text;
}
