const request =require('request')

const forecast = (latitude,longitude,callback) =>{
    const url='http://api.weatherapi.com/v1/current.json?key=1771ea2a116a4b8aa0b91437220404&q='+ latitude + ',' +longitude;

    request({url, json: true}, (error, { body })=>{
        if(error){
                callback('unable to connect',undefined)
        } else if(body.error){
                callback('unable to find location',undefined)
        }else{
                callback(undefined, 'temperature is currently ' + body.current.temp_c)
        }
    })

}

module.exports = forecast 