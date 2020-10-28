// this program was written by Alex Jabbour on oct 26th

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

var links = [{ "name": "Link1", "url": "https://link1"}, 
			{ "name": "Link2", "url": "https://link2"}, 
			{ "name": "Link3", "url": "https://link3"},
			{ "name": "Link4", "url": "https://link4"}]

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
	if (response.ok) html_text = await response.text()

	if (html_text == "Could not pull static-links-page") {
		return new Response(html_text, {headers: { 'content-type': 'application/json' }})
	}

	// Use HTMLRewriter on incoming html
	return new HTMLRewriter()
		.on("*", new ElementHandler()).transform(await fetch("https://static-links-page.signalnerve.workers.dev"))

	return new Response(html_text, {headers: {'content-type': 'text/html; charset=UTF-8'}})
}

class ElementHandler {
  element(element) {
  	// if the element's style is 'display: none', then we want to change that
    if (element.getAttribute("style") == "display: none") {
    	console.log("display type is none, lets remove that")
    	element.removeAttribute("style")
    }

    if (element.getAttribute("id") == "avatar") {
    	console.log("here is where my avatar should go")
    	element.setAttribute("src","https://user-images.githubusercontent.com/41933907/97404889-2c911500-18cd-11eb-95f8-f7334b806df5.jpg")
    }
  }
}
