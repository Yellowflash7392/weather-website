const request =require('request')

const geocode= (address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic25laGFsN2NoYW5kcmEiLCJhIjoiY2wxbHgwNmhnMGY1cjNicGplcmtxaHo2aSJ9.wNuZvmrOFPHoeQ8ccae2tA&limit=1'
 
    request({url, json:true}, (error, { body })=>{
       if(error){
          callback('Unable to coneect to location services', undefined)
       }
       else if( body.features.length === 0 ){
             callback('unable to find location', undefined)
       }else{
         //  console.log(response.body.features[0].center);
          callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
          })
       }
    })
 }  

 module.exports= geocode