const fetch = require('node-fetch');

const url = 'https://shared-api.forefront.link/organization/G1Yk5qgNGeTb/gpt-j-6b-vanilla/completions/2JrDQ5BhJAm6';

const headers = {
  "Authorization": "Bearer 3ba7a48d87544fd4b54b13af",
  "Content-Type": "application/json"
};

const body = {
  prompt: "Once upon a time",
  max_tokens: 64,
  top_p: 1,
  top_k: 40,
  temperature: 0.8,
  repetition_penalty:  1,
  stop_sequences: ["bird", "cat", "dog"]
};

fetch(url, {
  method: 'POST',
  headers,
  body: JSON.stringify(body)
}).then(async (res) => {
  const data = await res.json()
  console.log(data)
})java