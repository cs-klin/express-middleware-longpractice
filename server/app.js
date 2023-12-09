const express = require('express');
const app = express();

app.use(express.json());//add express.json middleware

require('express-async-errors');// import express-async-errors' package

app.use((req, res, next) => {
  console.log(`${req.method}${req.url}`)




res.on('finish', () => {
  // read and log the status code of the response
  console.log(`Status code: ${res.statusCode}` )
})
next()
})
// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  console.log(req.body)
  res.json(req.body);
  // next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

//error handler for async routes
app.use((err,req,res,next) => {
  console.error(err.stack)
  res.status(500).send("Error: Hello World!")
})




const secondFunction = (req, res, next) => {
  const error = new Error("The requested resource couldn't be found")
  error.statusCode = 404
  throw error
}




// app.use(logFunction)
app.use(secondFunction)


const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
