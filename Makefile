.PHONY: help docker-image-build

CURRENT_DIR := $(shell pwd)

help:
	@echo "[ENV SETUP]"

docker-image:
	@echo "[Building Docker image]"
	docker build -t xiigrid-docs .

docs-watch:
	@echo "[Running Docker XII/Grid docs]"
	docker run --rm -it -v $(CURRENT_DIR):/src klakegg/hugo:ext-ubuntu
