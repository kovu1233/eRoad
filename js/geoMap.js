document.addEventListener("deviceready", onDeviceReady, false);
var watchID = null;
function onDeviceReady() {
    // Throw an error if no update is received every 30 seconds
    watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: true});
}

var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function onSuccess(position) {
var element = document.getElementById("geolocation");
element.innerHTML = "Latitude: " + position.coords.latitude + "<br />" +
"Longitude: " + position.coords.longitude + "<br />";
var lat=position.coords.latitude;
var lon=position.coords.longitude;
var myLatlng = new google.maps.LatLng(lat,lon);


var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
var map = new google.maps.Map(document.getElementById('map-canvas'), {
	zoom: 4,
	center: {lat: lat, lng: lon}
});

var marker = new google.maps.Marker({position: myLatlng,map: map});

directionsDisplay.setMap(map);

document.getElementById('goEROAD').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay, myLatlng);
  });

}

function onError(error) {
	alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
}

//var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
//google.maps.event.addDomListener(window, 'load', onSuccess);

function calculateAndDisplayRoute(directionsService, directionsDisplay, myLatlng) {
	var tMode = document.getElementById('travelMode').value;
  directionsService.route({
    origin: "Auckland",//myLatlng,
    destination: "-36.7272458,174.7051661",
    travelMode: google.maps.TravelMode[tMode]
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
	}
	else{
      window.alert('Directions request failed due to ' + status);
    }
  });
}

