.PHONY: help build watch

CURRENT_DIR := $(PWD)
# Configure path to SCSSLEON directory here
SCSSLEON_DIR := ~/Developer/my/scssleon

help:
	@echo "[ENV SETUP]"

build:
	@echo "[Building Docker image]"
	docker build -t scssleon-docs .

watch:
	@echo "[Running Docker SCSSLEON docs]"
	docker run --rm -it \
		-v ${CURRENT_DIR}/public:/app/public \
		-v ${CURRENT_DIR}/src:/app/src \
		-v ${SCSSLEON_DIR}/scss:/app/src/styles/scss \
		-p 4321:4321 scssleon-docs