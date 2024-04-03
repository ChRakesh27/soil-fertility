const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')


const api = require('./routes');

const port = process.env.PORT || 3000;

const app = express();


const APP_DIR = './dist/mini-project'
app.use(bodyParser.json());
app.use(cors());

app.use('', api);

app.get('*.*', express.static(path.join(__dirname, APP_DIR)));
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, APP_DIR, 'index.html'))
})



app.listen(port, function () {
  console.log("listening on :http://localhost:" + port);
});
