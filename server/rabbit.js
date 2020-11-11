const amqp = require('amqplib/callback_api')
const rabbit = {}

rabbit.init = function () {
  return new Promise((resolve, reject) => {
    tryConnect(resolve)
  })
}

rabbit.publish = function (msg) {
  rabbit.conn.createChannel((err, ch) => {
    if (err) throw err
    const jsonPayload = JSON.stringify(msg)
    const ex = 'rabbit_event_stream'
    ch.assertExchange(ex, 'fanout', { durable: true })
    ch.publish(ex, '', Buffer.from(jsonPayload), { persistent: true })
    console.log(`Published '${jsonPayload}' to the rabbit event stream`)
  })
}

// PRODUCTION: amqps://username:password@host.com:port
function tryConnect (resolve, attempt = 0) {
  // TODO: should read from the environment variables (RABBITMQ_HOSTNAME, RABBITMQ_USER, RABBITMQ_PASSWORD).
  amqp.connect('amqp://admin:admin@rabbit', (err, conn) => {
    if (err) {
      console.log(err)
      if (attempt < 10) {
        return setTimeout(() => {
          const nextAttempt = attempt + 1
          console.log(
            `connection failed, re-trying in 3 seconds attempt ${nextAttempt}/10`
          )
          tryConnect(resolve, nextAttempt)
        }, 3000)
      } else {
        throw err
      }
    }
    rabbit.conn = conn
    console.log(`connected to rabbit attempt ${attempt}/10`)
    resolve()
  })
}

module.exports = rabbit