.PHONY: create-project
# make create-project title=project1 parentId=1234567890
create-project:
	npx clasp create --title "$(title)" --rootDir ./ --parentId "$(parentId)"

.PHONY: clone
clone:
	mkdir -p "$(name)" 
	cd "$(name)" && npx clasp clone "$(projectId)"
