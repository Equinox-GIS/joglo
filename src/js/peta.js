import prevArrowImg from "../images/prev.png";
import nextArrowImg from "../images/next.png";
import logoNew from "../images/new2.png";
import rumaha2 from "../images/Hunian/Rmh1/rumaha2.jpg";
import heartOn from "../images/heart-on.png";
import share from "../images/share.png";
import badge3d from "../images/badge3d.svg";
import Video1 from "../video/Video1.mp4";
import era from "../images/agent/era-property.png";
import verif from "../images/verif.png";
import model from "../images/model/model11.jpg";

function getSliderDefaultOptions() {
  return {
    dots: true,
    infinite: false,
    arrows: true,
    pauseOnHover: false,
    swipe: false,
    prevArrow: `<button type="button" class="slick-prev left-prev-custom" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-right: 1px;" class="custom-img-slick" src="${prevArrowImg}" alt="Previous">
                  </div>
                </button>`,
    nextArrow: `<button type="button" class="slick-next right-next-custom" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-left: 1px;" class="custom-img-slick" src="${nextArrowImg}" alt="Next">
                  </div>
                </button>`,
  };
}

function moveDotsToCustomContainer() {
  const dots = $(".slider-card-info-detail-peta .slick-dots");
  $(".custom-dot-slick").append(dots);
}

function addClickHandlerToDots() {
  $(".slider-card-info-detail-peta .slick-dots li").on(
    "click",
    function (event) {
      event.stopPropagation();
    }
  );
}

function disableClickHandlerToDots() {
  $(".slick-dots li button")
    .off("click")
    .click(function (e) {
      e.preventDefault();
      return false;
    });
}

function resizePlayer(videos) {
  if (!videos[0]) return;

  var container = $(".slider-card-info-detail-peta"),
    containerWidth = container.width(),
    containerHeight = container.height();

  videos.each(function () {
    var video = $(this)[0];
    var videoRatio = video.videoWidth / video.videoHeight;

    var newWidth, newHeight;

    // Jika rasio kontainer lebih besar dari rasio video
    if (containerWidth / containerHeight > videoRatio) {
      newWidth = containerWidth;
      newHeight = containerWidth / videoRatio;
    } else {
      newWidth = containerHeight * videoRatio;
      newHeight = containerHeight;
    }

    $(this)
      .width(newWidth)
      .height(newHeight)
      .css({
        left: (containerWidth - newWidth) / 2,
        top: (containerHeight - newHeight) / 2,
      });
  });
}
//

function initSlickCardPeta(name) {
  $(name)
    .on("init", function () {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
        resizePlayer($(".slider-card-info-detail-peta video"));
      }, 0);
    })
    .slick(getSliderDefaultOptions());
}

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
            map.setStyle("mapbox://styles/mapbox/streets-v11");
            break;
          case "Satellite":
            map.setStyle(
              "mapbox://styles/menthoelsr/ckp6i54ay22u818lrq15ffcnr"
            );
            break;
          case "Street":
            map.setStyle(
              "mapbox://styles/menthoelsr/ckp4wrapq11m117pf2lr49l5t"
            );
            break;
        }
      });
    });
});

const map = new mapboxgl.Map({
  container: "mapSoaraja",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 14.5,
  center: [106.8295257, -6.210588],
  preserveDrawingBuffer: true,
});

// Navigator
map.addControl(new mapboxgl.NavigationControl());

var controlGroup = document.querySelector(
  ".mapboxgl-ctrl-top-right .mapboxgl-ctrl-group"
);

var compass = controlGroup.querySelector(".mapboxgl-ctrl-compass");
if (compass) {
  compass.style.setProperty("display", "none", "important");
}

