import axios from 'axios';
import xmlFormat from 'xml-formatter';

const domain   = 'davesmaze.com';
const ddns_key = 'cc708c2396b049e2b91d77361e351156';
const ddns_url = 'https://dynamicdns.park-your-domain.com/update';

//
// Update Dynamic DNS IP address for davesmaze.com
//
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

