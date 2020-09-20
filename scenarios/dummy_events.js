const chalk = require('chalk')
const util = require('./utils')

console.log(chalk.blue('putting dummy messages on local event stream'))

;(async () => {
  const userId = 123
  console.log('Something Happened')

  await util.seconds(2)
  await util.publish(
    'Something Happened',
    `
      {
        "Id": "123",
        "Timestamp": "${new Date().toJSON()}",
        "SourceEnvironment": "dev",
        "SourceComponent": "WEB",
        "Event": {
          "Name": "Something Happened",
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
    'Hello World',
    `
      {
        "Id": "234",
        "Timestamp": "${new Date().toJSON()}",
        "SourceEnvironment": "dev",
        "SourceComponent": "WEB",
        "Event": {
          "Name": "Hello World",
          "Path": "source/of/event/in/the/code",
          "Data": {
            "UserId": ${userId}
          }
        }
      }
    `
  )
})()
