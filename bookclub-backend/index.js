const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const functions = require('firebase-functions')
const bookclubRouter = require('./routes/bookclubRoutes');
const decodeIDToken = require('./authenticateToken');
const atlasPassword = require('./config');
const path = require('path')

const app = express();

app.use(cors());
app.use(express.json());
app.use(decodeIDToken);
app.use('/api', bookclubRouter);

mongoose.connect(
  `mongodb+srv://saltystartup:${atlasPassword}@Bookclub.mgvz6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to DB', err.message);
  });

const PORT = 4200;

app.use(express.static(path.join(__dirname, '../bookclub-frontend/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../bookclub-frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

exports.api = functions.https.onRequest(app);