function makeActive(event) {
  var currentButton = event.currentTarget;

  // Toggle the 'active-button' class based on its presence
  if (currentButton.classList.contains("active-button")) {
    // If it's already active, remove the class to deactivate it
    currentButton.classList.remove("active-button");
  } else {
    // If it's not active, first deactivate all buttons
    var buttons = document.querySelectorAll(".custom-control-button");
    buttons.forEach(function (button) {
      button.classList.remove("active-button");
    });
    // Then activate the clicked button
    currentButton.classList.add("active-button");
  }
}

if (controlGroup) {
  // My Location Button

  var myLocationButton = document.createElement("button");
  myLocationButton.className =
    "mapboxgl-ctrl-icon custom-control-button btn-location";
  myLocationButton.setAttribute("type", "button");
  myLocationButton.setAttribute("aria-label", "My Location");

  // Menambahkan atribut untuk tooltips
  myLocationButton.setAttribute("data-tooltip-target", "control-map-location");
  myLocationButton.setAttribute("data-tooltip-placement", "left");

  myLocationButton.addEventListener("click", function (event) {
    makeActive(event);
  });

  // Menambahkan event listener untuk menampilkan tooltip
  myLocationButton.addEventListener("mouseenter", function (event) {
    var tooltip = document.getElementById("control-map-location");
    tooltip.classList.remove("invisible", "opacity-0");
    tooltip.classList.add("visible", "opacity-100");
  });

  myLocationButton.addEventListener("mouseleave", function (event) {
    var tooltip = document.getElementById("control-map-location");
    tooltip.classList.add("invisible", "opacity-0");
    tooltip.classList.remove("visible", "opacity-100");
  });

  // Menambahkan button ke DOM
  document.body.appendChild(myLocationButton);

  // Tooltip HTML
  var tooltipHTML = `
  <div
    id="control-map-location"
    role="tooltip"
    class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 tooltip"
  >
    My Location
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
`;

  // Menambahkan tooltip ke DOM
  document.body.insertAdjacentHTML("beforeend", tooltipHTML);

  // Stick Button 1
  var stickButton1 = document.createElement("button");
  stickButton1.className = "mapboxgl-ctrl-icon custom-control-button btn-stick";
  stickButton1.setAttribute("type", "button");
  stickButton1.setAttribute("aria-label", "Stick Action 1");

  // Menambahkan atribut untuk tooltips
  stickButton1.setAttribute("data-tooltip-target", "control-map-detector");
  stickButton1.setAttribute("data-tooltip-placement", "left");

  stickButton1.addEventListener("click", function (event) {
    makeActive(event);
  });

  // Menambahkan event listener untuk menampilkan tooltip
  stickButton1.addEventListener("mouseenter", function (event) {
    var tooltip = document.getElementById("control-map-detector");
    tooltip.classList.remove("invisible", "opacity-0");
    tooltip.classList.add("visible", "opacity-100");
  });

  stickButton1.addEventListener("mouseleave", function (event) {
    var tooltip = document.getElementById("control-map-detector");
    tooltip.classList.add("invisible", "opacity-0");
    tooltip.classList.remove("visible", "opacity-100");
  });

  // Menambahkan button ke DOM
  document.body.appendChild(stickButton1);

  // Tooltip HTML
  var tooltipHTML = `
  <div
    id="control-map-detector"
    role="tooltip"
    class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 tooltip"
  >
    Detector
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
`;

  // Menambahkan tooltip ke DOM
  document.body.insertAdjacentHTML("beforeend", tooltipHTML);

  // Stick Button 2
  var stickButton2 = document.createElement("button");
  stickButton2.className =
    "mapboxgl-ctrl-icon custom-control-button btn-stick2";
  stickButton2.setAttribute("type", "button");
  stickButton2.setAttribute("aria-label", "Stick Action 2");

  // Menambahkan atribut untuk tooltips
  stickButton2.setAttribute("data-tooltip-target", "control-map-radius");
  stickButton2.setAttribute("data-tooltip-placement", "left");

  stickButton2.addEventListener("click", function (event) {
    makeActive(event);
  });

  // Menambahkan event listener untuk menampilkan tooltip
  stickButton2.addEventListener("mouseenter", function (event) {
    var tooltip = document.getElementById("control-map-radius");
    tooltip.classList.remove("invisible", "opacity-0");
    tooltip.classList.add("visible", "opacity-100");
  });

  stickButton2.addEventListener("mouseleave", function (event) {
    var tooltip = document.getElementById("control-map-radius");
    tooltip.classList.add("invisible", "opacity-0");
    tooltip.classList.remove("visible", "opacity-100");
  });

  // Menambahkan button ke DOM
  document.body.appendChild(stickButton2);

  // Tooltip HTML
  var tooltipHTML = `
  <div
    id="control-map-radius"
    role="tooltip"
    class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 tooltip"
  >
    Radius
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
`;

  // Menambahkan tooltip ke DOM
  document.body.insertAdjacentHTML("beforeend", tooltipHTML);

  // Stick Button 4
  var stickButton4 = document.createElement("button");
  stickButton4.className =
    "mapboxgl-ctrl-icon custom-control-button btn-penggaris";
  stickButton4.setAttribute("type", "button");
  stickButton4.setAttribute("aria-label", "Stick Action 4");

  // Menambahkan atribut untuk tooltips
  stickButton4.setAttribute("data-tooltip-target", "control-map-penggaris");
  stickButton4.setAttribute("data-tooltip-placement", "left");

  stickButton4.addEventListener("click", function (event) {
    makeActive(event);
  });

  // Menambahkan event listener untuk menampilkan tooltip
  stickButton4.addEventListener("mouseenter", function (event) {
    var tooltip = document.getElementById("control-map-penggaris");
    tooltip.classList.remove("invisible", "opacity-0");
    tooltip.classList.add("visible", "opacity-100");
  });

  stickButton4.addEventListener("mouseleave", function (event) {
    var tooltip = document.getElementById("control-map-penggaris");
    tooltip.classList.add("invisible", "opacity-0");
    tooltip.classList.remove("visible", "opacity-100");
  });

  // Menambahkan button ke DOM
  document.body.appendChild(stickButton4);

  // Tooltip HTML
  var tooltipHTML = `
  <div
    id="control-map-penggaris"
    role="tooltip"
    class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 tooltip"
  >
    Penggaris
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
`;

  // Menambahkan tooltip ke DOM
  document.body.insertAdjacentHTML("beforeend", tooltipHTML);

  // Stick Button 3
  var stickButton3 = document.createElement("button");
  stickButton3.className =
    "mapboxgl-ctrl-icon custom-control-button btn-stick3";
  stickButton3.setAttribute("type", "button");
  stickButton3.setAttribute("aria-label", "Stick Action 3");

  // Menambahkan atribut untuk tooltips
  stickButton3.setAttribute("data-tooltip-target", "control-map-poligon");
  stickButton3.setAttribute("data-tooltip-placement", "left");

  stickButton3.addEventListener("click", function (event) {
    makeActive(event);
  });

  // Menambahkan event listener untuk menampilkan tooltip
  stickButton3.addEventListener("mouseenter", function (event) {
    var tooltip = document.getElementById("control-map-poligon");
    tooltip.classList.remove("invisible", "opacity-0");
    tooltip.classList.add("visible", "opacity-100");
  });

  stickButton3.addEventListener("mouseleave", function (event) {
    var tooltip = document.getElementById("control-map-poligon");
    tooltip.classList.add("invisible", "opacity-0");
    tooltip.classList.remove("visible", "opacity-100");
  });

  // Menambahkan button ke DOM
  document.body.appendChild(stickButton3);

  // Tooltip HTML
  var tooltipHTML = `
  <div
    id="control-map-poligon"
    role="tooltip"
    class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 tooltip"
  >
    Poligon
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
`;

  // Menambahkan tooltip ke DOM
  document.body.insertAdjacentHTML("beforeend", tooltipHTML);

  // Get Zoom In and Zoom Out buttons
  // Mengasumsikan controlGroup adalah elemen yang sudah ada di DOM
  var zoomInButton = controlGroup.querySelector(".mapboxgl-ctrl-zoom-in");

  // Menambahkan kelas untuk styling (jika diperlukan)
  zoomInButton.classList.add("custom-control-button", "btn-zoom-in");

  // Menambahkan atribut untuk tooltips
  zoomInButton.setAttribute("data-tooltip-target", "tooltip-zoom-in");
  zoomInButton.setAttribute("data-tooltip-placement", "left");

  // Menambahkan event listener untuk menampilkan tooltip
  zoomInButton.addEventListener("mouseenter", function (event) {
    var tooltip = document.getElementById("tooltip-zoom-in");
    tooltip.classList.remove("invisible", "opacity-0");
    tooltip.classList.add("visible", "opacity-100");
  });

  // Menambahkan event listener untuk menyembunyikan tooltip
  zoomInButton.addEventListener("mouseleave", function (event) {
    var tooltip = document.getElementById("tooltip-zoom-in");
    tooltip.classList.add("invisible", "opacity-0");
    tooltip.classList.remove("visible", "opacity-100");
  });

  // Tooltip HTML untuk zoomInButton
  var tooltipHTMLZoomIn = `
<div
  id="tooltip-zoom-in"
  role="tooltip"
  class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 tooltip"
>
  Zoom In
  <div class="tooltip-arrow" data-popper-arrow></div>
</div>
`;

  // Menambahkan tooltip untuk zoomInButton ke DOM
  document.body.insertAdjacentHTML("beforeend", tooltipHTMLZoomIn);

  // Mengasumsikan controlGroup adalah elemen yang sudah ada di DOM
  var zoomOutButton = controlGroup.querySelector(".mapboxgl-ctrl-zoom-out");

  // Menambahkan kelas untuk styling (jika diperlukan)
  zoomOutButton.classList.add("custom-control-button", "btn-zoom-out");

  // Menambahkan atribut untuk tooltips
  zoomOutButton.setAttribute("data-tooltip-target", "tooltip-zoom-out");
  zoomOutButton.setAttribute("data-tooltip-placement", "left");

  // Menambahkan event listener untuk menampilkan tooltip
  zoomOutButton.addEventListener("mouseenter", function (event) {
    var tooltip = document.getElementById("tooltip-zoom-out");
    tooltip.classList.remove("invisible", "opacity-0");
    tooltip.classList.add("visible", "opacity-100");
  });

  // Menambahkan event listener untuk menyembunyikan tooltip
  zoomOutButton.addEventListener("mouseleave", function (event) {
    var tooltip = document.getElementById("tooltip-zoom-out");
    tooltip.classList.add("invisible", "opacity-0");
    tooltip.classList.remove("visible", "opacity-100");
  });

  // Tooltip HTML untuk zoomOutButton
  var tooltipHTMLZoomOut = `
<div
  id="tooltip-zoom-out"
  role="tooltip"
  class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 tooltip"
>
  Zoom Out
  <div class="tooltip-arrow" data-popper-arrow></div>
</div>
`;

  // Menambahkan tooltip untuk zoomOutButton ke DOM
  document.body.insertAdjacentHTML("beforeend", tooltipHTMLZoomOut);

  // Remove zoom buttons from the DOM
  controlGroup.removeChild(zoomInButton);
  controlGroup.removeChild(zoomOutButton);

  // Membuat dan menambahkan tombol layer setelah tombol my location
  var layerButton = document.createElement("button");
  layerButton.className =
    "mapboxgl-ctrl-icon custom-control-button layer-button";
  layerButton.setAttribute("type", "button");
  layerButton.setAttribute("aria-label", "Layer");
  layerButton.innerHTML =
    '<span class="mapboxgl-ctrl-icon" aria-hidden="true" title="Layer"></span>';

  var customButtonMapboxDua = document.createElement("button");
  customButtonMapboxDua.className =
    "mapboxgl-ctrl-icon custom-control-button custom-button-mapbox-dua";
  customButtonMapboxDua.setAttribute("type", "button");
  customButtonMapboxDua.setAttribute("aria-label", "Custom Button Mapbox Dua");
  customButtonMapboxDua.innerHTML =
    '<span class="mapboxgl-ctrl-icon" aria-hidden="true" title="Custom Button Mapbox Dua"></span>';

  customButtonMapboxDua.addEventListener("click", function () {
    alert("Custom Button Mapbox Dua clicked!");
  });

  //

  // Custom Button

  var customButton = document.createElement("button");
  customButton.className = "mapboxgl-ctrl-icon custom-control-button btn-layer";
  customButton.setAttribute("type", "button");
  customButton.setAttribute("aria-label", "Layer");

  // Menambahkan atribut untuk tooltips
  customButton.setAttribute("data-tooltip-target", "control-layer");
  customButton.setAttribute("data-tooltip-placement", "left");

  // Menambahkan event listener untuk menampilkan tooltip
  customButton.addEventListener("mouseenter", function (event) {
    if (!dropdown.classList.contains("show")) {
      var tooltip = document.getElementById("control-layer");
      tooltip.classList.remove("invisible", "opacity-0");
      tooltip.classList.add("visible", "opacity-100");
    }
  });

  customButton.addEventListener("mouseleave", function (event) {
    var tooltip = document.getElementById("control-layer");
    tooltip.classList.add("invisible", "opacity-0");
    tooltip.classList.remove("visible", "opacity-100");
  });

  // Menambahkan button ke DOM
  document.body.appendChild(customButton);

  // Tooltip HTML
  var tooltipHTML = `
<div
  id="control-layer"
  role="tooltip"
  class="absolute z-10 invisible inline-block px-2 py-1 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 tooltip"
>
  Layer
  <div class="tooltip-arrow" data-popper-arrow></div>
</div>
`;

  // Menambahkan tooltip ke DOM
  document.body.insertAdjacentHTML("beforeend", tooltipHTML);

  // Create dropdown
  var dropdown = document.createElement("div");
  dropdown.id = "dropdownDelay";
  dropdown.className =
    "z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-40 dark:bg-gray-700 absolute";
  dropdown.style.right = "100%"; // mengatur posisi ke kanan
  dropdown.style.marginRight = "10px"; // memberikan margin ke kanan
  dropdown.style.marginTop = "-3.5rem";
  dropdown.innerHTML = `
<div class="py-1">
  <div class="flex items-center mb-3 px-2 cursor-pointer" style="padding-top:0.55rem;">
    <input checked id="radio-default" type="radio" value="Default" name="map-layer" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0">
    <label for="radio-default" class="ml-2 text-sm font-medium cursor-pointer text-gray-900 dark:text-gray-300">Default</label>
  </div>
  <div class="flex items-center mb-2 mt-2 px-2 cursor-pointer">
    <input id="radio-satellite" type="radio" value="Satellite" name="map-layer" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0">
    <label for="radio-satellite" class="ml-2 text-sm font-medium cursor-pointer text-gray-900 dark:text-gray-300">Satellite</label>
  </div>
  <div class="flex items-center px-2 pb-3 cursor-pointer">
    <input id="radio-street" type="radio" value="Street" name="map-layer" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0">
    <label for="radio-street" class="ml-2 text-sm font-medium cursor-pointer text-gray-900 dark:text-gray-300">Street</label>
  </div>
</div>
`;

  // Append dropdown to the body or to a specific container
  document.body.appendChild(dropdown);

  customButton.addEventListener("click", function (event) {
    // Show or hide dropdown
    dropdown.classList.toggle("hidden");
    // Prevent tooltip from showing when dropdown is visible
    event.stopPropagation();
  });

  // Close dropdown when clicking outside of it
  document.addEventListener("click", function (event) {
    if (
      !dropdown.contains(event.target) &&
      !customButton.contains(event.target)
    ) {
      dropdown.classList.add("hidden");
    }
  });

  // Separator
  var separator = document.createElement("div");
  separator.style.marginTop = "4vh";
  separator.style.boxShadow = "none";

  // Add buttons to control group in the desired order
  controlGroup.appendChild(stickButton1);
  controlGroup.appendChild(stickButton4);
  controlGroup.appendChild(stickButton2);
  controlGroup.appendChild(stickButton3);
  controlGroup.appendChild(separator);
  controlGroup.appendChild(customButton);
  controlGroup.appendChild(myLocationButton);
  controlGroup.appendChild(dropdown);
  controlGroup.appendChild(zoomInButton);
  controlGroup.appendChild(zoomOutButton);
}

