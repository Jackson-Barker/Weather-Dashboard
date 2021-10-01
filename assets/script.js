var button = document.querySelector('.btn')
var inputValue = document.querySelector('.inputValue')
var location = document.querySelector('.location')
var temp = document.querySelector('.temp')
var wind = document.querySelector('wind')
var humidity = document.querySelector('.humd')
var UVI = document.querySelector('.UVI')

button.addEventListener('click', function(){
    fetch(papi.openweathermap.org/data/2.5/weather?q={inputValue}&appid={5dd43b2f8000174a00ba86cc1fc2e731})
    .then(response => response.json())
    .then(data => console.log(data))

    .catch(err => alert("City not found"))
})