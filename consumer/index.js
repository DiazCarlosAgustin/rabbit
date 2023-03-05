const express = require('express')
const cors = require('cors')
const consumeData  = require('./controller/consumer')

const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  consumeData()
  res.send({test: "resolve"})
})



app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})