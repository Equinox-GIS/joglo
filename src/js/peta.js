function getSliderDefaultOptions() {
  return {
    dots: true,
    infinite: false,
    arrows: true,
    pauseOnHover: false,
    swipe: false,
    prevArrow: `<button type="button" class="slick-prev left-prev-custom" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-right: 1px;" class="custom-img-slick" src="./src/images/prev.png" alt="Previous">
                  </div>
                </button>`,
    nextArrow: `<button type="button" class="slick-next right-next-custom" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-left: 1px;" class="custom-img-slick" src="./src/images/next.png" alt="Next">
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
  // Custom Button
  var customButton = document.createElement("button");
  customButton.className = "mapboxgl-ctrl-icon custom-control-button btn-layer";
  customButton.setAttribute("type", "button");
  customButton.setAttribute("aria-label", "Custom Layer Action");
  customButton.innerHTML =
    '<span class="mapboxgl-ctrl-icon" aria-hidden="true" title="Layer"></span>';
  customButton.addEventListener("click", function (event) {
    makeActive(event);
  });

  // My Location Button
  var myLocationButton = document.createElement("button");
  myLocationButton.className =
    "mapboxgl-ctrl-icon custom-control-button btn-location";
  myLocationButton.setAttribute("type", "button");
  myLocationButton.setAttribute("aria-label", "My Location");
  myLocationButton.innerHTML =
    '<span class="mapboxgl-ctrl-icon" aria-hidden="true" title="My Location"></span>';
  myLocationButton.addEventListener("click", function (event) {
    makeActive(event);
  });

  // Stick Button 1
  var stickButton1 = document.createElement("button");
  stickButton1.className = "mapboxgl-ctrl-icon custom-control-button btn-stick";
  stickButton1.setAttribute("type", "button");
  stickButton1.setAttribute("aria-label", "Stick Action 1");
  stickButton1.addEventListener("click", function (event) {
    makeActive(event);
  });

  // Stick Button 2
  var stickButton2 = document.createElement("button");
  stickButton2.className =
    "mapboxgl-ctrl-icon custom-control-button btn-stick2";
  stickButton2.setAttribute("type", "button");
  stickButton2.setAttribute("aria-label", "Stick Action 1");
  stickButton2.addEventListener("click", function (event) {
    makeActive(event);
  });

  // Stick Button 3
  var stickButton3 = document.createElement("button");
  stickButton3.className =
    "mapboxgl-ctrl-icon custom-control-button btn-stick3";
  stickButton3.setAttribute("type", "button");
  stickButton3.setAttribute("aria-label", "Stick Action 3");
  stickButton3.addEventListener("click", function (event) {
    makeActive(event);
  });

  // Get Zoom In and Zoom Out buttons
  var zoomInButton = controlGroup.querySelector(".mapboxgl-ctrl-zoom-in");
  var zoomOutButton = controlGroup.querySelector(".mapboxgl-ctrl-zoom-out");

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

  // Create dropdown
  var dropdown = document.createElement("div");
  dropdown.id = "dropdownDelay";
  dropdown.className =
    "z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 absolute";
  dropdown.style.right = "100%"; // mengatur posisi ke kanan
  dropdown.style.marginRight = "10px"; // memberikan margin ke kanan
  dropdown.style.marginTop = "-3.5rem";
  dropdown.innerHTML = `
    <div class="mt-3">
    <div class="flex items-center mb-4 px-2 pt-3 cursor-pointer">
        <input checked id="radio-default" type="radio" value="Default" name="map-layer" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none focus:ring-0">
        <label for="radio-default" class="ml-2 text-xs font-medium cursor-pointer text-gray-900 dark:text-gray-300">Default</label>
    </div>
    <div class="flex items-center mb-4 px-2 cursor-pointer">
        <input id="radio-satellite" type="radio" value="Satellite" name="map-layer" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none focus:ring-0">
        <label for="radio-satellite" class="ml-2 text-xs font-medium cursor-pointer text-gray-900 dark:text-gray-300">Satellite</label>
    </div>
    <div class="flex items-center px-2 pb-3 cursor-pointer">
        <input  id="radio-street" type="radio" value="Street" name="map-layer" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none focus:ring-0">
        <label for="radio-street" class="ml-2 text-xs font-medium cursor-pointer text-gray-900 dark:text-gray-300">Street</label>
    </div>
    <div>`;

  customButton.addEventListener("click", function () {
    // Show or hide dropdown
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
    } else {
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
  controlGroup.appendChild(myLocationButton);
  controlGroup.appendChild(customButton);
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

const IzinGalian = () => {
  map.addSource("layer-peta-soaraja", {
    type: "geojson",
    data: `dataa.geojson`,
  });

  map.addLayer({
    id: "layer-peta-soaraja",
    type: "circle",
    source: "layer-peta-soaraja",
    paint: {
      "circle-color": "#4264fb",
      "circle-stroke-color": "#bdbdbd",
      "circle-stroke-width": 2,
      "circle-radius": 5,
      "circle-opacity": 0.8,
    },
    layout: {
      visibility: "visible",
    },
  });
};

map.on("style.load", () => {
  IzinGalian();
});

function showLayer(layer) {
  map.setLayoutProperty(layer, "visibility", "visible");
}

function hideLayer(layer) {
  map.setLayoutProperty(layer, "visibility", "none");
}

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
<div class="w-full h-full">
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
