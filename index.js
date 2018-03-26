module.exports = function forkup(source, files) {
	var upstream, archive

	try {
		archive = new DatArchive(window.location.origin + '/')
		try_update()
	} catch (e) {
		// not Beaker
	}

	async function try_update() {
		var info = await archive.getInfo()
		if (info.isOwner) update()
	}

	async function update() {
		upstream = new DatArchive(source)

		try {
			var cver = await archive.readFile('/version.txt')
			var over = await upstream.readFile('/version.txt')

			if (over > cver) {
				files.map(update_file)
				archive.writeFile('/version.txt', over)
			} else {
				console.log('Already at latest version.')
			}
		} catch (e) {
			console.error('No version.txt file found.')
		}

	}

	async function update_file(file) {
		var upstream_content = await upstream.readFile(file)
		await archive.writeFile(file, upstream_content)
		console.log(file + ' was updated.')
	}
}
