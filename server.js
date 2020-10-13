const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));
const port = 8000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});