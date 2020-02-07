const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3000
const dbPath = path.join(__dirname, 'db.json');
app.use(express.static(path.join(__dirname, 'static')));


const readFile = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    });
  });


const writeFile = (filePath, input) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, input, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });


app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.get('/api/dogs', (req, res, next) => {
  try {
    readFile(dbPath)
      .then(response => {
        res.send(response)
      })
  } catch (err) {
    next(err)
  }
})

app.post('/api/dogs', ({ query }, res, next) => {
  try {
    readFile(dbPath)
      .then(data => {
        const dogs = JSON.parse(data);
        dogs.push(query);
        writeFile(dbPath, JSON.stringify(dogs))
        .then(res.send(dogs))
      })
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => console.log('listening on port 3000'));
