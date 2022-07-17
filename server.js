"use strict"
// Express
const express = require('express');
const app = express();
const port = 3000;

// App
const path = require('path');
app.use(express.urlencoded({extended:true}));
app.use('/public', express.static(path.join(__dirname, "public")));
//JSDOM
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const pageUrl = {
  dietpage : path.join(__dirname, "dietpage.html"),
  createdietpage:path.join(__dirname, "createDietPage.html"),
}

app.get('/dietplan', (req, res) => {

  res.sendFile(pageUrl.dietpage);
})

app.get('/createDietPage', (req, res) => {

  res.sendFile(pageUrl.createdietpage);
})

app.post('/createDietPage', (req, res) => {
  
  console.log("Form submited");
  console.log(req.body);
  
  res.sendFile(pageUrl.createdietpage);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})