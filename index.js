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
const port = 9000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

    const { message } = req.body;
    //Change name based on what functionality it's for
    var summaryValue = 1;

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            //Change the text based on what type of response you want
            { role: "user", content: `Summarize the following: ${message}` },
        ]
    })

    res.json({
        completion: completion.data.choices[0].message
    })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}) 