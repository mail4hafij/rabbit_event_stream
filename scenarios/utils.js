const chalk = require('chalk')
const request = require('superagent')
const utils = {}
utils.publish = function (expl, payload) {
  console.log(chalk.grey(expl))
  return new Promise((resolve, reject) => {
    request
      .post('localhost:1337/publish')
      .send(JSON.parse(payload))
      .end(function (err, res) {
        if (err) {
          console.log(chalk.red(err.toString()))
          return reject(err)
        } else {
          console.log(
            chalk.green(
              `localhost/publish returned a ${res.status} with text: ${res.text}  ${new Date()
                .toTimeString()
                .split(' ')[0]} `
            )
          )
          return resolve()
        }
      })
  })
}
utils.seconds = function (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms * 1000)
  })
}
utils.milliseconds = function (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}
module.exports = utils
