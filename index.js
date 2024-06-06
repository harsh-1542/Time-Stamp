// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
    let input = req.params.date;
    let newdate;

    // If no date is provided, use the current date
    if (!input) {
        newdate = new Date();
    } else {
        // Determine if the input is a UNIX timestamp or a date string
        if (!isNaN(input)) {
            // Input is a UNIX timestamp
            newdate = new Date(parseInt(input, 10));
        } else {
            // Input is a date string
            newdate = new Date(input);
        }
    }

    // Check if the date is valid
    if (isNaN(newdate.getTime())) {
        return res.json({ error: 'Invalid Date' });
    }

    // Get the UNIX timestamp and UTC string
    const unixTimestamp = newdate.getTime();
    const utcString = newdate.toUTCString();

    // Create a response object
    const response = {
        unix: unixTimestamp,
        utc: utcString
    };

    // Send the JSON response
    res.json(response);
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
