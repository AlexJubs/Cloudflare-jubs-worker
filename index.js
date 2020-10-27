// this program was written by Alex Jabbour on oct 26th
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
	const url = new URL(request.url);

	// check if the pathname is '/links'
	

	console.log(url.pathname)

	return new Response("works \n", {
		headers: { 'content-type': 'application/json' },
	})
}

var links = [{ "name": "Link1", "url": "https://link1"}, 
			{ "name": "Link2", "url": "https://link2"}, 
			{ "name": "Link3", "url": "https://link3"}]

