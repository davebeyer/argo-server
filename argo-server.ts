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

app.use('/post', (req:any, res:any) => {
   // Until proxy server is working, do a redirect here!
   let host = req.get('host').split(':')[0];
   let newUrl = req.protocol + '://' + host + ':4567';
   console.log("Redirecting to " + newUrl);
   res.redirect(newUrl);
});

app.use('/post', createProxyMiddleware({
  target: 'http://192.168.1.159:4567',
  changeOrigin: true,
  ws: true,
  pathRewrite: { '^/post': '' }
}));


app.get('/', (req:any, res:any) => {
  res.sendFile('./templates/index.html', { root: __dirname });
});

    
app.listen(port, () => {
  console.log(`Argo server listening on port ${port}`)
});
