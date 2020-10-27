addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {

	return new Response('Works!', {
		headers: { 'content-type': 'application/json' },
	})
}

var links = [{ "name": "Link1", "url": "https://link1"}, 
			{ "name": "Link2", "url": "https://link2"}, 
			{ "name": "Link3", "url": "https://link3"}]

