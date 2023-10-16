codegen:
	npx grqphql-codegen

start-server:
	npx tsc && node ./dist/src/index.js
