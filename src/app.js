const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

const app= express()
const port = process.env.PORT || 3000

// Define paths for expres conifg
const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Snehal Chandra'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About',
        name:'Snehal Chandra'     
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        helptext: 'Try searching for some place which exist or do not search for empty field',
        title: 'Help',
        name: 'Snehal Chandra'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send ({
            error: 'You must provide an address!'
        })
    }
 
    geocode(req.query.address, (error, { latitude, longitude, location} = {} )=>{

        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Snehal Chandra',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        name: 'Snehal Chandra',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})