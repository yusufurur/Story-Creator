const { response } = require('express');
const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool(dbParams);
db.connect();


const getUsers = () => {
  return db.query("SELECT * FROM users;")
    .then((response) => {
      return response.rows;
    });
};