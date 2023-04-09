
import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
    organization: "org-mc3TBzy1vbmzjMrxwkXSrbvy",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3700;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

    const { message } = req.body;

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: `Create a 500 word summary: ${message}` },
        ]
    })

    res.json({
        completion: completion.data.choices[0].message
    })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}) 