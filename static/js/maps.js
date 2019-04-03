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

    google.maps.event.addDomListener(document.getElementById("showMe"), 'click', selection);
}

function selection() {
    if ($('#hotels').hasClass('selected')) {
        placeType = ['lodging'];
    }
    else if ($('#bars').hasClass('selected')) {
        placeType = ['bar'];
    }
    else if ($('#restaurants').hasClass('selected')) {
        placeType = ['restaurant'];
    }
    else if ($('#atm').hasClass('selected')) {
        placeType = ['atm'];
    }
    else if ($('#museum').hasClass('selected')) {
        placeType = ['museum'];
    }
    else if ($('#movie_theater').hasClass('selected')) {
        placeType = ['movie_theater'];
    }
    else if ($('#zoo').hasClass('selected')) {
        placeType = ['zoo'];
    }
    else if ($('#art_gallery').hasClass('selected')) {
        placeType = ['art_gallery'];
    }
    searchPlaces();
}

function searchPlaces() {
    search = {
        bounds: map.getBounds(),
        types: placeType
    };
    service.nearbySearch(search, listResults);
}

function listResults(results, status) {
    clearMarker();
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
        }
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', showDetails)

    function showDetails() {
        var detailsSearch = { placeId: place.place_id, };

        service.getDetails(detailsSearch, function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
           /* var infoName = '<strong>' + place.name + '</strong>';
            var infoAddress = place.formatted_address;
            var infoPhoneNumber = '<strong>' + place.formatted_phone_number + '</strong>';
            var infoWeblink = '<a href="' + place.website + '" target="blank">' + 'Visit website' + '</a>';
            var infoPlaceRating = '<strong>' + 'Rating: ' + place.rating + '/5' + '</strong>';
            
            function checkValidDetails() {
                if (!place.formatted_address) {
                    infoAddress = 'No address available';
                }
                if (!place.formatted_phone_number) {
                    infoPhoneNumber = 'No phone number available';
                }
                if (!place.website) {
                    infoWeblink = 'No website available';
                }
                if (!place.rating) {
                    infoPlaceRating = 'No rating available';
                }
            }
            checkValidDetails();
            function setPlaceInfo() {
                document.getElementById('placeHeading').textContent = infoName;
                document.getElementById('placeAddress').textContent = infoAddress;
                document.getElementById('placePhone').textContent = infoPhoneNumber;
                document.getElementById('placeWebsite').textContent = infoWeblink;
                document.getElementById('placeRating').textContent = infoPlaceRating;
            }*/
            function setPlaceInfo() {
                document.getElementById('placeHeading').textContent = place.name;
                document.getElementById('placeAddress').textContent = place.formatted_address;
                document.getElementById('placePhone').textContent = place.formatted_phone_number;
                document.getElementById('placeWebsite').textContent = place.website;
                document.getElementById('placeRating').textContent = place.rating;
            }
            setPlaceInfo(); 
             
            /*var infoDetails = '<div>' + infoName + '<br>' +
                infoAddress + '<br>' +
                infoPhoneNumber + '<br>' +
                infoWeblink + '<br>' +
                infoPlaceRating + '<br>' + '</div>';
            */
            infowindow.setContent(document.getElementById('placeInfo'));
            infowindow.open(map, marker);
        });
    }
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
