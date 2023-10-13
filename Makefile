prepare:
	cp package-lock.json ./packages/web
	cp package-lock.json ./packages/server

dockerweb:
	cd packages/web docker build ./

clean:
	rm package-lock.json ./packages/web/package-lock.json
	rm package-lock.json ./packages/server/package-lock.json

build: prepare dockerweb clean