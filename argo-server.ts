const axios = require('axios');
const xmlFormat = require('xml-formatter');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const moment = require('moment-timezone');

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

//////////////////////////////////////////////////////
//
// Start Express-node server
//
//////////////////////////////////////////////////////

const app = express()
const port = 80

//
// Hook up nunjucks for rendering templates
//

// Base directory for HTML templates (such as index.html) is in the 'templates' sub-folder
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

// logging
app.use(morgan('combined', {
    skip: (req:any, res:any) => {
    	return req.originalUrl.startsWith('/nm/') ||
	       req.originalUrl.startsWith('/assets/');
    }
}));

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
  res.render('index.html', {
      currentDatetime : moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  });
});

    
app.listen(port, () => {
  console.log(`Argo server listening on port ${port}`)
});
