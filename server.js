const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')


const api = require('./routes');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use('', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function () {
  console.log("listening on port :" + port);
});
