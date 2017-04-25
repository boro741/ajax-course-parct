
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    
    
   /* var streetStr = $("#street").val();
  var cityStr = $("#city").val();
  var address = streetStr + ", " + cityStr;
  $greeting.text('So you want to live at ' + address + '?');
  var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address + '';
  $("body").append('<img class="bgimg" src="'streetViewURL'">'); */
    
    
    var street = $('#street').val();
    var city = $('#city').val();
    
    
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=street+%2c+city" >');
    //alert($street+$city);
    
    // Making AJAX request to NYT
    
      var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?=' + city + '&sort=newest&api-key=758718ccf8e3493585e97f37d5b22c28';
    
      $.getJSON(nytimesUrl, function(data){
          $nytHeaderElem.text('New York Times Articles About '+ city);
          
          articles = data.response.docs;
          for(var i = 0; i < articles.length; i++) {
            var article = articles[i];
              $nytElem.append('<li class="article">'+
                             '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                             '<p>'+ article.snippet + '</p>'+ '</li>');
          }
      }).error(function(){
         $nytHeaderElem.text('New York Times Articles Could Not Be Loaded'); 
      });
    
     // Loading Wikipedia articles
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+city+'&format=json&callback=wikiCallback';
    
    // Why does this variable runs?
    // We didn't even called it?
    
    // Reason:
    
    /*
     var hello = (function(){
      console.log("Hello");  
    })();
    */
    
    /*
        We are assigning the immediately invoked function
        a name - setTimeout
    */
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("Failed to get wikipedia resource");
    },8000);
    
    /*var hello = function(){
            console.log("Hello World");
    };*/
    
   
    
    $.ajax( {
    url: wikiUrl,
    dataType: 'jsonp',
    success: function(response) {
       var articleList = response[1];
        
        for(var i=0;i<articleList.length; i++) {
            articleStr = articleList[i];
            //console.log('articleStr: '+articleStr);
            var url='http://en.wikipedia.org/wiki/'+articleStr;
           // console.log('url: '+url);
            //                             |
            //                             V  it's because I want to include " as href uses it.
            $wikiElem.append('<li><a href=" ' + url + ' "> ' +articleStr + '</a></li>');
        //                  (|              |)       (|    |)             (|         |) 
        };
        
        clearTimeout(wikiRequestTimeout);
    }
} );
    
    
    return false;
};


$('#form-container').submit(loadData);
