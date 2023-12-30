const { Configuration, OpenAIApi } = require("openai");

const API_KEY = process.env.VITE_APP_OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function sendMessage(message) {
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: message,
    temperature: 0.9,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0].text;
}
