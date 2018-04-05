module.exports = async function (input, files) {
	var archive = input[0]
	var upstream = input[1]
	var fork_json = input[2]
	var upstream_json = input[3]

	if (upstream_json.update) files = upstream_json.update.files || files

	files.map(update_file)

	fork_json.version = upstream_json.version
	await archive.writeFile('/package.json', JSON.stringify(fork_json, null, '  '))

	async function update_file(file) {
		var upstream_content = await upstream.readFile(file)
		await archive.writeFile(file, upstream_content)
		console.log(file + ' was updated.')
	}
}
