var map;
var chicago = new google.maps.LatLng(41.850033, -87.650052);
var markerCluster;
var doneCreatingMap=false;
var stationsMax=0;
var stationsCount=0;

function createMap() {
	var roadAtlasStyles = [{
      featureType: 'all',
      elementType: 'labels',
      stylers: [{ 
        visibility: 'off'
      }]
    },{
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ 
		    hue: '#6ADAFF'
		  }]
    },{
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{  
        //color: '#6ADAFF'
		}]
  }];

  var mapOptions = {
    zoom: 3,
    center: chicago,
    mapTypeControlOptions: {
      mapTypeIds: []
    }
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var styledMapOptions = {
    name: 'WeatherMap'
  };

  var usRoadMapType = new google.maps.StyledMapType(
      roadAtlasStyles, styledMapOptions);

  map.mapTypes.set('Weather Map', usRoadMapType);
  map.setMapTypeId('Weather Map');
  
}


function lets_hope()
{
		
	$.ajax({
    type: 'GET',
    //url: "http://www.corsproxy.com/www.ndbc.noaa.gov/ndbcmapstations.json",
    url: "data.json",
    success: function( data ) {
      //console.log(stations);
	  var markers = [];
	  
      $.each(data.station, function( key, val ) {
        
        if(val.data == 'y') {
      var id = val.id;
          
          stations.push(marker);
		  var latLng = new google.maps.LatLng(parseFloat(val.lat),
              parseFloat(val.lon));
          var marker = new google.maps.Marker({
            position: latLng,
			icon: {
			url: "images/marker.png",
			}
			});
			google.maps.event.addListener(marker, 'click', function() {
            var id = val.id
			populateInfoWindow(id,"",marker.position.k,marker.position.B,"",marker);
            //stationData(id);
          
          });
          markers.push(marker);
		  
        }
      }
	  );
	  var markerCluster = new MarkerClusterer(map, markers);
    }
  })
}

function hideLogo()
{
	document.getElementById("Rull").style.zIndex=0;
}

function initialize() {
  
  if(doneCreatingMap==true){
  hideLogo();
  createCurrents();

    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = pac-input(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
   pac-input(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
  
  //lets_hope();
  //Init_SPIDER();
  
  
  //UpdateStations();
  buttonListeners();
  }
  else{
  createMap();
  
  addStations();
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

