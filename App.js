const express = require('express');
const elasticsearch = require('elasticsearch');
const app = express();
const port = 9292;
require('./routes')(app, {});

var database = new elasticsearch.Client({
  host: 'localhost:9200'
});

app.listen(port, () => {
  console.log('Go on port : ' + port);
});