const request =require('request')

const forecast = (latitude,longitude,callback) =>{
    const url='http://api.weatherapi.com/v1/current.json?key=1771ea2a116a4b8aa0b91437220404&q='+ latitude + ',' +longitude;

    request({url, json: true}, (error, { body })=>{
        if(error){
                callback('unable to connect',undefined)
        } else if(body.error){
                callback('unable to find location',undefined)
        }else{
                console.log(body.current)
                forcast={
                        temprature : body.current.temp_c,
                        text : body.current.condition.text,
                        image : body.current.condition.icon,
                        humid : body.current.humidity,
                        wind: body.current.wind_kph
                }
                callback(undefined, forcast)
        }
    })

}

module.exports = forecast 