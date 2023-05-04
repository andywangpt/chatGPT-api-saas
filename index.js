require("dotenv").config();

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3001;

const express = require("express");
const path = require("path");
const app = express();

const TEST_RESPONSE = [
	"Beef and Onion Fried Rice",
	"-Beef and Onion Stir Fry",
	"-Beef and Onion Soup",
];

const configuration = new Configuration({
	organization: "org-As7vUneD0SPjG4503EqOozgJ",
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.use("/", express.static(path.join(__dirname, "client", "build")));

app.post("/", async (req, res) => {
	const { message } = req.body;
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `Give me a list of dinner ideas (but not recipes) if I had the following ingredients: ${message}.`,
		max_tokens: 250,
		temperature: 0.2,
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
			//message: TEST_RESPONSE,
		});
	}
});

app.listen(port, () => {
	console.log("Example app listening on 3000");
});
