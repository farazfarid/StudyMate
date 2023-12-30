import { Configuration, OpenAIApi } from "openai";

const API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});

delete configuration.baseOptions.headers["User-Agent"];

const openai = new OpenAIApi(configuration);

export async function translateMessage(
  message,
  sourceLanguage,
  targetLanguage
) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Translate from ${sourceLanguage} to ${targetLanguage}: ${message}. Only show the translation please!`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0].text;
}
