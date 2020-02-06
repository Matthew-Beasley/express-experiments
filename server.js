const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/dogs', (req, res, next) => {
  res.send(db.getDogs());
})

app.listen(3000, () => console.log('listening on port 3000'));
