
const { response } = require('express');
const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool(dbParams);
db.connect();


const browseStory = () => {
  return db.query("SELECT * FROM stories;")
    .then((response) => {
      return response.rows;
    })
    .catch((err) => console.log("Error for browseStory", err));
}

module.exports = {
  browseStory
}
