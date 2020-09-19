const express = require('express')
const rabbit = require('./rabbit')
const bodyParser = require('body-parser')

const PORT = 1337 // PORT for the local web server.
const app = express()

app.use(bodyParser.json())

app.post('/publish', (req, res) => {
  const msg = req.body
  rabbit.publish(msg)
  res.send('Successfully published event to RabbitMQ')
})

app.get('/status', (req, res) => {
  const msg = {
    Id: 'status',
    Timestamp: new Date().toJSON(),
    SourceEnvironment: 'test',
    SourceComponent: 'test',
    Event: {
      Name: 'status'
    }
  }
  try {
    rabbit.publish(msg)
    const responseMsg = 'RabbitMQ is working'
    res.status(200).send(responseMsg)
  } catch (err) {
    const msg = 'RabbitMQ is not working'
    console.log(err)
    res.status(500).send(responseMsg)
    process.exit(1)
  }
})

rabbit
  .init()
  .then(() => {
    app.listen(PORT)
    console.log('Running on http://localhost:' + PORT)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
