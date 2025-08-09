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
	docker run --rm -it -v ${CURRENT_DIR}:/app scssleon-docs npm i
	docker run --rm -it \
			-e ASTRO_TELEMETRY_DISABLED=1 \
			-v ${CURRENT_DIR}:/app \
			-v ${SCSSLEON_DIR}/scss:/app/src/styles/scss \
			-p 4321:4321 scssleon-docs npm run dev