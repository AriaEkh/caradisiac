const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
const elasticsearch = require('elasticsearch');

var database = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

async function populate() {
  console.log('Work in progress')
  const brands = await getBrands();
  var body = [];
  var compteur = 1;
  
  for (var i = 0; i < brands.length; i++) {
    const models = await getModels(brands[i]);

    for (var j = 0; j < models.length; j++) {
      body.push({
        index: {
          _index: 'caradisiac',
          _type: 'car',
          _id: compteur
        }
      });
      body.push(models[j]);
      compteur++;
    }
  }

  database.bulk({
    body: body
  }, function(error, response) {
    if (error) {
      console.error(error);
      return;
    } else {
      console.log('No error');
    }
  });
}

async function suv() {
  database.search({
    index: 'caradisiac',
    type: 'car',
    body: {
      "size": 125,
      "query": {
        "range": {
          "volume": {
            "gte": "500"
          }
        }
      },
      "sort": [{
        "volume.keyword": {
          "order": "desc"
        }
      }]
    }
  }, function(error, response) {
    if (error) {
      console.error(error)
      return;
    } else {
      console.log('You can see the best result above');
    }
  });
}

module.exports = function(app, database) {
  app.post('/populate', (req, res) => {
    populate();
    res.send(' Work in progress');
  });

  app.post('/suv', (req, res) => {
    suv();
    res.send('Check your terminal');
  });

};