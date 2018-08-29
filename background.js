chrome.omnibox.onInputEntered.addListener(loadTab);

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