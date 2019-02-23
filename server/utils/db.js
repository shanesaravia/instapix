const admin = require('firebase-admin');
const serviceAccount = require('../configs/fireKey.json');
const { dbConfig } = require('../configs/config');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbConfig.connection
});

const db = admin.firestore();

const firestore = admin.firestore();
firestore.settings({timestampsInSnapshots: true});

module.exports = db;