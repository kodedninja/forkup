# forkup
Updater for forked Beaker sites. It simply checks the version in ```package.json``` and downloads a set of files from the upstream.

## installation
```
npm i -S forkup
```

## example
package.json:
```javascript
{
	"update": {
		"url": "dat://b89507488b68892978dcdc6cb32e21040b2cd0fdcd304c502e17289aad10d95e/",
		"files": [
			"/bundle.js"
		]
	}
}

```
Somewhere in your project:
```javascript
const update = require('forkup')

update() // with package.json (recommended)
update('dat://b89507488b68892978dcdc6cb32e21040b2cd0fdcd304c502e17289aad10d95e/', ['/bundle.js']) // alternatively, without package.json (not recommended)
```

## usage
Add an ```"update"``` field to your ```package.json``` (located in the root folder).
```javascript
{
	"update": {
		"url": "<upstream dat url>",
		"files": [
			"<file>",
			"<file>"
		]
	}
}
```

I usually add an ```/update``` route to my Choo pages that calls this method. [See in solo](https://github.com/kodedninja/solo/blob/master/src/index.js#L57).

## api
### ```forkup([dat_url, files])```
Parameters required only if not using ```package.json```. Updates every file in ```files``` if the version is less then the version at ```dat_url``` (the URL of the upstream site).
