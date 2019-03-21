var map;
var infowindow;
var service;
var search;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 46.619261, lng: -33.134766 },
        zoom: 3,
        mapTypeId: 'roadmap'
    });

    var searchBox = new google.maps.places.SearchBox(document.getElementById('placeSearch'));

    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        var bounds = new google.maps.LatLngBounds();
        var i, place;
        for (i = 0; place = places[i]; i++) {
            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
        map.setZoom(15);
    });

    service = new google.maps.places.PlacesService(map);

    function searchPlaces(){
            search = {
            bounds: map.getBounds(),
            types: ['restaurant']
        };
    service.nearbySearch(search, listResults);
    }
    
    infowindow = new google.maps.InfoWindow();
    
    google.maps.event.addListener(map, 'click', function(){
        searchPlaces();
    });

}


function listResults(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
}

