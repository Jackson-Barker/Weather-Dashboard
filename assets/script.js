var formBtn = document.querySelector('#user-form')
 var inputValue = document.querySelector('.inputValue')

var liveCity = document.querySelector('.liveCity')
var liveTemp = document.querySelector('.liveTemp')
var wind = document.querySelector('.wind')
var humidity = document.querySelector('.humd')
var UVI = document.querySelector('.UVI')
var formBtn = document.querySelector('#user-form')

var fdDate0 = document.querySelector('.fdDate0')
var fdDate1 = document.querySelector('.fdDate1')


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
            //    console.log(fiveDayData.list[i].dt_txt)
           }
       })
    })

    .catch(err => alert("City not found"))
})

