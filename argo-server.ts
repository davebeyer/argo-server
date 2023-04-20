const axios = require('axios');
const xmlFormat = require('xml-formatter');

const express = require('express');

//////////////////////////////////////////////////////
//
// Start Express-node server
//
//////////////////////////////////////////////////////

const app = express()
const port = 80

//
// Routes for this site
//

// Static node_modules routes
app.use('/nm', express.static('node_modules'))

// Static node_modules routes
app.use('/assets', express.static('assets'))


app.get('/', (req:any, res:any) => {
  res.sendFile('./templates/index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Argo server listening on port ${port}`)
});
