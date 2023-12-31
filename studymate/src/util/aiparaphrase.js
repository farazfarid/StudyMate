import OpenAI from "openai";

const API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function paraphraseText(message, style) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Paraphrase this text in ${style}: ${message}`,
      },
    ],
    temperature: 0.5,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
}
