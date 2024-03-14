.PHONY: help docs-build docs-watch

CURRENT_DIR := $(PWD)
# Configure path to SCSSleon directory here
SCSSLEON_DIR := ~/Developer/scssleon

help:
	@echo "[ENV SETUP]"

docs-build:
	@echo "[Building Docker image]"
	docker build -t scssleon-docs .

docs-watch:
	@echo "[Running Docker XII/Grid docs]"
	docker run --rm -it -v ${CURRENT_DIR}/src:/app/src \
		-v ${SCSSLEON_DIR}/scss:/app/src/styles \
		-v ${SCSSLEON_DIR}/docs:/app/src/content/docs \
		-v ${SCSSLEON_DIR}/examples:/app/src/content/examples \
		-p 4321:4321 scssleon-docs
