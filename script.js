window.onload = function() {
    var map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    var issIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
        iconSize: [50, 30],
    });
    var issMarker = L.marker([0, 0], {icon: issIcon}).addTo(map);
    var issPath = [];
    var issPolyline = L.polyline(issPath, {color: 'red'}).addTo(map);
    function updateISS() {
        fetch('https://api.wheretheiss.at/v1/satellites/25544')
        .then(response => response.json())
        .then(data => {
            var lat = data['latitude'];
            var lon = data['longitude'];
            issMarker.setLatLng([lat, lon]);
            map.panTo([lat, lon], animate=true);
            issPath.push([lat, lon]);
            issPolyline.setLatLngs(issPath);
        })
        .catch(error => console.error('Error:', error));
    }
    updateISS();
    setInterval(updateISS, 5000);
}
