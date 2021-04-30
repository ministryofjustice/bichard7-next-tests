.PHONY: build
build:
	docker build -t e2etests .

.PHONY: setup-e2e-tests
setup-e2e-tests:
	bash ./scripts/setup-e2e-tests.sh