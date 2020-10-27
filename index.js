// this program was written by Alex Jabbour on oct 26th
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


var links = [{ "name": "Link1", "url": "https://link1"}, 
			{ "name": "Link2", "url": "https://link2"}, 
			{ "name": "Link3", "url": "https://link3"}]


async function handleRequest(request) {
	const url = new URL(request.url);

	// check if the pathname is '/links', if so, then retur the array of links
	if (url.pathname == "/links") {
		console.log("you've hit the links endpoint")
		return new Response( JSON.stringify(links), {
			status: 200,
			headers: {'Content-Type': 'application/json'}
		})
	}

	// A temporary value for text, to be changed when we pull the static-links-page
	let html_text = "Could not pull static-links-page"

	// if path is not '/links', we want to fetch the static-links html page
	let response = await fetch("https://static-links-page.signalnerve.workers.dev")
	if (response.ok) {
		html_text = await response.text()
	}
	

	return new Response(html_text, {
		status: 200,
		headers: { 'content-type': 'application/json' },
	})
}
