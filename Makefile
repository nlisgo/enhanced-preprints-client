IMAGE_REPO_PREFIX ?= enhanced-preprints-
GITHASH:=$(shell git log -1 --pretty=format:"%H")
GITSHORTHASH:=$(shell git log -1 --pretty=format:"%H" | head -c 8)
DATETIME:=$(shell date -u '+%Y%m%d.%H%M')
GITBRANCH?=$(shell git branch --show-current)

.PHONY: start-dev start-prod build-storybook-and-push build-prod-and-push node_modules browser-test

start-dev: node_modules
	docker-compose up

start-prod: node_modules
	docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up

node_modules:
	yarn

browser-test: node_modules
	docker-compose -f docker-compose.browsertest.yaml up --wait
	yarn test:browser

build-storybook-and-push:
	docker buildx build \
		-t $(IMAGE_REPO_PREFIX)storybook:latest \
		-t $(IMAGE_REPO_PREFIX)storybook:$(GITHASH) \
		-t $(IMAGE_REPO_PREFIX)storybook:$(GITBRANCH)-$(GITSHORTHASH)-$(DATETIME) \
		 --platform linux/amd64,linux/arm64 --target storybook --push .

build-prod-and-push:
	docker buildx build \
		-t $(IMAGE_REPO_PREFIX)client:latest \
		-t $(IMAGE_REPO_PREFIX)client:$(GITHASH) \
		-t $(IMAGE_REPO_PREFIX)client:$(GITBRANCH)-$(GITSHORTHASH)-$(DATETIME) \
		 --platform linux/amd64,linux/arm64 --target prod --push .
