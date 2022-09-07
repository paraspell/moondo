.PHONY: installAxelarGMP
installAxelarGMP: 
	cd moondo-Axelar-GMP && cp .env.example .env && npm i && npm run local-dev:start


.PHONY: deployAxelarContracts

deployAxelarContracts:
	cd moondo-Axelar-GMP && npm run contracts:build && npm run contracts:deploy
	npm run serve

.PHONY: relaunchAxelar

relaunchAxelar:
	cd moondo-Axelar-GMP && npm run local-dev:start