import OpenAI from "openai";

const API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function translateMessage(
  message,
  sourceLanguage,
  targetLanguage
) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Translate from ${sourceLanguage} to ${targetLanguage}: ${message}. Only show the translation please!`,
      },
    ],
    temperature: 0.5,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
}
