const express = require('express');
require('dotenv').config();

const app = express();
const auth = require('./routes/auth');

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/auth', auth);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));