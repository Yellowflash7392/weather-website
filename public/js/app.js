const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')


weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.src = ''
    messageFive.textContent = ''
    messageSix.textContent = ''

    fetch('/weather?address=' + location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.temprature+" C"
            messageThree.textContent = data.forecast.text
            messageFour.src = data.forecast.image
            messageFive.textContent = "Humidity " + data.forecast.humid + "%"
            messageSix.textContent = "Wind " + data.forecast.wind + "km/h"
    
        }
     })
   })
})