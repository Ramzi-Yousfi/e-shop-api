const bodyParser = require('body-parser')
const express = require('express')
const {default: mongoose} = require('mongoose')
const morgan = require('morgan')
require('dotenv/config')
const productsRouter = require('./routes/products')
const categoryRouter = require('./routes/category')


// environment variable
const api = process.env.API_URL
const userName = process.env.ESHOPUSER
const password = process.env.PASSWORD

const app = express()

//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

// middleware routes
app.use(`${api}/products`, productsRouter)
app.use(`${api}/category`, categoryRouter)
mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.mlerexi.mongodb.net/eshop?retryWrites=true&w=majority`)
    .then(() => {
        console.log('database connected');
    })
    .catch((err) => {
        console.error(err)
    })
app.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
})