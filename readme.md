# forkup
Updater for forked Beaker sites

## installation
```
npm i -S forkup
```

## example
```javascript
const update = require('forkup')

update('dat://b89507488b68892978dcdc6cb32e21040b2cd0fdcd304c502e17289aad10d95e/', ['/bundle.js'])
```

## usage
Add a ```version.txt``` file to your site's root folder that uses any kind of lexicographic order versioning and then call forked whenever you want.

I usually add an ```/update``` route to my Choo pages that calls this method.

## api
### ```forkup(dat_url, files)```
Updates every file in ```files``` if the version is less then the version at ```dat_url``` (the URL of the upstream site).
