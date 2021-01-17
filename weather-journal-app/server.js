// Setup empty JS object to act as endpoint for all routes
let projectData = [];

const fetch = require("node-fetch");
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const server = app.listen(8000, ()=>{
    
    console.log('runing on port 8000');
}).on('error', (error)=>{
    console.log('error happened : ' + str(error));
})
// Callback to debug


// Callback function to complete GET '/all'
app.get('/all', (request, response)=>{
    response.send(projectData);
})

// Post Route
app.post('/add', (request, response)=>{
    let newData = request.body ;
    let newEntry = {temp : newData['main'].temp,
                    area : newData['name'],
                    date : newData['date'],
                    zipCode : newData['zip code'],
                    userResponse : newData['user opinion']
                };
    projectData.push(newEntry);
})
