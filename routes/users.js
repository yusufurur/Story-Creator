/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const db = require('../db/connection');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});

module.exports = router;

// module.exports = (db) {
//   router.get("/", (req, res) => {
//     db.query('SELECT * FROM users;')
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .jsonp({ error: err.message });
//       });
//   });
//   return router;
// };