// disable map zoom when using scroll
map.scrollZoom.disable();

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: true,
});

let activeObjectId = null;

// Define the size and custom style for the pulsing dot
const size = 200;

// Non-Pulsing Dot
const nopulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),
  onAdd: function () {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },
  render: function () {
    const radius = (size / 2) * 0.45;
    const context = this.context;

    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.strokeStyle = "white";
    context.lineWidth = 16;

    // shadow
    context.shadowColor = "black";
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;

    context.fill();
    context.stroke();

    // Reset shadow effects to avoid affecting other elements
    context.shadowColor = "transparent";

    this.data = context.getImageData(0, 0, this.width, this.height).data;
    return true;
  },
};

const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  onAdd: function () {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },

  render: function () {
    const isActive = activeObjectId !== null;
    const duration = 1000;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.45;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;

    context.clearRect(0, 0, this.width, this.height);

    // Bagian untuk outer circle
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    if (activeObjectId) {
      context.fillStyle = `rgba(229,55,55, ${1 - t})`;
      context.fill();
    }

    // Bagian untuk inner circle
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(229,55,55, 1)";
    context.strokeStyle = "white";
    context.lineWidth = 16;

    // shadow
    context.shadowColor = "black";
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;

    context.fill();
    context.stroke();

    this.data = context.getImageData(0, 0, this.width, this.height).data;
    map.triggerRepaint();
    return true;
  },
};

