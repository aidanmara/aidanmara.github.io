const express = require('express');
const rateLimit = require('express-rate-limit'); //Protecting my bank account LOL
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();
const geoip = require('geoip-lite');

//Regions to allow using the webservers
const allowedCountries = ['US','CA']

const sslkeys = {
    key: fs.readFileSync('~/etc/letsencrypt/live/aidanmara.info/privkey.pem'),
    cert: fs.readFileSync('~/etc/letsencrypt/live/aidanmara.info/fullchain.pem'),
}

app.use((req, res, next) => {
    const clientIP = req.ip;
    const geo = geoip.lookup(clientIP);
  
    if (geo && allowedCountries.includes(geo.country)) {
      next(); //Allow US IP's
    } else {
      res.status(403).send('Access From this Region Denied, Please access from a US IP.'); // Block the request
    }
  });


require('dotenv').config();
const mapsAPIKEY = process.env.GOOGLE_MAPS_API_KEY;

// Limiter Config
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //Mins * Sec * MS
  max: 50,
  message: 'Too many requests from this IP, please try again later.',
  headers: true,
});

//limit astar visits
app.use('/astar-demo', apiLimiter);

app.use(express.static(path.join(__dirname, 'public')));
// Root route, load portfolio
app.get('/', (req, res) => {
    console.log('ASTAR path:', path.join(__dirname, 'public', 'astar', 'astar.html'));

  res.redirect('/index.html');
});

// Serve astar demo with injected API key
app.get('/astar-demo', (req, res) => {
    let astarPath = path.join(__dirname, 'public', 'astar', 'astar.html');
    fs.readFile(astarPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('An error occurred while loading the page.');
      }
      data = data.replace('{{API_KEY}}', mapsAPIKEY);
      res.send(data);
    });
  });
  
// Serve about page
app.get('/astar-about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'astar', 'about.html'));
});

const PORTHTTP = 80;
const PORTHTTPS = 443;

https.createServer(sslkeys, app).listen(PORTHTTPS, () =>{
    console.log('Server Listening on HTTPS at Port 443')
});

http.createServer((req,res) => {
    res.writeHead(301, {"Location": "https://${req.headers.host}${req.url}"});
    res.end
    }).listen(PORTHTTP, () =>{
    console.log('Server Listening on HTTPS at Port 80, Redirecting')
});