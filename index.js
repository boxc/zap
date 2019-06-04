const orders_sent = require('./triggers/orders_sent');
const create_order = require('./creates/create_order');
const new_shipment = require('./triggers/new_shipment');
const create_shipment = require('./creates/create_shipment');

// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: require("./authentication"),

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
  ],

  afterResponse: [
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [orders_sent.key]: orders_sent,
    [new_shipment.key]: new_shipment
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [create_order.key]: create_order,
    [create_shipment.key]: create_shipment
  }
};

// Finally, export the app.
module.exports = App;
