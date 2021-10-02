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
               fdDate0.innerHTML=fiveDayData.list[2].dt_txt
               fdDate1.innerHTML=fiveDayData.list[10].dt_txt
               fdDate2.innerHTML=fiveDayData.list[18].dt_txt
               fdDate3.innerHTML=fiveDayData.list[26].dt_txt
               fdDate4.innerHTML=fiveDayData.list[34].dt_txt

               fdTemp0.innerHTML=fiveDayData.list[2].main.temp
               fdTemp1.innerHTML=fiveDayData.list[10].main.temp
               fdTemp2.innerHTML=fiveDayData.list[18].main.temp
               fdTemp3.innerHTML=fiveDayData.list[26].main.temp
               fdTemp4.innerHTML=fiveDayData.list[34].main.temp

               
            //    console.log(fiveDayData.list[i].dt_txt)
           }
       })
    })

    .catch(err => alert("City not found"))
})

