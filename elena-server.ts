// declare module 'express-subdomain';  

const axios = require('axios');
const xmlFormat = require('xml-formatter');

// @ts-ignore   (required due to lack of @types/express-subdomain)
const subdomain = require('express-subdomain');

const express = require('express');

//////////////////////////////////////////////////////
//
// Update Dynamic DNS IP address for davesmaze.com
//
//////////////////////////////////////////////////////

const domain   = 'davesmaze.com';
const ddns_key = 'cc708c2396b049e2b91d77361e351156';
const ddns_url = 'https://dynamicdns.park-your-domain.com/update';

const updateDDNS = async () => {
    try {
        const resp = await axios.get(ddns_url, { params: {
            host: '@',
            domain: domain,
            password: ddns_key
        }});
        
        console.log("Updating DDNS @: " + resp.status + "\n" + xmlFormat(resp.data));
    } catch (error) {
        console.log("ERROR Updating DDNS @: " + JSON.stringify(error));
    }

    try {
        const resp = await axios.get(ddns_url, { params: {
            host: '*',
            domain: domain,
            password: ddns_key
        }});
        console.log("Updating DDNS *: " + resp.status +  "\n" + xmlFormat(resp.data));
    } catch (error) {
        console.log("ERROR Updating DDNS *: " + JSON.stringify(error));
    }
};

updateDDNS(); // no need to wait


//////////////////////////////////////////////////////
//
// Start Express-node server
//
//////////////////////////////////////////////////////

const app = express()
const port = 80

//
// Subdomain redirects/proxies
//

app.use(subdomain('argonauts', (req:any, res:any, next:any) => {
  console.log(`Argonauts subdomain!`)
  next();
}));

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
  console.log(`Elena server listing on port ${port}`)
});
