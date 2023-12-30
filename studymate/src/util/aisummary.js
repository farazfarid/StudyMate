import { Configuration, OpenAIApi } from "openai";

const API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});

delete configuration.baseOptions.headers["User-Agent"];

const openai = new OpenAIApi(configuration);

export async function summariseText(message) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Summarise this as detailled as posssible but also don't lose any important details such as links if possible: ${message}`,
    temperature: 0.3,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0].text;
}
