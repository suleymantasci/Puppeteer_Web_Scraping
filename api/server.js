const express = require("express");
const cors = require("cors");
const elmaelma = require('./routers/elmaelma');

const app = express();
app.use(cors());

//Express - Body Middleware
app.use(express.json())

//Routers Middleware
app.use("/api/elmaelma/",elmaelma)

const port = process.env.port || 5000;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);


