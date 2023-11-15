import prevArrowImg from "../images/prev.png";
import nextArrowImg from "../images/next.png";

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

const map = new mapboxgl.Map({
  container: "mapSoaraja",
  style: "mapbox://styles/menthoelsr/ckp4wrapq11m117pf2lr49l5t",
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
  <div class="flex items-center mb-4 px-2 pt-3 cursor-pointer">
    <input checked id="radio-default" type="radio" value="Default" name="map-layer" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0">
    <label for="radio-default" class="ml-2 text-sm font-medium cursor-pointer text-gray-900 dark:text-gray-300">Default</label>
  </div>
  <div class="flex items-center mb-4 px-2 cursor-pointer">
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

// Define the size and custom style for the pulsing dot
const size = 200;
const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),
  activeFeatureId: 1600, // Set ID dari fitur yang akan diberi efek pulsing

  onAdd: function () {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },

  render: function () {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;

    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);

    // Cek apakah ID fitur aktif sama dengan yang ditentukan
    if (this.activeFeatureId === 1600) {
      context.fillStyle = `rgba(105,179,231, ${1 - t})`;
      context.fill();
      context.lineWidth = 2 + 4 * (1 - t);
    }

    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(105,179,231, 1)";
    context.strokeStyle = "white";
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

  map.addSource("layer-peta-soaraja", {
    type: "geojson",
    data: "data-dumy.geojson", // Pastikan path ini benar
  });

  map.addLayer({
    id: "layer-peta-soaraja",
    type: "symbol",
    source: "layer-peta-soaraja",
    layout: {
      "icon-image": "pulsing-dot",
      "icon-size": 0.25,
      "text-field": ["get", "sumber_data"],
      "text-offset": [1, 0],
      "text-anchor": "left",
      "text-size": 12,
    },
    paint: {
      "text-color": "#374151",
    },
    filter: ["==", ["get", "OBJECTID"], 1600], // Filter hanya fitur dengan OBJECTID 1600
  });
};

// Pastikan ini dipanggil setelah peta dimuat
map.on("style.load", () => {
  IzinGalian();
});

// Fungsi untuk memperbarui peta berdasarkan kategori
function updateMapForCategory(category) {
  if (category) {
    map.setFilter("layer-peta-soaraja", ["==", ["get", "kategori"], category]);
  } else {
    // Mengatur filter yang selalu false untuk menghilangkan semua titik
    map.setFilter("layer-peta-soaraja", ["==", ["get", "kategori"], ""]);
  }
}

// Button event listeners
const buttons = document.querySelectorAll(".btn-on-map");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const category = this.innerText.trim();

    // Cek apakah tombol yang sama diklik lagi
    if (this.classList.contains("active_btn_peta")) {
      // Reset semua tombol dan filter
      buttons.forEach((btn) => btn.classList.remove("active_btn_peta"));
      updateMapForCategory(null); // Menghilangkan semua titik
    } else {
      // Reset semua tombol
      buttons.forEach((btn) => btn.classList.remove("active_btn_peta"));

      // Aktifkan tombol yang diklik
      this.classList.add("active_btn_peta");

      // Perbarui peta berdasarkan kategori yang dipilih
      updateMapForCategory(category);
    }
  });
});
// Aktifkan tombol default ("Rumah Dijual")
const defaultButton = document.getElementById("chip-rumah-dijual");
defaultButton.classList.add("active_btn_peta");
// defaultButton.click(); // Aktifkan tombol default ketika halaman dimuat

$(
  ".mapboxgl-ctrl.mapboxgl-ctrl-attrib, .mapboxgl-ctrl-geocoder.mapboxgl-ctrl, a.mapboxgl-ctrl-logo"
).css("visibility", "hidden");

// LAYER GALIAN IZIN
map.on("click", "layer-peta-soaraja", (e) => {
  // console.log(e);
  map.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  // const data = e.features[0].properties;

  const content = `
<div class="w-full h-full"
                        data-card-map="1534"
                        data-active-tab="1"
                        onclick="showCardInfoDetail(this)">
                      <div
                        class="flex flex-col cursor-pointer"
                      >
                        <div class="w-full relative">
                          <div class="slider-card-info-detail-peta w-full h-full">
                            <!--  -->
                            <div class="relative">
                              <video
                                class="w-full h-full object-cover"
                                loop
                                muted
                                preload="metadata"
                                src="./src/video/Video1.mp4"
                              ></video>
                              <div class="absolute h-10 w-10 top-0 end-0 ...">
                                <img src="./src/images/new.png" alt="" />
                              </div>
                            </div>
                            <!--  -->
                            <div class="relative">
                              <img
                                class="w-full h-full object-cover"
                                src="./src/images/Hunian/Rmh1/rumaha2.jpg"
                                alt=""
                              />
                              <div class="absolute h-10 w-10 top-0 end-0 ...">
                                <img src="./src/images/new.png" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="px-2  pt-2 bg-white rounded-b-lg"
                          style="user-select: none"
                          >
                            <div class="flex flex-row justify-start">
                              <div>
                                <a href="#">
                                  <div class="inline-flex items-center">
                                    <h5
                                      class="text-sm font-bold tracking-tight text-black"
                                    >
                                      Rp 11.300.000.000
                                    </h5>
                                  </div>
                                </a>
                              </div>
                              <div class="flex justify-between">
                                <div
                                  class="grid grid-cols-3 items-center gap-2 ml-2"
                                >
                                  <div>
                                    <img
                                      class="w-4 h-4 object-cover"
                                      src="./src/images/heart-on.png"
                                      alt=""
                                    />
                                  </div>

                                  <div>
                                    <img
                                      class="w-3 h-3 object-cover"
                                      src="./src/images/share.png"
                                      alt=""
                                    />
                                  </div>

                                  <div>
                                    <img
                                      class="w-4 h-4 object-cover"
                                      src="./src/images/badge3d.svg"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                </div>
                              </div>
                            </div>

                          <div class="flex flex-col font-normal px-2 pb-1">
                            <div
                              class="flex items-center text-[11px] text-gray-700"
                            >
                              <span class="mr-2">LT 80 m² |</span>
                              <span class="mr-2">LB 276 m² |</span>
                              <span class="mr-2">2 KT |</span>
                              <span class="mr-2">5 KM</span>
                            </div>
                            <div class="text-xs text-gray-700">
                              Sunter, Tanjung Priok, Jakarta Utara
                            </div>
                            <div class="text-[10px] text-gray-400">
                              ERA JAKARTA
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

    `;

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
