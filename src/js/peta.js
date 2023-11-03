// Inisialisasi peta Mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoibWVudGhvZWxzciIsImEiOiJja3M0MDZiMHMwZW83MnVwaDZ6Z2NhY2JxIn0.vQFxEZsM7Vvr-PX3FMOGiQ";

document.addEventListener("DOMContentLoaded", function () {
  // Attach a change event to the radio buttons with name 'map-layer'
  document
    .querySelectorAll('input[name="map-layer"]')
    .forEach(function (radio) {
      radio.addEventListener("change", function () {
        switch (this.value) {
          case "Default":
            map.setStyle(
              "mapbox://styles/menthoelsr/ckp4wrapq11m117pf2lr49l5t"
            );
            break;
          case "Satellite":
            map.setStyle(
              "mapbox://styles/menthoelsr/ckp6i54ay22u818lrq15ffcnr"
            );
            break;
          case "Street":
            map.setStyle("mapbox://styles/mapbox/streets-v11");
            break;
        }
      });
    });
});

// Initialize the map
var map = new mapboxgl.Map({
  container: "mapJoglo",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 14.5,
  center: [106.8295257, -6.210588],
  preserveDrawingBuffer: true,
  attributionControl: false,
});

map.addControl(new mapboxgl.NavigationControl());

var controlGroup = document.querySelector(
  ".mapboxgl-ctrl-top-right .mapboxgl-ctrl-group"
);

var compass = controlGroup.querySelector(".mapboxgl-ctrl-compass");
if (compass) {
  compass.style.setProperty("display", "none", "important");
}

// Jika grup kontrol ditemukan
if (controlGroup) {
  // Custom Button
  var customButton = document.createElement("button");
  customButton.className = "mapboxgl-ctrl-icon custom-control-button btn-layer";
  customButton.setAttribute("type", "button");
  customButton.setAttribute("aria-label", "Custom Layer Action");
  customButton.innerHTML =
    '<span class="mapboxgl-ctrl-icon custom-layer" aria-hidden="true" title="Custom Layer Action"></span>';
  customButton.addEventListener("click", function () {
    alert("Layer button clicked!");
  });

  // My Location Button
  var myLocationButton = document.createElement("button");
  myLocationButton.className =
    "mapboxgl-ctrl-icon custom-control-button btn-location";
  myLocationButton.setAttribute("type", "button");
  myLocationButton.setAttribute("aria-label", "My Location");
  myLocationButton.innerHTML =
    '<span class="mapboxgl-ctrl-icon" aria-hidden="true" title="My Location"></span>';
  myLocationButton.addEventListener("click", function () {
    alert("My Location button clicked!");
  });

  // Stick Button 1
  var stickButton1 = document.createElement("button");
  stickButton1.className = "mapboxgl-ctrl-icon custom-control-button btn-stick";
  stickButton1.setAttribute("type", "button");
  stickButton1.setAttribute("aria-label", "Stick Action 1");
  stickButton1.addEventListener("click", function () {
    alert("Stick button 1 clicked!");
  });

  // Stick Button 2
  var stickButton2 = document.createElement("button");
  stickButton2.className =
    "mapboxgl-ctrl-icon custom-control-button btn-stick2";
  stickButton2.setAttribute("type", "button");
  stickButton2.setAttribute("aria-label", "Stick Action 1");
  stickButton2.addEventListener("click", function () {
    alert("Stick button 1 clicked!");
  });

  // Stick Button 3
  var stickButton3 = document.createElement("button");
  stickButton3.className =
    "mapboxgl-ctrl-icon custom-control-button btn-stick3";
  stickButton3.setAttribute("type", "button");
  stickButton3.setAttribute("aria-label", "Stick Action 3");
  stickButton3.addEventListener("click", function () {
    alert("Stick button 3 clicked!");
  });

  // Get Zoom In and Zoom Out buttons
  var zoomInButton = controlGroup.querySelector(".mapboxgl-ctrl-zoom-in");
  var zoomOutButton = controlGroup.querySelector(".mapboxgl-ctrl-zoom-out");

  // Remove zoom buttons from the DOM
  controlGroup.removeChild(zoomInButton);
  controlGroup.removeChild(zoomOutButton);

  // Separator
  var separator = document.createElement("div");
  separator.style.marginTop = "4vh";
  separator.style.boxShadow = "none";

  // Add buttons to control group in the desired order
  controlGroup.appendChild(stickButton1);
  controlGroup.appendChild(stickButton2);
  controlGroup.appendChild(stickButton3);
  controlGroup.appendChild(separator);
  controlGroup.appendChild(myLocationButton);
  controlGroup.appendChild(customButton);
  controlGroup.appendChild(zoomInButton);
  controlGroup.appendChild(zoomOutButton);
}

