Pomelo Graceful Shutdown Component
==================================

### Example Usage

Make pomelo use the component:

```
var GracefulShutdown = require('pomelo-graceful-shutdown')

...
...

app.configure('all', 'connector', function(){
  ...
  ...
  app.use(GracefulShutdown, {
    gracefulShutdown: {
      checks: [
        () => {
          if (app.numRooms > 0) {
            return false;
          }
          return true
        }
      ],
      signals: ['SIGTERM'],
      before: () => {
        console.log("before")
      },
      shouldExit: true,
      timeout: 30,
    }
  })
  ...
  ...
})
```
