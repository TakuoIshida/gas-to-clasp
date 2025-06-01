.PHONY: create-project
# make create-project title=project1 parentId=1234567890
create-project:
	npx clasp create --title "$(title)" --rootDir ./ --parentId "$(parentId)"

.PHONY: pull
pull:
	npx clasp pull

# pushして更新する
.PHONY: push
push:
	cp ./src/appsscript.json ./dist/appsscript.json
	npm run build && npx clasp push

# pushで更新したコードをデプロイする
.PHONY: deploy
deploy:
	npx clasp deploy

.PHONY: login
login:
	npx clasp login