// Function to add the layer with the pulsing dot
const IzinGalian = () => {
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
  map.addImage("nopulsing-dot", nopulsingDot, { pixelRatio: 2 });

  map.addSource("layer-peta-soaraja", {
    type: "geojson",
    data: "data-dumy.geojson", // Pastikan ini adalah jalur yang benar
  });

  map.addLayer({
    id: "layer-peta-soaraja",
    type: "symbol",
    source: "layer-peta-soaraja",
    layout: {
      "icon-image": [
        "case",
        ["==", ["get", "OBJECTID"], activeObjectId],
        "pulsing-dot",
        "nopulsing-dot",
      ],
      "icon-allow-overlap": true,
      "icon-size": 0.25,
      "text-field": ["get", "sumber_data"],
      "text-offset": [1, 0],
      "text-anchor": "left",
      "text-size": 12,
    },
    paint: {
      "text-color": "#374151",
    },
    filter: ["==", "kategori", "Rumah Dijual"],
  });

  // Cursor interactivity for layer-peta-soaraja
  map.on("mouseenter", "layer-peta-soaraja", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "layer-peta-soaraja", () => {
    map.getCanvas().style.cursor = "";
  });
};
// Ensure this is called after the map loads
map.on("style.load", () => {
  IzinGalian();

  // Inisialisasi peta dengan kategori default
  updateMapForCategory();
});

