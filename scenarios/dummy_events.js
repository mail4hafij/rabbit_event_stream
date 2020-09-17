const chalk = require('chalk')
const util = require('./utils')

console.log(chalk.blue('putting dummy messages on local event stream'))

;(async () => {
  const userId = 123
  console.log('sending hello world')

  await util.seconds(2)
  await util.publish(
    'hello world event',
    `
      {
        "Id": "123",
        "Timestamp": "${new Date().toJSON()}",
        "SourceEnvironment": "develop",
        "SourceComponent": "WEB",
        "Event": {
          "Name": "hello world",
          "Path": "source/of/event/in/the/code",
          "Data": {
            "UserId": ${userId}
          }
        }
      }
    `
  )
  await util.seconds(2)
  await util.publish(
    'loremipsum event',
    `
      {
        "Id": "123",
        "Timestamp": "${new Date().toJSON()}",
        "SourceEnvironment": "develop",
        "SourceComponent": "WEB",
        "Event": {
          "Name": "loremipsum",
          "Path": "source/of/event/in/the/code",
          "Data": {
            "UserId": ${userId}
          }
        }
      }
    `
  )
})()
