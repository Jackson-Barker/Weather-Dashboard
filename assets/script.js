var formBtn = document.querySelector('#user-form')
 var inputValue = document.querySelector('.inputValue')

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

formBtn.addEventListener('submit', function(event){
    event.preventDefault();
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&units=imperial&appid=5dd43b2f8000174a00ba86cc1fc2e731")
    .then(response => response.json())
    .then(data =>{
        
        console.log(data)
         var iconcode = data.weather[0].icon
        var icon = "http://openweathermap.org/img/w/" + iconcode + ".png";
       liveCity.innerHTML=data.name+moment(data.dt,'X').format(' (MM/DD/YYYY)') +"<img src='"+icon+"'/>"
       liveTemp.innerHTML=data.main.temp
       wind.innerHTML=data.wind.speed
       humidity.innerHTML=data.main.humidity

       fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=5dd43b2f8000174a00ba86cc1fc2e731`)
       .then(response => response.json())
       .then(UVData => {
           console.log(UVData)
           UVI.innerHTML=UVData.current.uvi
       })


       fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&units=imperial&appid=5dd43b2f8000174a00ba86cc1fc2e731`)
       .then(response => response.json())
       .then(fiveDayData => {
        // console.log(fiveDayData)
           //i+=8 => i =i +8
           for(var i=2; i < fiveDayData.list.length; i+=8){
               console.log(fiveDayData.list[i])

            //    display date
               fdDate0.innerHTML=fiveDayData.list[2].dt_txt
               fdDate1.innerHTML=fiveDayData.list[10].dt_txt
               fdDate2.innerHTML=fiveDayData.list[18].dt_txt
               fdDate3.innerHTML=fiveDayData.list[26].dt_txt
               fdDate4.innerHTML=fiveDayData.list[34].dt_txt

            //    display temp
               fdTemp0.innerHTML=fiveDayData.list[2].main.temp
               fdTemp1.innerHTML=fiveDayData.list[10].main.temp
               fdTemp2.innerHTML=fiveDayData.list[18].main.temp
               fdTemp3.innerHTML=fiveDayData.list[26].main.temp
               fdTemp4.innerHTML=fiveDayData.list[34].main.temp

            //     display wind
               fdWind0.innerHTML=fiveDayData.list[2].wind.speed
               fdWind1.innerHTML=fiveDayData.list[10].wind.speed
               fdWind2.innerHTML=fiveDayData.list[18].wind.speed
               fdWind3.innerHTML=fiveDayData.list[26].wind.speed
               fdWind4.innerHTML=fiveDayData.list[34].wind.speed

            //    display humidity
               fdHumd0.innerHTML=fiveDayData.list[2].main.humidity
               fdHumd1.innerHTML=fiveDayData.list[10].main.humidity
               fdHumd2.innerHTML=fiveDayData.list[18].main.humidity
               fdHumd3.innerHTML=fiveDayData.list[26].main.humidity
               fdHumd4.innerHTML=fiveDayData.list[34].main.humidity


            // display icon
               var fdiconcode = fiveDayData.list[i].weather[0].icon
        var fdicon = "http://openweathermap.org/img/w/" + fdiconcode + ".png"

               fdIcon0.innerHTML=fiveDayData.list[2].weather[0]+"<img src='"+fdicon+"'/>"
               fdIcon1.innerHTML=fiveDayData.list[10].weather[0]+"<img src='"+fdicon+"'/>"
               fdIcon2.innerHTML=fiveDayData.list[18].weather[0]+"<img src='"+fdicon+"'/>"
               fdIcon3.innerHTML=fiveDayData.list[26].weather[0]+"<img src='"+fdicon+"'/>"
               fdIcon4.innerHTML=fiveDayData.list[34].weather[0]+"<img src='"+fdicon+"'/>"

               
            //    console.log(fiveDayData.list[i].dt_txt)
           }
       })
    })

    .catch(err => alert("City not found"))
})

