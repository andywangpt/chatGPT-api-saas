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

console.log(process.env.OPENAI_API_KEY);
app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "Say this is a test",
		max_token: 7,
		temperature: 0,
	});
	console.log(response.data);
	res.json({
		message: "Helloooooo WOrld!!",
	});
});

app.listen(port, () => {
	console.log("Example app listening on 3000");
});
