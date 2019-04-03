$(document).ready(function() {

    $('#start').click(function() {
        $('html, body').animate({
            scrollTop: $("#destinationBox").offset().top
        }, 1000);
    });

    $('#hotels').click(function() {
        $('.placeOptions').removeClass('selected');
        $(this).addClass('selected');
        $('#find').text('I want to find hotels');
        $('#mapFunctions').toggle();
    });
    $('#restaurants').click(function() {
        $('.placeOptions').removeClass('selected');
        $(this).addClass('selected');
        $('#find').text('I want to find restaurants');
        $('#mapFunctions').toggle();
    });
    $('#bars').click(function() {
        $('.placeOptions').removeClass('selected');
        $(this).addClass('selected');
        $('#find').text('I want to find bars');
        $('#mapFunctions').toggle();
    });
    $('#atm').click(function() {
        $('.placeOptions').removeClass('selected');
        $(this).addClass('selected');
        $('#find').text('I want to find ATM');
        $('#mapFunctions').toggle();
    });
    $('#art_gallery').click(function() {
        $('.placeOptions').removeClass('selected');
        $(this).addClass('selected');
        $('#find').text('I want to find art galleries');
        $('#mapFunctions').toggle();
    });
    $('#museum').click(function() {
        $('.placeOptions').removeClass('selected');
        $(this).addClass('selected');
        $('#find').text('I want to find museums');
        $('#mapFunctions').toggle();
    });
    $('#movie_theater').click(function() {
        $('.placeOptions').removeClass('selected');
        $(this).addClass('selected');
        $('#find').text('I want to find cinemas');
        $('#mapFunctions').toggle();
    });
    $('#zoo').click(function() {
        $('.placeOptions').removeClass('selected');
        $(this).addClass('selected');
        $('#find').text('I want to find zoos');
        $('#mapFunctions').toggle();
    });

    $('#find').click(function() {
        $('#find').text('I want to find.... ');
        $('#mapFunctions').toggle();
    });

    $('#showMe').click(function() {
        $('#find').text('I want to find.... ');
    });


});
