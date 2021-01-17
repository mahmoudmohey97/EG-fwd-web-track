/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) +'.'+ d.getDate()+'.'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API
const apiKey = 'bf4dfd1ad10154bddca6fa3733b1bbff';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';


/* Function to GET Project Data */
const getAllData = async(url='')=>{
    const rqst = await fetch(url);
    try{
        const data = await rqst.json();
        return data;
    }
    catch(error){
        console.log(error);
    }
}

/* Function to POST data */
const postWeatherData = async(url='', data={})=>{
    const response = await fetch(url, {
        method : 'POST',
        credentials : 'same-origin',
        headers : {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData
      }catch(error) {
      console.log("error", error);
      }
}

/*Function To Update UI */
const updateUI = async (data)=>{
    //Getting Size Of Object To Get Last Element
    const size = data.length;
    recentEntry = data[size - 1];
    document.getElementById('date').innerHTML = 'Date: ' + recentEntry.date;
    document.getElementById('city').innerHTML = 'City: ' + recentEntry.area;
    document.getElementById('temp').innerHTML = 'Temperature: ' + recentEntry.temp;
    document.getElementById('content').innerHTML = 'User Response: ' + recentEntry.userResponse;
}

/*Function To Run Whole Scenario*/
const startFunction = async()=>{
    //Capturing User Input
    const zipCode = document.getElementById('zip').value;
    const userCountry = document.getElementById('city').value;
    //Checking If Zip Code Is Empty
    if(zipCode === ""){
        alert('Please fill zip code field');
        return false;
    }
    const userResponse = document.getElementById('feelings').value;
    
    //Getting Weather Data
    getWeatherData(zipCode, userCountry)
    .then(
        //Adding User Inputs To Our Object
        data => {
        data['zip code'] = zipCode;
        data['date'] = newDate;
        data['user opinion'] = userResponse;
        
        //Posting New Data Then Updating UI
        postWeatherData('/add', data).then(getAllData('/all').then(data => updateUI(data)));
    });
}

/* Function to GET Web API Data*/
const getWeatherData = async (zipCode, userCountry)=>{
    const res = await fetch(baseUrl + zipCode + ',' + userCountry + '&appid=' + apiKey + '&units=metric')
    weatherData = res.json();
    return weatherData;
}


/* Get button Element */
const generateButton = document.getElementById('generate');

/* Function called by event listener */
generateButton.addEventListener('click', startFunction);


/*
function getLocation() {
    if (navigator.geolocation) {
      let x; 
      navigator.geolocation.getCurrentPosition(getWeatherDataAutomatically);
      //console.log(x.coords.longitude);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
}
  
async function getPosition(position) {
    //console.log(position.coords.latitude);
    //console.log(position.coords.longitude);
    return position;
}

const getWeatherDataAutomatically = async (position)=>{
    const res = await fetch(`api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`)
    weatherData = res.json();
    console.log(weatherData);
    return weatherData;
}*/