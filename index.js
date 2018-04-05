const check = require('./check')
const update = require('./update')

module.exports = async function (source, files) {
	var archives = await check()

	if (archives !== false) {
		update(archives, files)
	}
}
