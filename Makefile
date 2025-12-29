# Copyright (c) Datalayer, Inc. https://datalayer.io
# Distributed under the terms of the MIT License.

SHELL=/bin/bash

ENV_NAME=datalayer

.DEFAULT_GOAL := default

.SILENT: init

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: help ## default target is help

env: warning ## env
	conda env create -y -n ${ENV_NAME} -f environment.yml
	@exec echo "-------------------------------------------------------"
	@exec echo "conda activate ${ENV_NAME}"
	@exec echo "-------------------------------------------------------"

env-rm: warning ## env-rm
	conda deactivate && \
	conda remove -y --name ${ENV_NAME} --all || true

kill:
	npm kill

warning:
	echo "\x1b[34m\x1b[43mEnsure you have run \x1b[1;37m\x1b[41m conda deactivate \x1b[22m\x1b[34m\x1b[43m before invoking this.\x1b[0m"

clean: ## clean
	npm clean

build: ## build
	npm run build

build-webpack: ## build-webpack
	npm run build:webpack

build-webpack-prod: ## build-webpack-prod
	rm -fr ./dist
	npm run build:webpack:prod

build-prod: ## build-prod
	git clean -fdx
	python -m build

publish-npm: clean build ## publish
	npm publish
	echo open https://www.npmjs.com/package/@datalayer/jupyter-viewer

build-docker: ## build the image.
	docker build \
	  -t datalayer/jupyter-viewer:0.0.1 \
	  -f Dockerfile \
	  .

push-docker: ## push the image.
	docker push \
	  datalayer/jupyter-viewer:0.0.1

start-docker: ## start the container.
	echo open http://localhost:8888/jupyter_viewer
	docker run \
	  -it \
	  --rm \
	  --name jupyter-viewer \
	  -p 8888:8888 \
	  datalayer/jupyter-viewer:0.0.1

connect-docker: ## connect to the container.
	docker exec -it jupyter-viewer bash

logs-docker: ## show container logs.
	docker logs jupyter-viewer -f

stop-docker: ## stop the container.
	docker stop jupyter-viewer

rm-docker: ## remove the container.
	docker rm -f jupyter-viewer

publish: build-webpack-prod ## publish
	( sed -i.bu "s|http://localhost:3063||g" ./dist/index.html && \
	  aws s3 rm \
		s3://datalayer-viewer/ \
		--recursive \
		--profile datalayer && \
	  aws s3 cp \
		./dist \
		s3://datalayer-viewer/ \
		--recursive \
		--profile datalayer && \
	  aws cloudfront create-invalidation \
		--distribution-id E1BK7NGENPR3RM \
		--paths "/*" \
		--profile datalayer && \
	echo open ✨  https://viewer.datalayer.tech )

clean: ## clean
	npm run clean

publish-npm: clean build ## publish-npm
	npm publish
	echo open https://www.npmjs.com/package/@datalayer/jupyter-viewer
