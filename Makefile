.PHONY: help docs-build docs-watch

CURRENT_DIR := $(PWD)
XIIGRID_DIR := ~/Developer/xiigrid

help:
	@echo "[ENV SETUP]"

docs-build:
	@echo "[Building Docker image]"
	docker build -t xiigrid-docs .

docs-watch:
	@echo "[Running Docker XII/Grid docs]"
	docker run --rm -it -v ${CURRENT_DIR}/src:/app/src \
		-v ${XIIGRID_DIR}/scss:/app/src/styles \
		-v ${XIIGRID_DIR}/docs:/app/src/content/docs \
		-v ${XIIGRID_DIR}/examples:/app/src/content/examples \
		-p 4321:4321 xiigrid-docs
