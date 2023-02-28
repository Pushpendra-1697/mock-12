const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { connection } = require('./Configs/Config');
const { browserRoute } = require('./Routes/browser.route');
const { postRoute } = require('./Routes/post.route');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.text());
app.get('/', async (req,res) => {
    res.send('Welcome in Mock-12');
});

app.use('/browser', browserRoute);
app.use('/post', postRoute);


app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Connected to DB`);
    } catch (err) {
        console.log(err);
        console.log(`Trouble connecting to DB`);
    }
    console.log(`Server is running at ${PORT} port`);
});