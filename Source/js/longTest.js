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
const port = 4000;

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
            { role: "user", content: `Create a long answer test based off of the following article: ${message}` },
        ]
    })

    res.json({
        completion: completion.data.choices[0].message
    })

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}) 