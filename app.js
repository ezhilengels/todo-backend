const express = require('express')
const mongoose = require('mongoose');
const app = express()
require('dotenv').config()
const taskRoutes = require('./routes/taskRote')
const userRoutes = require('./routes/user')
const cors = require('cors')

const port = process.env.PORT || 8000
app.use((req, res, next) =>{
  next()
})
app.use(cors())
app.use(express.json())
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('DB connected sucesfully and server running in port ' + port)
    })
  })

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

app.use('/api/user', userRoutes)
app.use('/api/tasks', taskRoutes)

