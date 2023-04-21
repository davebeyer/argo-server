const axios = require('axios');
const xmlFormat = require('xml-formatter');
const morgan = require('morgan');

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

//////////////////////////////////////////////////////
//
// Start Express-node server
//
//////////////////////////////////////////////////////

const app = express()
const port = 80

// logging
app.use(morgan('combined'));

//
// Routes for this site
//

// Static node_modules routes
app.use('/nm', express.static('node_modules'))

// Static node_modules routes
app.use('/assets', express.static('assets'))

app.use('/post', createProxyMiddleware({
  target: 'http://127.0.0.1:4567',
  changeOrigin: true,
  ws: true,
  
  // comment out path rewrite, nodebb expects the /post due
  // to canonical url setting apparently
  // pathRewrite: { '^/post': '' }
}));


app.get('/', (req:any, res:any) => {
  res.sendFile('./templates/index.html', { root: __dirname });
});

    
app.listen(port, () => {
  console.log(`Argo server listening on port ${port}`)
});
