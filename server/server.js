import express from 'express';
require('dotenv').config()
import cors from 'cors'
import initRoutes from './src/routes'
import connectDB from './src/config/connect'
const twilio = require('twilio')

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST","GET","PUT","DELETE"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
initRoutes(app)
connectDB()

const port = process.env.PORT || 8888


const listener =  app.listen(port, () => {
    console.log(`ervers is running on the port ${listener.address().port}`);
})