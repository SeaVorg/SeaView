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

