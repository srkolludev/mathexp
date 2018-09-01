'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================

module.exports = {

  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://root:root@ds147599.mlab.com:47599/restaurant'
    uri: 'mongodb://localhost/qdb'
  },

  // Seed database on startup
  seedDB: false,
  seedQnDB: false
};
//# sourceMappingURL=development.js.map
