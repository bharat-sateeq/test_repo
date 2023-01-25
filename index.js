const mongoose = require("mongoose");
const DB_URL = "mongodb+srv://df_user:df_user@sateeq.0wfza.mongodb.net/sateeq?retryWrites=true&w=majority"


mongoose.connect(
    DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error) => {
        if (error) {
            console.log("DB Connection Failed!");
            console.log(`DB URL: ${DB_URL}`);
            console.log(error);
            return;
        }
        app.listen(3000, () => {
            console.log(`Server started on port: ${3000}`);
        });
    }
);
const express = require('express');
const { mainController } = require("./controller");
const app = express()
app.use(express.json());


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/check', mainController);
