require("dotenv").config();

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
	organization: "org-DCFtjpp62k0AocWmr8BLLFpy",
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
	const { message } = req.body;
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `Give me dinner ideas if I had the following ingredients: ${message}`,
		max_tokens: 200,
		temperature: 0,
	});
	console.log(response.data);
	if (response.data.choices[0].text) {
		const displayChoiceText = (response) => {
			const readable = response.data.choices[0].text;
			console.log(readable);
			return readable;
		};
		res.json({
			message: displayChoiceText(response),
		});
	}
});

app.listen(port, () => {
	console.log("Example app listening on 3000");
});