let activeCategories = ["Rumah Dijual"]; // Mulai dengan "Rumah Dijual" sebagai default

// Fungsi untuk memperbarui peta berdasarkan kategori
function updateMapForCategory() {
  let filter = ["any", ["==", "kategori", "Rumah Dijual"]]; // Selalu tampilkan "Rumah Dijual"

  // Tambahkan kategori aktif lainnya ke filter
  activeCategories.forEach((category) => {
    if (category !== "Rumah Dijual") {
      filter.push(["==", "kategori", category]);
    }
  });

  map.setFilter("layer-peta-soaraja", filter);
}

// Button event listeners
const buttons = document.querySelectorAll(".btn-on-map");
// Button event listeners
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const category = this.innerText.trim();

    // Jika kategori bukan "Rumah Dijual", atur ulang kategori aktif
    if (category !== "Rumah Dijual") {
      // Cek apakah kategori ini sudah aktif
      const categoryIndex = activeCategories.indexOf(category);
      if (categoryIndex > -1) {
        // Jika sudah aktif, hapus kategori dari daftar aktif dan hilangkan kelas aktif
        activeCategories.splice(categoryIndex, 1);
        this.classList.remove("active_btn_peta");
      } else {
        // Jika belum aktif, tambahkan kategori ke daftar aktif
        // Hapus kelas aktif dari semua tombol kecuali "Rumah Dijual" dan tambahkan ke tombol ini
        buttons.forEach((btn) => {
          if (btn.innerText.trim() !== "Rumah Dijual") {
            btn.classList.remove("active_btn_peta");
          }
        });
        this.classList.add("active_btn_peta");
        activeCategories.push(category);
      }
    }

    // Perbarui peta
    updateMapForCategory();
  });
});

