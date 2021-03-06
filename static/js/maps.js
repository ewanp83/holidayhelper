//-----------------Global Variables-------------------

var map;
var infowindow;
var service;
var search;
var markers = [];
var placeType;

//------------------Initialize map----------------------

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 46.619261, lng: -33.134766 },
        zoom: 3,
        mapTypeId: 'roadmap'
    });
    
//---------------Uses place search box as input for map and sets map to search location----------------------------------------------

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
    
//------Starts functions on click of show me button and shows modal to select placetype if not already selected-----

    google.maps.event.addDomListener(document.getElementById("showMe"), 'click', function(event){
        if ($('.placeOptions').hasClass('selected')) {
            selection();}
        else ($('#pleaseSelect').modal('show'));
         setTimeout(function() {
                $('#pleaseSelect').modal('hide');
                }, 2000);
        });
}

//-------------sets placeType for search------------------

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

//-------------------search for results-------------------

function searchPlaces() {
    search = {
        bounds: map.getBounds(),
        types: placeType
        
    };
    service.nearbySearch(search, listResults);
}

//---------------Place markers on map-------------------------

function listResults(results, status) {
    clearMarker();
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
        }
    }
}

//---------------create markers------------------

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

//-------Gets info on places that appear in the results and shows on marker click------------------ 

    google.maps.event.addListener(marker, 'click', showDetails)
    
    function showDetails() {
        var detailsSearch = { placeId: place.place_id, };

        service.getDetails(detailsSearch, function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            var infoName = place.name;
            var infoAddress = place.formatted_address;
            var infoPhoneNumber = place.formatted_phone_number;
            var infoWeblink = place.website;
            var infoPlaceRating = place.rating + '/5';
            
//--------------Checks whether there is info for requested fields-----------------------    

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
            
//--------------Populates the infoWindow div with info---------------------------------   

            function setPlaceInfo() {
                document.getElementById('placeHeading').textContent = infoName;
                document.getElementById('placeAddress').textContent = infoAddress;
                document.getElementById('placePhone').textContent = infoPhoneNumber;
                document.getElementById('placeWebsite').innerHTML = '<a href="' + infoWeblink + '" target="_blank">' + 'Visit Website ' + '</a>';
                document.getElementById('placeRating').textContent = infoPlaceRating;
            }
            setPlaceInfo(); 
             
            infowindow.setContent(document.getElementById('placeInfo'));
            infowindow.open(map, marker);
        });
        
//-------------------repopulates the infowindow html when infowindow is closed-------------

        google.maps.event.addListener(infowindow, 'closeclick', resetPlaceInfo);
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

function resetPlaceInfo() {
             $('#infoWrapper').html('<div id="placeInfo" class="text-center"><p id="placeHeading"></p><hr/><p id="placeAddress"></p><p id="placePhone"></p><p id="placeWebsite"></p><p>Rating: <span id="placeRating"></span></p></div>');
        }