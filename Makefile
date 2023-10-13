prepare:
	cp package-lock.json ./packages/web/package-lock.json
	cp package-lock.json ./packages/server/package-lock.json

dockerweb:
	cd packages/web docker build ./

clean:
	rm ./packages/web/package-lock.json
	rm ./packages/server/package-lock.json

build: prepare dockerweb clean