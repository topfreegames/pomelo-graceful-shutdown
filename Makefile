# pernilongo
# https://github.com/topfreegames/pernilongo
#
# Licensed under the MIT license:
# http://www.opensource.org/licenses/mit-license
# Copyright © 2016 Top Free Games <backend@tfgco.com>

setup:
	@npm install && cd example && npm install

run-deps:
	@docker-compose up -d 
	@sleep 10

kill-deps:
	@docker-compose down
	@sleep 3
