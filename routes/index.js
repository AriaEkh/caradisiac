const caradisiacRoutes = require('./routes');

module.exports = function(app, database){
  caradisiacRoutes(app, database);
};