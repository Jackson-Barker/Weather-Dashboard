// search button
var formBtn = document.querySelector('#user-form')
var inputValue = document.querySelector('.inputValue')

// search History 
var cities =[]
var history1 = document.querySelector('.history1')
var history2 = document.querySelector('.history2')
var history3 = document.querySelector('.history3')

// current weather
var liveCity = document.querySelector('.liveCity')
var liveTemp = document.querySelector('.liveTemp')
var wind = document.querySelector('.wind')
var humidity = document.querySelector('.humd')
var UVI = document.querySelector('.UVI')
var formBtn = document.querySelector('#user-form')

// Five day forecast dates
var fdDate0 = document.querySelector('.fdDate0')
var fdDate1 = document.querySelector('.fdDate1')
var fdDate2 = document.querySelector('.fdDate2')
var fdDate3 = document.querySelector('.fdDate3')
var fdDate4 = document.querySelector('.fdDate4')

// five day forecast temp
var fdTemp0 = document.querySelector('.fdTemp0')
var fdTemp1 = document.querySelector('.fdTemp1')
var fdTemp2 = document.querySelector('.fdTemp2')
var fdTemp3 = document.querySelector('.fdTemp3')
var fdTemp4 = document.querySelector('.fdTemp4')

// five day forecast icon
var fdIcon0 = document.querySelector('.fdIcon0')
var fdIcon1 = document.querySelector('.fdIcon1')
var fdIcon2 = document.querySelector('.fdIcon2')
var fdIcon3 = document.querySelector('.fdIcon3')
var fdIcon4 = document.querySelector('.fdIcon4')

// five day forecast wind
var fdWind0 = document.querySelector('.fdWind0')
var fdWind1 = document.querySelector('.fdWind1')
var fdWind2 = document.querySelector('.fdWind2')
var fdWind3 = document.querySelector('.fdWind3')
var fdWind4 = document.querySelector('.fdWind4')

// five day forecast humidity 
var fdHumd0 = document.querySelector('.fdHumd0')
var fdHumd1 = document.querySelector('.fdHumd1')
var fdHumd2 = document.querySelector('.fdHumd2')
var fdHumd3 = document.querySelector('.fdHumd3')
var fdHumd4 = document.querySelector('.fdHumd4')

// button and fetch for current weather
formBtn.addEventListener('submit', function(event){
    event.preventDefault();
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&units=imperial&appid=5dd43b2f8000174a00ba86cc1fc2e731")
    .then(response => response.json())
    .then(data =>{
        
        console.log(data)
        // icon fetch, date conversion
        var iconcode = data.weather[0].icon
        var icon = "http://openweathermap.org/img/w/" + iconcode + ".png";
       liveCity.innerHTML=data.name+moment(data.dt,'X').format(' (MM/DD/YYYY)') +"<img src='"+icon+"'/>"
       liveTemp.innerHTML=data.main.temp+'°F'
       wind.innerHTML='Wind speed '+data.wind.speed+' mph'
       humidity.innerHTML=data.main.humidity+'% Humidity'

    //    UV index fetch
       fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=5dd43b2f8000174a00ba86cc1fc2e731`)
       .then(response => response.json())
       .then(UVData => {
           console.log(UVData)
             UVI.innerHTML='UV index: '+UVData.current.uvi
        })

        // forecast fetch
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&units=imperial&appid=5dd43b2f8000174a00ba86cc1fc2e731`)
    .then(response => response.json())
    .then(fiveDayData => {
        // console.log(fiveDayData)
           //i+=8 => i =i +8 to display ever 24 hours
        for(var i=2; i < fiveDayData.list.length; i+=8){
            console.log(fiveDayData.list[i])

            //display date
            fdDate0.innerHTML=fiveDayData.list[2].dt_txt
            fdDate1.innerHTML=fiveDayData.list[10].dt_txt
            fdDate2.innerHTML=fiveDayData.list[18].dt_txt
            fdDate3.innerHTML=fiveDayData.list[26].dt_txt
            fdDate4.innerHTML=fiveDayData.list[34].dt_txt

            //    display temp
            fdTemp0.innerHTML=fiveDayData.list[2].main.temp+'°F'
            fdTemp1.innerHTML=fiveDayData.list[10].main.temp+'°F'
            fdTemp2.innerHTML=fiveDayData.list[18].main.temp+'°F'
            fdTemp3.innerHTML=fiveDayData.list[26].main.temp+'°F'
            fdTemp4.innerHTML=fiveDayData.list[34].main.temp+'°F'

            //display wind
            fdWind0.innerHTML='Wind speed '+fiveDayData.list[2].wind.speed+' mph'
            fdWind1.innerHTML='Wind speed '+fiveDayData.list[10].wind.speed+' mph'
            fdWind2.innerHTML='Wind speed '+fiveDayData.list[18].wind.speed+' mph'
            fdWind3.innerHTML='Wind speed '+fiveDayData.list[26].wind.speed+' mph'
            fdWind4.innerHTML='Wind speed '+fiveDayData.list[34].wind.speed+' mph'

            //display humidity
            fdHumd0.innerHTML=fiveDayData.list[2].main.humidity+'% Humidity'
            fdHumd1.innerHTML=fiveDayData.list[10].main.humidity+'% Humidity'
            fdHumd2.innerHTML=fiveDayData.list[18].main.humidity+'% Humidity'
            fdHumd3.innerHTML=fiveDayData.list[26].main.humidity+'% Humidity'
            fdHumd4.innerHTML=fiveDayData.list[34].main.humidity+'% Humidity'


            // display icon
            fdIcon0.innerHTML=`<img src="http://openweathermap.org/img/wn/${fiveDayData.list[2].weather[0].icon}@2x.png"/>`
            fdIcon1.innerHTML=`<img src="http://openweathermap.org/img/wn/${fiveDayData.list[10].weather[0].icon}@2x.png"/>`
            fdIcon2.innerHTML=`<img src="http://openweathermap.org/img/wn/${fiveDayData.list[18].weather[0].icon}@2x.png"/>`
            fdIcon3.innerHTML=`<img src="http://openweathermap.org/img/wn/${fiveDayData.list[26].weather[0].icon}@2x.png"/>`
            fdIcon4.innerHTML=`<img src="http://openweathermap.org/img/wn/${fiveDayData.list[34].weather[0].icon}@2x.png"/>`
            }
        })
    })
    // city not found error
    .catch(err => alert("City not found"))
    
    // search history
    cities.push(inputValue.value)
    localStorage.setItem("Cities", JSON.stringify(cities));
    var returnedCities = localStorage.getItem("Cities")
    var cities2 = JSON.parse(returnedCities)
    var cities3 = cities2.reverse()

    history3.innerHTML=history2.innerHTML
    history2.innerHTML=history1.innerHTML
    history1.innerHTML=cities3[0]

})