// Fungsi untuk menambahkan titik
const IzinAjib = () => {
  fetch(`galian_utilitas_izin.geojson`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data); // Mencetak data ke konsol
      map.addSource("layer-ajib-galian", {
        type: "geojson",
        data: data,
      });

      // Menambahkan lapisan setelah sumber berhasil ditambahkan
      map.addLayer({
        id: "layer-ajib-galian",
        type: "circle",
        source: "layer-ajib-galian",
        paint: {
          "circle-color": "#ef1e28",
          "circle-stroke-color": "#ef1e28",
          "circle-stroke-width": 1,
          "circle-radius": 4,
          "circle-opacity": 0.8,
        },
        layout: {
          visibility: "visible",
        },
      });
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error); // Menangani potensi kesalahan
    });

  // Defining the popup
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  // Pop up
  map.on("mouseenter", "layer-ajib-galian", (e) => {
    console.log(e.features[0].properties);

    map.getCanvas().style.cursor = "pointer";
    const coordinates = e.features[0].geometry.coordinates.slice();
    const data = e.features[0].properties; // Extract properties from the event object
    const content = `
  <div class="p-0 w-full">
    <div class="">
      <h6 class="mt-0 text-sm leading-4 mb-2">${data["jenis_usaha"]}</h6>
      <div class="border-b mb-2"></div>
      <div class="leading-5">
        <div class="grid grid-cols-2">
          <div><span>NO SK</span></div>
          <div><span class="block truncate"> ${data["jenis_usaha"]}</span></div>
        </div>
        <div class="grid grid-cols-2">
          <div><span>Izin</span></div>
          <div><span class="block truncate"> ${data["jenis_usaha"]}</span></div>
        </div>
        <div class="grid grid-cols-2">
          <div><span>Badan Usaha</span></div>
          <div><span class="block truncate"> ${data["badan_usaha"]}</span></div>
        </div>
        <div class="grid grid-cols-2">
          <div><span>Jenis Usaha</span></div>
          <div><span class="block truncate"> ${data["jenis_usaha"]}</span></div>
        </div>
        <div class="grid grid-cols-2">
          <div><span>Pelaksana</span></div>
          <div><span class="block truncate"> ${data["jenis_usaha"]}</span></div>
        </div>
      </div>
    </div>
  </div>
`;

    popup.setLngLat(coordinates).setHTML(content).addTo(map);

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
  });

  // map.on("mouseleave", "layer-ajib-galian", () => {
  //   map.getCanvas().style.cursor = "";
  //   popup.remove();
  // });
};

// Panggil fungsi setelah peta selesai dimuat
map.on("load", IzinAjib);

// ---------------------------------------------------------------------------------------------

let currentPopup; // Menyimpan referensi ke popup saat ini

function getDataCard(element) {
  // Tutup popup saat ini jika ada
  if (currentPopup) {
    currentPopup.remove();
  }

  const activePanduan = parseInt(element.getAttribute("data-card-map"));

  // Mendefinisikan popup
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  // Loop melalui sumber data geojson untuk mencari OBJECTID yang cocok
  map.getSource("layer-ajib-galian")._data.features.forEach((feature) => {
    if (feature.properties.OBJECTID === activePanduan) {
      const coordinates = feature.geometry.coordinates.slice();
      const data = feature.properties;
      const content = `
      <div class="p-0 w-full">
        <div class="">
          <h6 class="mt-0 text-sm leading-4 mb-2">${data["OBJECTID"]}</h6>
          <h6 class="mt-0 text-sm leading-4 mb-2">${data["kegiatan"]}</h6>
          <div class="border-b mb-2"></div>
          <div class="leading-5">
            <div class="grid grid-cols-2">
              <div><span>NO SK</span></div>
              <div><span class="block truncate"> ${data["nama_obj"]}</span></div>
            </div>
            <div class="grid grid-cols-2">
              <div><span>Izin</span></div>
              <div><span class="block truncate"> ${data["nama_petugas"]}</span></div>
            </div>
            <div class="grid grid-cols-2">
              <div><span>Badan Usaha</span></div>
              <div><span class="block truncate"> ${data["pemilik"]}</span></div>
            </div>
            <div class="grid grid-cols-2">
              <div><span>Jenis Usaha</span></div>
              <div><span class="block truncate"> ${data["statusproyek"]}</span></div>
            </div>
            <div class="grid grid-cols-2">
              <div><span>Pelaksana</span></div>
              <div><span class="block truncate"> ${data["komentar"]}</span></div>
            </div>
          </div>
        </div>
      </div>
    `;

      popup.setLngLat(coordinates).setHTML(content).addTo(map);
      currentPopup = popup; // Simpan referensi ke popup saat ini

      while (Math.abs(map.getCenter().lng - coordinates[0]) > 180) {
        coordinates[0] += map.getCenter().lng > coordinates[0] ? 360 : -360;
      }
    }
  });
}

function removePopup() {
  // Tutup popup saat ini jika ada
  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
  }
}

// Hide Show Konten
