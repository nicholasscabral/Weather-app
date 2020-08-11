var temperature = document.querySelector('.temperature-value')
var description = document.querySelector('.temperature-description')
var local = document.querySelector('.location')
var inputValue = document.querySelector('.inputValue')
var button = document.querySelector('#button')

button.addEventListener('click', () => {
    try {
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=18154398977a537bd278e8d87bb29dc9')
        .then(res => res.json())
        .then(data => {
            var city = data['name']
            var temp = data['main']['temp']
            var desc = data['weather'][0]['description']
            var country = data['sys']['country']

            local.innerHTML = city + ',' + country
            temperature.innerHTML = temp
            description.innerHTML = desc
        })
    } catch (error) {
        alert(error)
        console.log(error)
    }        
})



