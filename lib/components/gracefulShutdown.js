// pomelo graceful shutdown
// https://github.com/topfreegames/pomelo-graceful-shutdown
//
// Licensed under the MIT license:
// http://www.opensource.org/licenses/mit-license
// Copyright © 2017 Top Free Games <backend@tfgco.com>

const utils = require('pomelo/lib/util/utils')
const logger = require('pomelo-logger').getLogger('pomelo')

module.exports = Component;

function Component (app, opts) {
  if (!(this instanceof Component)) {
    return new Component(app, opts);
  }

  this.app = app
  opts = opts || []
  this.checks = opts.checks || []
  this.signals = opts.signals || ['SIGTERM']
  this.timeout = opts.timeout || 30
  this.before = opts.before
  this.shouldExit = true

  if (opts.shouldExit != undefined) {
    this.shouldExit = opts.shouldExit
  }
}

const doExit = function(app) {
  return app.stop()
}

const shutdownLoop = function(checks, timeout, app, shouldExit, times) {
  let canExit = true
  if (times >= timeout){
    if (shouldExit){
      return doExit(app)
    }
    return
  }
  for (check of checks) {
    res = check()
    if (!res){
      canExit = false
    }
  }
  if (!canExit) {
    setTimeout(() => {
      shutdownLoop(checks, timeout, app, shouldExit, times+1)
    }, 1 * 1000)
  } else {
    if (shouldExit) {
      return doExit(app)
    }
    return
  }
}

const shutdown = function(checks, timeout, app, shouldExit, before, times, signal) {
  logger.warn('gracefully shutting down pomelo with exit code:', signal)
  if (typeof before === 'function') {
    before();
  }
  return shutdownLoop(checks, timeout, app, shouldExit, 0)
}

Component.prototype.start = function(cb) {
  for(signal of this.signals){
    process.on(signal, shutdown.bind(null, this.checks,
      this.timeout, this.app, this.shouldExit,
      this.before, 0))
  }
  utils.invokeCallback(cb)
}

Component.prototype.stop = function (force,cb) {
  utils.invokeCallback(cb)
}

Component.prototype.name = "__graceful_shutdown__"
