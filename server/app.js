const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const routes = require('./routes/blog')
const connectDB = require('./db/connect')
require('dotenv').config()

app.use(bodyparser.json())
app.use('/api/v1/blogs', routes)
app.use(express.static('../client'))

app.get('/', (req, res) => {
    res.send("hello world")
})

const PORT = 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is listening on port ${PORT}`))
    } catch(error) {
        console.log(error)
    }
}

start()