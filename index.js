const parse = require('parse-dat-url')

module.exports = function forkup(source, files) {
	var upstream, archive

	const fork_url = parse(window.location.href)

	if (fork_url.protocol == 'dat:' || fork_url.protocol == 'workspace:') {
		archive = new DatArchive(fork_url.origin + '/')
		try_update()
	}

	async function try_update() {
		var info = await archive.getInfo()
		if (info.isOwner) update()
	}

	async function update() {
		const fork_json = await get_package_json(archive)

		if (fork_json.update) source = fork_json.update.url || source

		upstream = new DatArchive(source)
		const upstream_json = await get_package_json(upstream)

		if (fork_json && upstream_json) {
			if (fork_json.version >= upstream_json.version) {
				console.log('Already using the latest version.')
				return
			}

			if (upstream_json.update) files = upstream_json.update.files || files

			files.map(update_file)

			fork_json.version = upstream_json.version
			await archive.writeFile('/package.json', JSON.stringify(fork_json, null, '  '))
		}
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

	async function update_file(file) {
		var upstream_content = await upstream.readFile(file)
		await archive.writeFile(file, upstream_content)
		console.log(file + ' was updated.')
	}
}
