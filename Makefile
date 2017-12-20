# pomelo graceful shutdown
# https://github.com/topfreegames/pomelo-graceful-shutdown
#
# Licensed under the MIT license:
# http://www.opensource.org/licenses/mit-license
# Copyright © 2017 Top Free Games <backend@tfgco.com>

setup:
	@npm install && cd example && npm install

run-deps:
	@docker-compose up -d 
	@sleep 10

kill-deps:
	@docker-compose down
	@sleep 3
