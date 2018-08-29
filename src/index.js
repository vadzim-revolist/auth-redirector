import "core-js"

try {
	const path = decodeURIComponent(document.location.pathname + document.location.search)

	do {
		let m

		if (m = /^\/login\?(.+)/.exec(path)) {
			const { 1: url } = m
			if (document.referrer) {
				sessionStorage.setItem("referrer", document.referrer)
				println("redirect to:", url)
				println("return to:", document.referrer)
				redirect(url)
			} else {
				warning('no document.referrer found.')
			}
			break
		}

		if (m = /^\/(\?code=.*)/.exec(path)) {
			const { 1: query } = m
			const referrer = sessionStorage.getItem("referrer")
			if (referrer) {
				sessionStorage.removeItem("referrer")
				const { 1: path, 3: hash } = /^(.*?)(?=\?|#|$)(.*?)(?=#|$)(.*)$/.exec(referrer)
				redirect(path + query + hash)
			} else {
				warning("no return path found.")
			}
			break
		}
	} while (false)

	println("Ok.")
} catch (e) {
	error(e)
}

function println(...args) {
	document.write(args.join(" ").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "<br/>")
}

function warning(...args) {
	console.warn(...args)
	println("WARNING:", ...args)
}

function error(...args) {
	console.error(...args)
	println("ERROR:", ...args)
}

function redirect(url) {
	println("REDIRECT:", url)
	window.location = url
}
