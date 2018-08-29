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
  			var i = 23;
  			var url = links[i].getAttribute("href");
  			while(url.substring(0, 1) == "/"){
  				// If the link is a relative url; ie "showing results for", "search instead for", or an image, then skip it
  				i++;
  				url = links[i].getAttribute("href"); 
  			}

        	chrome.tabs.update({
				url: url
        	})

  			
		} 


	});

}