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

app.get("/api/:input", (req,res)=>{
  const input = req.params.input;
    let newdate;

    // Determine if the input is a UNIX timestamp or a date string
    if (!isNaN(input)) {
        // Input is a UNIX timestamp
        newdate = new Date(parseInt(input, 10));
    } else {
        // Input is a date string
        newdate = new Date(input + "T00:00:00Z");
    }

    // Check if the date is valid
    if (isNaN(newdate.getTime())) {
        return res.status(400).json({ error: 'Invalid date input' });
    }

    // Get the UNIX timestamp and UTC string
    const unixTimestamp = newdate.getTime().toString();
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
