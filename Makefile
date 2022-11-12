.PHONY: help docker-image-build

CURRENT_DIR := $(shell pwd)

help:
	@echo "[ENV SETUP]"

docker-image-build:
	@echo "[Building Docker image]"
	docker build -t xiigrid-docs .
