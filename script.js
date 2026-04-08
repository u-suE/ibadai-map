const bounds = L.latLngBounds(
    [36.57156599535748,140.63769783742953],  // 南西
    [36.57509005139857,140.64510752216063]   // 北東
);

const map = L.map('map',{
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
}).setView([36.57338835737428,140.6417480538041], 17.5);

// OpenStreetMapタイル
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    L.popup()
        .setLatLng(e.latlng)
        .setContent(`${lat},${lng}`)
        .openOn(map);
});

L.marker([36.57296615912686,140.6430578324245])
    .addTo(map)
    .bindPopup('E1棟入口')
    .openPopup();

    let currentMarker = null;
let currentCircle = null;

function showCurrentPosition(position) {
const lat = position.coords.latitude;
const lng = position.coords.longitude;
const accuracy = position.coords.accuracy;

if (currentMarker) {
    map.removeLayer(currentMarker);
}
if (currentCircle) {
    map.removeLayer(currentCircle);
}

currentMarker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`現在地<br>lat: ${lat}<br>lng: ${lng}`);

currentCircle = L.circle([lat, lng], {
    radius: accuracy
}).addTo(map);

map.setView([lat, lng], 17);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    showCurrentPosition,
    showPositionError
  );
}

function showPositionError(error) {
console.error('位置情報の取得に失敗:', error);

let message = '位置情報を取得できませんでした';

if (error.code === 1) {
    message = '位置情報の利用が拒否されました';
} else if (error.code === 2) {
    message = '位置情報を取得できませんでした';
} else if (error.code === 3) {
    message = '位置情報の取得がタイムアウトしました';
}

alert(message);
}

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(
    showCurrentPosition,
    showPositionError,
    {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
    }
);
} else {
alert('このブラウザは位置情報取得に対応していません');
}