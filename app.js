const express = require('express');
require('dotenv').config();

const app = express();
const db = require('./db');
const auth = require('./routes/auth');

app.use(express.json());


app.get('/', (req, res) => res.send('Hello World!'));
app.use('/auth', auth);


db.connect(() => {
  app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
  // app.listen(process.env.PORT || 5555, function (){
  //     console.log(`Listening`);
  // });
});