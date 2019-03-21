var map;
var infowindow;
var service;
var search;
var markers = [];
var placeType;

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
    
    
    
    infowindow = new google.maps.InfoWindow();
    
    google.maps.event.addListener(map, 'click', function(){
        selection();
    });

}

function selection() {
    if ($('#hotels').hasClass('selected')){
        placeType = ['lodging'];
    }
    else if ($('#bars').hasClass('selected')){
        placeType = ['bar'];
    }
     else if ($('#restaurants').hasClass('selected')){
        placeType = ['restaurant'];
    }
     else if ($('#atm').hasClass('selected')){
        placeType = ['atm'];
    }
     else if ($('#museum').hasClass('selected')){
        placeType = ['museum'];
    }
     else if ($('#movie_theater').hasClass('selected')){
        placeType = ['movie_theater'];
    }
     else if ($('#zoo').hasClass('selected')){
        placeType = ['zoo'];
    }
     else if ($('#art_gallery').hasClass('selected')){
        placeType = ['art_gallery'];
    }
    searchPlaces();
}

function searchPlaces(){
            search = {
            bounds: map.getBounds(),
            types: placeType
        };
    service.nearbySearch(search, listResults);
    }

function listResults(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        clearMarker();
        for (var i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
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
                return marker;
}

function clearMarker(marker) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}
