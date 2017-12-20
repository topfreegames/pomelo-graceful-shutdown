// pomelo graceful shutdown
// https://github.com/topfreegames/pomelo-graceful-shutdown
//
// Licensed under the MIT license:
// http://www.opensource.org/licenses/mit-license
// Copyright © 2017 Top Free Games <backend@tfgco.com>

const pomelo = require('pomelo')
const GracefulShutdown = require('pomelo-graceful-shutdown')

/**
 * Init app for client.
 */
const app = pomelo.createApp()
app.set('name', 'gsd_example')

// configure monitor
app.configure('all', function(){
  app.set('monitorConfig',
    {
      monitor : pomelo.monitors.redismonitor,
      redisNodes: {
        host: process.env.POMELO_REDIS_HOST || "127.0.0.1",
        port: process.env.POMELO_REDIS_PORT || "7677",
      },
    }
  )
})

// app configuration
app.configure('all', 'game', function(){
  app.numRooms = 0
  app.use(GracefulShutdown, {
    gracefulShutdown: {
      checks: [
        () => {
          if (app.numRooms > 0) {
            return false
          }
          return true
        }
      ],
      signals: ['SIGTERM'],
      before: () => {
        console.log("before")
      },
      shouldExit: false,
      timeout: 60,
    },
  })
})

// app configuration
app.configure('all', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true,
    })
})

// start app
app.start()

process.on('uncaughtException', function (err) {
  console.error('Caught exception: ' + err.stack)
})
