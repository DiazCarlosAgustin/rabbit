const express = require('express')
const cors = require('cors')
const sendMessages = require('./controller/sender')

const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => { })

sendMessages()
app.listen(3050, () => {
  console.log('Example app listening on port 3050!')
})