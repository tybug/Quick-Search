chrome.omnibox.onInputEntered.addListener(loadTab);

const LIMIT = 2; // how many results we load...for some reason we seem to get more accurate results when we load more than one.
// Try using the url to search for "ethos" with a limit of one and a limit of two if you don't believe me.

function loadTab(text){

	$.ajax({
		url: "https://www.google.com/search?q=" + text, success: function(data) {
  			var parser = new DOMParser();
  			var doc = parser.parseFromString(data, "text/html");
  			var links = doc.links;

  			// There appear to be 23 links in the html before we get to our actual first displayed result
  			var url = links[23].getAttribute("href");
  			if(url.substring(0, 1) == "/"){
  				console.log(url);
  				url = links[24].getAttribute("href"); // if the first link is an image. 
  								 // Presumably there won't be more than one image on the first result
  				console.log(url);
  			}
  			chrome.tabs.create({
				url: url
			})
		} 


	});

}