var map;

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
    
    
}