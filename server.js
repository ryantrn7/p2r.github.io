const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const dataFilePath = path.join(__dirname, 'data.json');

let clickCount = 0;

fs.readFile(dataFilePath, 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading data file:', err);
  } else {
    const savedData = JSON.parse(data);
    if (savedData && savedData.clickCount !== undefined) {
      clickCount = savedData.clickCount;
      console.log('Click count loaded:', clickCount);
    }
  }
});

app.use(express.static('public'));

app.get('/increment', (req, res) => {
  clickCount++;
  res.json({ clickCount });

  const data = { clickCount };
  fs.writeFile(dataFilePath, JSON.stringify(data), 'utf8', err => {
    if (err) {
      console.log('Error saving data file:', err);
    } else {
      console.log('Click count saved:', clickCount);
    }
  });
});

app.get('/click-count', (req, res) => {
  res.json({ clickCount });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
