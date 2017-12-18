# pernilongo
# https://github.com/topfreegames/pernilongo
#
# Licensed under the MIT license:
# http://www.opensource.org/licenses/mit-license
# Copyright © 2016 Top Free Games <backend@tfgco.com>

setup:
	@npm install

killall: kill-game-server kill-deps

run-example:
	@POMELO_REDIS_PORT=7677 node example/app.js host=127.0.0.1 port=3334 clientPort=3010 frontend=true serverType=connector

kill-game-server:
	@ps aux | egrep 'example/app.js' | egrep -v egrep | awk ' { print $$2 } ' | xargs kill -9

run-deps:
	@docker-compose up -d 
	@sleep 10

kill-deps:
	@docker-compose down
	@sleep 3