// Aktifkan tombol default ("Rumah Dijual")
const defaultButton = document.getElementById("chip-rumah-dijual");
defaultButton.classList.add("active_btn_peta");

$(
  ".mapboxgl-ctrl.mapboxgl-ctrl-attrib, .mapboxgl-ctrl-geocoder.mapboxgl-ctrl, a.mapboxgl-ctrl-logo"
).css("visibility", "hidden");

// LAYER GALIAN IZIN
map.on("click", "layer-peta-soaraja", (e) => {
  // console.log(e);
  map.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  const data = e.features[0].properties;

  const clickedObjectId = e.features[0].properties.OBJECTID;
  if (activeObjectId !== clickedObjectId) {
    activeObjectId = clickedObjectId;
    console.log(activeObjectId);
    map.setLayoutProperty("layer-peta-soaraja", "icon-image", [
      "case",
      ["==", ["get", "OBJECTID"], activeObjectId],
      "pulsing-dot",
      "nopulsing-dot",
    ]);
    pulsingDot.render();
  }

  // Panggil ulang render dengan OBJECTID yang aktif
  pulsingDot.render(activeObjectId);

  const content = `
                              <div
                              class="max-w-sm bg-white cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                              data-object-id="${data.OBJECTID}"
                              data-card-map="1534"
                              data-active-tab="1"
                              onclick="showCardInfoDetail(this)">
                              <div
                                class="p-1 h-[5vh] bg-white select-none"
                              >
                                <div
                                  class="flex items-center justify-between w-full h-full"
                                >
                                  <!-- Bagian Kiri: Gambar -->
                                  <div class="flex items-center">
                                    <img
                                      class="w-7 h-7 rounded-full"
                                      src="${model}"
                                    />
                                  </div>

                                  <!-- Bagian Tengah: Teks 'aa' -->
                                  <div
                                    class="flex-grow flex items-center justify-start ml-1"
                                  >
                                    <div class="flex flex-col">
                                      <div class="inline-flex">
                                        <div
                                          class="text-xs font-semibold text-gray-700 cursor-pointer"
                                          onclick="showMessage(this)"
                                        >
                                          Budiman Alisysiaa
                                        </div>
                                        <div
                                          class="flex items-center justify-center ml-1"
                                        >
                                          <div
                                            class="w-3 h-3 flex justify-center items-center relative"
                                          >
                                            <img
                                              src="${verif}"
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <!--  -->
                                      <div class="">
                                        <label
                                          for="star-agent-utama"
                                          class="flex flex-row text-xs font-medium cursor-pointer text-gray-900"
                                        >
                                          <div>
                                            <label
                                              for="star-agent-utama"
                                              class="flex flex-row text-xs font-medium cursor-pointer text-gray-900"
                                            >
                                              <svg
                                                class="w-2.5 h-2.5 text-yellow-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                              >
                                                <path
                                                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                ></path>
                                              </svg>
                                              <svg
                                                class="w-2.5 h-2.5 text-yellow-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                              >
                                                <path
                                                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                ></path>
                                              </svg>
                                              <svg
                                                class="w-2.5 h-2.5 text-yellow-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                              >
                                                <path
                                                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                ></path>
                                              </svg>
                                              <svg
                                                class="w-2.5 h-2.5 text-gray-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                              >
                                                <path
                                                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                ></path>
                                              </svg>
                                              <svg
                                                class="w-2.5 h-2.5 text-gray-300 hidden"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                              >
                                                <path
                                                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                ></path>
                                              </svg>
                                            </label>
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Bagian Kanan: Gambar lainnya -->
                                  <div class="flex items-center">
                                    <img
                                      class="w-6 h-6 object-contain"
                                      src="${era}"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div class="w-full h-[19vh] relative">
                                <div
                                  class="slider-card-info-detail-peta w-full h-full"
                                >
                                  <div class="relative h-[19vh] bg-black z-index-10">
                                    <video
                                      class="w-full h-full object-contain"
                                      loop
                                      muted
                                      preload="metadata"
                                      src="${Video1}"
                                    ></video>
                                    <div class="arrow-right-custom-mini-peta">
                                      <span class="font-semibold">NEW</span>
                                    </div>
                                  </div>
                                  <div class="relative h-[19vh] bg-black z-index-10">
                                    <img
                                      class="w-full h-full object-contain"
                                      src="${rumaha2}"
                                      alt=""
                                    />
                                    <div class="arrow-right-custom-mini-peta">
                                      <span class="font-semibold">NEW</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                             <div class="flex flex-col w-full px-1 pb-1">
                                <!--  -->
                                <div class="flex flex-row justify-between">
                                  <div>
                                    <div class="inline-flex items-center">
                                      <h5 class="font-bold tracking-tight text-black">
                                        <span class="text-xl" style="
    font-size: 1rem;
">Rp 11.300.000.000</span>
                                      </h5>
                                    </div>
                                  </div>
                                  <!-- <div class="mr-1 mt-1">
                                    <img
                                      class="w-6 h-6 rounded-full"
                                      src="${model}"
                                    />
                                  </div> -->
                                </div>
                                <!--  -->
                                <div class="flex flex-col -mt-1 font-normal" style="
    margin-top: -0.3rem;
">
                                  <div class="flex items-center text-[11px] text-gray-700">
                                    <span class="mr-2">LT 80 m² |</span>
                                    <span class="mr-2">LB 276 m² |</span>
                                    <span class="mr-2">2 KT |</span>
                                    <span class="mr-2">5 KM</span>
                                  </div>
                                  <div class="text-xs text-gray-700" style="
    margin-top: -0.2rem;
">
                                    Sunter, Tanjung Priok, keduacard
                                  </div>
                                </div>
                                <!--  -->
                              </div>
                            </div>`;

  popup.setLngLat(coordinates).setHTML(content).addTo(map);
  initSlickCardPeta(".slider-card-info-detail-peta");

  map.once("render", function () {
    $(".slider-card-info-detail-peta")
      .on("mouseover", function () {
        // Pilih video di dalam .slider-card-info-detail-peta
        var video = $(this).find("video").get(0);

        // Periksa jika video ditemukan dan memiliki metode play
        if (video && typeof video.play === "function") {
          video.play();
        }
      })
      .on("mouseleave", function () {
        // Pilih video di dalam .slider-card-info-detail-peta
        var video = $(this).find("video").get(0);

        // Periksa jika video ditemukan dan memiliki metode pause
        if (video && typeof video.pause === "function") {
          video.pause();
        }
      });
  });

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
});
