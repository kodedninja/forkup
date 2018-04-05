const parse = require('parse-dat-url')

module.exports = async function check(source) {
	var upstream, archive

	const fork_url = parse(window.location.href)

	if (fork_url.protocol == 'dat:' || fork_url.protocol == 'workspace:') {
		archive = new DatArchive(fork_url.origin + '/')
		return await try_check()
	}

	async function try_check() {
		var info = await archive.getInfo()
		if (info.isOwner) {
			const fork_json = await get_package_json(archive)

			if (fork_json.update) source = fork_json.update.url || source

			upstream = new DatArchive(source)
			const upstream_json = await get_package_json(upstream)

			if (fork_json && upstream_json) {
				if (fork_json.version < upstream_json.version) {
					return [archive, upstream, fork_json, upstream_json]
				}
			}
		}
		return false
	}

	async function get_package_json(archive) {
		try {
			var json = await archive.readFile('/package.json')
			json = JSON.parse(json)
			return json
		} catch (e) {
			console.error("There's no valid package.json in the root directory of " + archive.url)
			return null
		}
	}
}
