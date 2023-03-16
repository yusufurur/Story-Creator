
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

const browseSelectStories = (id) => {
  return db.query("SELECT * FROM stories WHERE NOT name_id = $1;", [id])
    .then((response) => {
      return response.rows;
    })
    .catch((err) => console.log("Error for browseSelectStories", err));
}

const getStoryById = (id) => {
  return db.query(`SELECT stories.*, users.name, contributions.text_addon,
  contributions.accepted_at FROM stories JOIN users ON
  users.id = stories.name_id
  JOIN contributions ON contributions.id = story_id
  WHERE stories.id = $1;`, [id])
  .then((response) => {
    return response.rows[0];
  })
  .catch((err) => console.log("Error for getStoryById", err));
}

module.exports = {
  browseStory,
  browseSelectStories,
  getStoryById
}
