require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const timings = require('./routes/timings')
const PORT = process.env.PORT || 7000;


app.use(bodyParser.json()); 
app.use(express.json());

app.use('/api/v1/timings/',timings)
app.get("/", (req, res) => {
  res.send(JSON.stringify({ message: "Hello World" }));
});

mongoose.connect('mongodb://localhost:27017/timings')
        .then(()=> console.log('Connected to MongoDB'))
        .catch((err)=> console.error(err))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


